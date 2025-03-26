import { Dispatch, JSX, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { CommentData, CommentWithUser } from "@/types";
import { createNewComment, getPostById } from "@/actions";
import { useSocket } from "./provider/SocketContext";

const CommentForm = ({
  post_id,
  setComments,
}: {
  post_id: string;
  setComments: Dispatch<SetStateAction<CommentWithUser[]>>;
}): JSX.Element => {
  const socket = useSocket();

  const handlePostComment = async (formData: FormData) => {
    if (!socket) return;

    const content = formData.get("content") as string;
    const { success, result }: CommentData = await createNewComment(
      post_id,
      content
    );
    if (success && result) {
      setComments((prev) => [...prev, result!]);
      const data = await getPostById(post_id);
      if (!data.result) return;
      socket.emit("notification", {
        type: "Comment",
        username: result.user.username,
        comment: result.content,
        post: data.result,
        userId: data.result.author_id,
      });
    }
  };

  return (
    <form className="relative" action={handlePostComment}>
      <Input
        className="w-full h-8 border-white rounded-full text-left"
        required
        placeholder="your comment ..."
        name="content"
      />
      <button
        className="absolute top-0 right-0 h-8 w-8 rounded-full ho"
        type="submit"
      >
        <Send size={20} className="text-white hover:text-blue-500" />
      </button>
    </form>
  );
};

export default CommentForm;
