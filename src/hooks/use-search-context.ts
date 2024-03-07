import { useContext } from "react";
import { SearchContext } from "../components/SearchResults/SearchContext";

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  return context;
};
