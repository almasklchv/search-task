import { UserCard } from "../UserCard/UserCard";
import { useSearchContext } from "../../hooks/use-search-context";
import "./style.css";

export const SearchResults = (): React.ReactElement => {
  const { users } = useSearchContext();

  return (
    <div className="usersList">
      {users.map((user) => (
        <UserCard {...user} key={user.id} />
      ))}
      {!users.length && <p>User not found.</p>}
    </div>
  );
};
