import { SettingTitle } from "@/types";
import {
  Heart,
  Images,
  LockKeyhole,
  Settings2,
  UserRoundPlus,
} from "lucide-react";
import React, { Dispatch, JSX, SetStateAction } from "react";

const AccountSettingList = ({
  setSelectedList,
}: {
  setSelectedList: Dispatch<SetStateAction<SettingTitle | null>>;
}) => {
  const SettingLinks: {
    title: SettingTitle;
    icon: JSX.Element;
  }[] = [
    {
      title: "User_Profile",
      icon: <Settings2 />,
    },
    {
      title: "Post",
      icon: <Images />,
    },
    {
      title: "Liked_Post",
      icon: <Heart />,
    },
    {
      title: "Follow",
      icon: <UserRoundPlus />,
    },
    {
      title: "Change_Password",
      icon: <LockKeyhole />,
    },
  ];
  return (
    <ul className="ml-10">
      {SettingLinks.map((link) => (
        <li
          className="flex items-center gap-2 hover:bg-gray-500 p-3 text-lg"
          onClick={() => setSelectedList(link.title)}
        >
          {link.icon}
          {link.title}
        </li>
      ))}
    </ul>
  );
};

export default AccountSettingList;
