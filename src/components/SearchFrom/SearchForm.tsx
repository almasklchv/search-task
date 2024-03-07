import { useContext } from "react";
import "./styles.css";
import { SearchContext } from "../SearchResults/SearchContext";

export const SearchForm = (): React.ReactElement => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  return (
    <div className="searchForm">
      <form>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  );
};
