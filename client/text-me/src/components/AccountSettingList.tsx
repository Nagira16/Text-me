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
  setSelectedList: Dispatch<SetStateAction<string | null>>;
}) => {
  const SettingLinks: {
    title: string;
    icon: JSX.Element;
  }[] = [
    {
      title: "User Profile",
      icon: <Settings2 />,
    },
    {
      title: "Post",
      icon: <Images />,
    },
    {
      title: "Liked Post",
      icon: <Heart />,
    },
    {
      title: "Follow",
      icon: <UserRoundPlus />,
    },
    {
      title: "Change Password",
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
