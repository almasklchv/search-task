import { useSearchContext } from "../../hooks/use-search-context";
import "./styles.css";

export const SearchForm = (): React.ReactElement => {
  const { searchQuery, setSearchQuery } = useSearchContext();

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
