import UserSearch from "@/components/Users/UserSearch";
import React, { JSX } from "react";

const Search = (): JSX.Element => {
  return (
    <div className="min-h-screen min-w-screen grid place-items-center">
      <UserSearch />
    </div>
  );
};

export default Search;
