// "use client";

// import { useEffect, useState } from "react";
// import { MessageCircle, Send } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { getAllFollowing } from "@/actions";
// import { FollowingWithUser } from "@/types";
// import { Avatar } from "./ui/avatar";
// import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// const Chat = () => {
//   const [selectedUser, setSelectedUser] = useState<string | null>(null);
//   const [followingUser, setFollowingUsers] = useState<FollowingWithUser[]>([]);
//   const [messages, setMessages] = useState(initialMessages);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     getAllFollowing();
//   });

//   //   const handleSendMessage = () => {
//   //     if (!selectedUser || newMessage.trim() === "") return;

//   //     setMessages((prev) => ({
//   //       ...prev,
//   //       [selectedUser]: [
//   //         ...prev[selectedUser],
//   //         { sender: "You", text: newMessage },
//   //       ],
//   //     }));
//   //     setNewMessage("");
//   //   };

//   return (
//     <div className="flex h-screen w-full ml-28">
//       <aside className="w-1/3 p-4 border-r">
//         <h2 className="text-lg font-bold mb-4">DM</h2>
//         {followingUser.map((user) => (
//           <div
//             key={user.id}
//             className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-200 ${
//               selectedUser === user.id ? "bg-gray-300" : ""
//             }`}
//             onClick={() => setSelectedUser(user.following.id)}
//           >
//             <Avatar className="w-10 h-10 border-2 border-white">
//               <AvatarImage src={user.following.profile_image} />
//               <AvatarFallback>User</AvatarFallback>
//             </Avatar>
//             <span className="font-medium">{user.following.username}</span>
//           </div>
//         ))}
//       </aside>

//       <main className="flex-1 flex flex-col p-4">
//         {selectedUser ? (
//           <>
//             <Card className="flex-1 p-4 overflow-y-auto">
//               {/* {messages[selectedUser]?.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`mb-2 p-2 rounded-md max-w-xs ${
//                     msg.sender === "You"
//                       ? "bg-blue-500 text-white ml-auto"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   <strong>{msg.sender}</strong>: {msg.text}
//                 </div>
//               ))} */}
//             </Card>
//             <div className="flex items-center gap-2 mt-2">
//               <Input
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="メッセージを入力..."
//               />
//               <Button>
//                 <Send className="w-5 h-5" />
//               </Button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             <MessageCircle className="w-10 h-10" />
//             <p className="ml-2">ユーザーを選択してください</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Chat;
