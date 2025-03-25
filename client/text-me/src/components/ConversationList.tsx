import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AllConversationData, ConversationWithUser } from "@/types";
import { useAuth } from "./provider/AuthContent";
import Link from "next/link";

const ConversationList = ({
  setSelectedConversation,
}: {
  setSelectedConversation: Dispatch<SetStateAction<string | null>>;
}) => {
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
    <aside className="w-1/3 p-4 border-r ml-16">
      <h2 className="text-lg font-bold mb-4">DM</h2>
      {conversations.map((conv) => {
        const currentUserId = user?.id;
        const chatPartner =
          currentUserId === conv.user1.id ? conv.user2 : conv.user1;

        return (
          <div
            key={conv.id}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => setSelectedConversation(conv.id)}
          >
            <Link
              href={`account/${chatPartner.id}`}
              className="border border-white rounded-full p-1"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={chatPartner.profile_image} />
                <AvatarFallback>{chatPartner.username[0]}</AvatarFallback>
              </Avatar>
            </Link>
            <span className="font-medium">{chatPartner.username}</span>
          </div>
        );
      })}
    </aside>
  );
};

export default ConversationList;
