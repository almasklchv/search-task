import { createContext } from "react";
import { User } from "../UserCard/user.interface";

interface SearchContextInterface {
  users: User[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext({
  users: [],
  searchQuery: "",
  setSearchQuery: () => {},
} as SearchContextInterface);
