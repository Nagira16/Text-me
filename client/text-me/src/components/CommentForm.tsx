import { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { CommentData, CommentWithUser } from "@/types";
import { createNewComment } from "@/actions";

const CommentForm = ({
  post_id,
  setComments,
}: {
  post_id: string;
  setComments: Dispatch<SetStateAction<CommentWithUser[]>>;
}) => {
  const handlePostComment = async (formData: FormData) => {
    const content = formData.get("content") as string;
    const data: CommentData = await createNewComment(post_id, content);
    if (data.success && data.result) {
      setComments((prev) => [...prev, data.result!]);
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
