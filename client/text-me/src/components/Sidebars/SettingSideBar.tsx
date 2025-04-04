import { Dispatch, JSX, SetStateAction } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { SettingTitle } from "@/types";
import {
  Heart,
  Images,
  LockKeyhole,
  Settings2,
  UserRoundPlus,
} from "lucide-react";

const SettingLinks: {
  title: SettingTitle;
  icon: JSX.Element;
}[] = [
  {
    title: "User_Profile",
    icon: <Settings2 className="max-sm:size-4" />,
  },
  {
    title: "Post",
    icon: <Images className="max-sm:size-4" />,
  },
  {
    title: "Liked_Post",
    icon: <Heart className="max-sm:size-4" />,
  },
  {
    title: "Follow",
    icon: <UserRoundPlus className="max-sm:size-4" />,
  },
  {
    title: "Change_Password",
    icon: <LockKeyhole className="max-sm:size-4" />,
  },
];

const SettingSideBar = ({
  setSelectedList,
}: {
  setSelectedList: Dispatch<SetStateAction<SettingTitle | null>>;
}): JSX.Element => {
  return (
    <Sidebar side="left" className="sm:ml-16 w-[200px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SettingLinks.map((link, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton asChild>
                    <div
                      key={i}
                      className="flex items-center gap-2 hover:bg-gray-400 p-3 text-lg cursor-pointer max-lg:text-[10px]"
                      onClick={() => setSelectedList(link.title)}
                    >
                      {link.icon}
                      {link.title}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SettingSideBar;
