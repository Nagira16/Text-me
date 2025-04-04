import { PostWithUser } from "@/types";
import { Dispatch, JSX, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Pencil } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { updatePostById } from "@/actions";
import Swal from "sweetalert2";

type PostEditButtonProps = {
  post_id: string;
  setPosts: Dispatch<SetStateAction<PostWithUser[]>>;
};

const PostEditButton = ({
  post_id,
  setPosts,
}: PostEditButtonProps): JSX.Element => {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleEdit = async (formData: FormData): Promise<void> => {
    setIsSaving(true);
    const { success, result, message } = await updatePostById(
      post_id,
      formData
    );
    if (success && result) {
      setPosts((posts) =>
        posts.map((post) => (post.id === result.id ? result : post))
      );

      Swal.fire({
        title: "Edited!",
        text: "Your post has been edited.",
        icon: "success",
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
      });
    }

    setIsSaving(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute top-7 right-20 z-10 text-white bg-blue-500 hover:bg-blue-700"
          type="button"
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Content</DialogTitle>
        </DialogHeader>
        <Card className="p-4">
          <form action={handleEdit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="content">
                Edit Content
              </Label>
              <Input name="content" />
            </div>

            <Button
              type="submit"
              className={`text-white bg-blue-500 hover:bg-blue-700 ${
                isSaving && "bg-blue-900"
              }`}
              disabled={isSaving}
            >
              Save
            </Button>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditButton;
