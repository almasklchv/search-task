import { useEffect, useMemo, useState } from "react";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { SearchContext } from "./components/SearchResults/SearchContext";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { useDebouncedSearch } from "./hooks/use-debounced-search";
import { useFetchUsers } from "./hooks/use-fetch-users";
import { Error } from "./components/Error/Error";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("Terry");
  const debouncedSearchQuery = useDebouncedSearch(searchQuery, setSearchQuery);

  const { fetchUsers, isLoading, isError, users } =
    useFetchUsers(debouncedSearchQuery);

  const providerValue = useMemo(
    () => ({ users, searchQuery, setSearchQuery }),
    [users, searchQuery]
  );

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchQuery, fetchUsers]);

  return (
    <SearchContext.Provider value={providerValue}>
      <SearchForm />
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && <SearchResults />}
      {isError && (
        <Error message="Something went wrong. Please try again later!" />
      )}
    </SearchContext.Provider>
  );
}
