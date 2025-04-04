import React, { Dispatch, JSX, SetStateAction, useState } from "react";
import { Button } from "../../ui/button";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { deletePostById } from "@/actions";
import { PostWithUser } from "@/types";

type PostDeleteButtonProps = {
  post_id: string;
  setPosts: Dispatch<SetStateAction<PostWithUser[]>>;
};

const PostDeleteButton = ({
  post_id,
  setPosts,
}: PostDeleteButtonProps): JSX.Element => {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleDelete = async (): Promise<void> => {
    setIsSaving(true);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const { success, result } = await deletePostById(post_id);
      if (success && result) {
        setPosts((posts) => posts.filter((p) => p.id !== result.id));
        await Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success",
        });
      }
    } else {
      await Swal.fire({
        title: "Canceled",
        text: "Your post is safe.",
        icon: "info",
      });
    }

    setIsSaving(false);
  };

  return (
    <Button
      className={`absolute top-7 right-7 z-10 text-white bg-red-500 hover:bg-red-700 ${
        isSaving && "bg-red-900"
      }`}
      disabled={isSaving}
      onClick={handleDelete}
    >
      <Trash2 />
    </Button>
  );
};

export default PostDeleteButton;
