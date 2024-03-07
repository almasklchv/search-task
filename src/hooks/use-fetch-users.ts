import { useCallback, useRef, useState } from "react";
import { User } from "../components/UserCard/user.interface";
import { BASE_URL } from "../consts";

export const useFetchUsers = (searchQuery: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchUsers = useCallback(async () => {
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
  }, [searchQuery]);

  return { fetchUsers, isLoading, isError, users };
};
