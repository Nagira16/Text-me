"use client";

import { JSX, useState } from "react";

import ChatWindow from "./ChatWindow";
import ConversationList from "./ConversationList";

const Chat = (): JSX.Element => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  return (
    <div className="flex h-screen w-full">
      <ConversationList setSelectedConversation={setSelectedConversation} />

      <section className="flex-1 flex flex-col p-4">
        {selectedConversation ? (
          <ChatWindow conversationId={selectedConversation} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select A User</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Chat;
