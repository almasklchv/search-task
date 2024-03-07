import { useState } from "react";
import "./styles.css";

export function SearchForm() {
  const [searchQuery, setSearchQuery] = useState<string>("");

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
}
