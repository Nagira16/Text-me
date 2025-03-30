"use client";

import { useState } from "react";
import AccountSettingList from "./AccountSettingList";
import { SettingTitle } from "@/types";
import ProfileSetting from "./ProfileSetting";
import PostSetting from "./PostSetting";
import LikedSetting from "./LikedSetting";
import FollowSetting from "./FollowSetting";
import PasswordSetting from "./PasswordSetting";

const Setting = () => {
  const [selectedList, setSelectedList] = useState<SettingTitle | null>(null);
  return (
    <div className="flex  w-full">
      <AccountSettingList setSelectedList={setSelectedList} />

      <main className="flex-1 flex flex-col p-4">
        {selectedList ? (
          <>
            {selectedList === "User_Profile" && <ProfileSetting />}
            {selectedList === "Post" && <PostSetting />}
            {selectedList === "Liked_Post" && <LikedSetting />}
            {selectedList === "Follow" && <FollowSetting />}
            {selectedList === "Change_Password" && <PasswordSetting />}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select A Setting</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Setting;
