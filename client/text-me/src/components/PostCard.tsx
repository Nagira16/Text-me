import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PostWithUser } from "@/types";
import Image from "next/image";
import LikeButton from "./LikeButton";

const PostCard = ({ post }: { post: PostWithUser }) => {
  return (
    <Card className="shadow-md border border-white w-[600px] h-[750px]]">
      <CardHeader>
        <CardTitle className="flex items-center gap-5 text-lg mb-5">
          <Image
            src={post.author.profile_image}
            alt="User Icon"
            width={40}
            height={40}
            className="rounded-full border border-white"
          />
          <p>{post.author.username}</p>
        </CardTitle>
      </CardHeader>
      <Image src={post.photo} width={600} height={395} alt="Post Photo" />
      <CardFooter className="grid">
        <div className="flex justify-between mb-4">
          <div>
            <LikeButton post_id={post.id} />
          </div>
          <div>{new Date(post.created_at).toLocaleString()}</div>
        </div>
        <div className="flex items-center justify-start gap-3">
          <p>{post.author.username}</p>
          <p>{post.content}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
