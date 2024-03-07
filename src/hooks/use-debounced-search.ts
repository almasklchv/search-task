import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

export const useDebouncedSearch = (
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
): string => {
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState<string>(searchQuery);

  useEffect(() => {
    const debounced = debounce((query: string) => {
      setDebouncedSearchQuery(query);
    }, 500);

    debounced(searchQuery);

    return () => {
      debounced.cancel();
    };
  }, [searchQuery, setSearchQuery]);

  return debouncedSearchQuery;
};
