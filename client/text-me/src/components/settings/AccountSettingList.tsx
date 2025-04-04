import { SettingTitle } from "@/types";
import {
  Heart,
  Images,
  LockKeyhole,
  Settings2,
  UserRoundPlus,
} from "lucide-react";
import { Dispatch, JSX, SetStateAction } from "react";

const AccountSettingList = ({
  setSelectedList,
}: {
  setSelectedList: Dispatch<SetStateAction<SettingTitle | null>>;
}): JSX.Element => {
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
    <aside className="w-1/4 p-4 border-r ml-10">
      {SettingLinks.map((link, i) => (
        <div
          key={i}
          className="flex items-center gap-2 hover:bg-gray-500 p-3 text-lg cursor-pointer"
          onClick={() => setSelectedList(link.title)}
        >
          {link.icon}
          {link.title}
        </div>
      ))}
    </aside>
  );
};

export default AccountSettingList;
