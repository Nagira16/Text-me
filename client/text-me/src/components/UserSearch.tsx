"use client";

import { JSX, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserInfoData, UsersInfo } from "@/types";
import Link from "next/link";

const UserSearch = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<UsersInfo[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSaving(true);

    const res = await fetch(
      `http://localhost:5001/user/search?q=${searchQuery}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const { success, result }: UserInfoData = await res.json();

    if (success && result) {
      setSearchResults(result);
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Searching User..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          className={`${isSaving ? "bg-gray-500" : "dark:bg-white"}`}
          disabled={isSaving}
        >
          Search
        </Button>
      </div>

      <ul className="mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <Link key={user.id} href={`/account/${user.id}`} passHref>
              <li className="relative flex items-center gap-2 p-2 hover:bg-gray-400 rounded-xl cursor-pointer mb-5">
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src={user.profile_image} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>

                <span className="font-medium">{user.username}</span>

                <hr className="absolute -bottom-3 right-0 left-0 border-black dark:border-white" />
              </li>
            </Link>
          ))
        ) : (
          <li>
            <p>User Not Found</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserSearch;
