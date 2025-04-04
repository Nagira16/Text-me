import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
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
import {
  AllConversationData,
  ConversationWithUser,
  SettingTitle,
} from "@/types";
import {
  Heart,
  Images,
  LockKeyhole,
  Settings2,
  UserRoundPlus,
} from "lucide-react";
import { useAuth } from "../provider/AuthContent";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

const ChatListSideBar = ({
  setSelectedConversation,
}: {
  setSelectedConversation: Dispatch<SetStateAction<string | null>>;
}): JSX.Element => {
  const [conversations, setConversations] = useState<ConversationWithUser[]>(
    []
  );

  const { user } = useAuth();

  useEffect(() => {
    const fetchConversations = async () => {
      const res: Response = await fetch("http://localhost:5001/conversation", {
        method: "GET",
        credentials: "include",
      });
      const { success, result }: AllConversationData = await res.json();
      if (success && result) setConversations(result);
    };
    fetchConversations();
  }, []);

  return (
    <Sidebar side="left" className="sm:ml-16 w-[230px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl">DM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conv) => {
                const currentUserId = user?.id;
                const chatPartner =
                  currentUserId === conv.user1.id ? conv.user2 : conv.user1;
                return (
                  <SidebarMenuItem key={conv.id}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => setSelectedConversation(conv.id)}
                    >
                      <div className="flex items-center gap-3 py-6 sm:py-10 rounded-lg cursor-pointer hover:bg-gray-400">
                        <Link
                          href={`/account/${chatPartner.id}`}
                          className="border border-white rounded-full p-1"
                        >
                          <Avatar className="size-5 sm:size-10">
                            <AvatarImage
                              src={
                                chatPartner.profile_image || "/user-icon.jpeg"
                              }
                            />
                            <AvatarFallback>
                              {chatPartner.username[0]}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                        <span className="font-medium max-sm:text-[13px]">
                          {chatPartner.username}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatListSideBar;
