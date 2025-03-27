import { JSX, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { AllMessageData, MessageData, MessageWithUser } from "@/types";
import { useAuth } from "./provider/AuthContent";
import { useSocket } from "./provider/SocketContext";

const ChatWindow = ({
  conversationId,
}: {
  conversationId: string;
}): JSX.Element => {
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      const res = await fetch(
        `http://localhost:5001/message/${conversationId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const { success, result }: AllMessageData = await res.json();
      if (success && result) setMessages(result);
    };
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    socket.emit("joinConversation", conversationId);

    socket.on("newMessage", (message: MessageWithUser) => {
      if (message.conversation_id === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.emit("leaveRoom", conversationId);
      socket.off("newMessage");
    };
  }, [conversationId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const res: Response = await fetch(
      `http://localhost:5001/message/${conversationId}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newMessage,
        }),
      }
    );

    const data: MessageData = await res.json();
    if (data.success && data.result) {
      socket.emit("sendMessage", data.result);
      setNewMessage("");
    }
  };

  return (
    <Card className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-md max-w-xs ${
              msg.sender_id === user?.id
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-500"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2 border-t pt-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
        />
        <Button onClick={sendMessage}>
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
};

export default ChatWindow;
