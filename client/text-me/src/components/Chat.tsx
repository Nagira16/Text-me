"use client";

import { JSX, useState } from "react";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

const Chat = (): JSX.Element => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  return (
    <div className="flex h-screen w-full">
      <ConversationList setSelectedConversation={setSelectedConversation} />

      <main className="flex-1 flex flex-col p-4">
        {selectedConversation ? (
          <ChatWindow conversationId={selectedConversation} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select A User</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;
