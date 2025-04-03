import Chat from "@/components/chats/Chat";
import React, { JSX } from "react";

const DirectMessage = (): JSX.Element => {
  return (
    <div className="min-h-screen min-w-screen grid place-items-center">
      <Chat />
    </div>
  );
};

export default DirectMessage;
