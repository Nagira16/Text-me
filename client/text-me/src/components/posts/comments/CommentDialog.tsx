"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import CommentList from "./CommentList";
import { JSX, useState } from "react";
import { CommentWithUser } from "@/types";
import { Card } from "../../ui/card";
import CommentForm from "./CommentForm";

const CommentDialog = ({ post_id }: { post_id: string }): JSX.Element => {
  const [allComments, setComments] = useState<CommentWithUser[]>([]);

  return (
    <Dialog>
      <DialogTrigger>
        <MessageCircle />
      </DialogTrigger>
      <DialogContent className="p-4 rounded-lg">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <Card className="p-4 w-full">
          <CommentList
            post_id={post_id}
            allComments={allComments}
            setComments={setComments}
          />
          <CommentForm post_id={post_id} setComments={setComments} />
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
