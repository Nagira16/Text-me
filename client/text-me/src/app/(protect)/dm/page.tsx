import Chat from "@/components/chats/Chat";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { JSX } from "react";

const DirectMessage = (): JSX.Element => {
  return (
    <SidebarProvider>
      <SidebarTrigger className="mt-10 ml-1 " />
      <div className="min-h-screen min-w-screen grid place-items-center">
        <Chat />
      </div>
    </SidebarProvider>
  );
};

export default DirectMessage;
