import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchForm } from "./components/SearchFrom/SearchForm";
import { SearchContext } from "./components/SearchResults/SearchContext";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { User } from "./components/UserCard/user.interface";
import { useDebouncedSearch } from "./hooks/use-debounced-search";

const BASE_URL = "https://dummyjson.com";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("Terry");
  const debouncedSearchQuery = useDebouncedSearch(searchQuery, setSearchQuery);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const providerValue = useMemo(
    () => ({ users, searchQuery, setSearchQuery }),
    [users, searchQuery]
  );

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchUsers = useCallback(async (searchQuery: string) => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(
        `${BASE_URL}/users/search?q=${searchQuery}`,
        {
          signal: abortControllerRef.current?.signal,
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.name === "AbortError") {
          return;
        }
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(debouncedSearchQuery);

    return () => abortControllerRef.current?.abort();
  }, [debouncedSearchQuery, fetchUsers]);

  return (
    <SearchContext.Provider value={providerValue}>
      <SearchForm />
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && <SearchResults />}
      {isError && <p>Something went wrong. Please try again later!</p>}
    </SearchContext.Provider>
  );
}
