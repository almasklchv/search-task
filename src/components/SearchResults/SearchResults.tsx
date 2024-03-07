import { useContext } from "react";
import { SearchContext } from "./SearchContext";
import { UserCard } from "../UserCard/UserCard";

import "./style.css";

export const SearchResults = (): React.ReactElement => {
  const { users } = useContext(SearchContext);

  return (
    <div className="usersList">
      {users.map((user) => (
        <UserCard {...user} key={user.id} />
      ))}
      {!users.length && <p>User not found.</p>}
    </div>
  );
};
