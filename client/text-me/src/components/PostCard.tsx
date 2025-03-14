import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { PostWithUser } from "@/types";
import Image from "next/image";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";

const PostCard = ({ post }: { post: PostWithUser }) => {
  return (
    <Card className="relative shadow-md border border-white w-[700px] h-[600px] overflow-hidden z-10">
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

      <div className="relative w-[700px] h-[400px] overflow-hidden z-0">
        <Image
          src={post.photo}
          alt="Post Photo"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      </div>

      <CardFooter className="grid space-y-4">
        <div className="flex justify-between">
          <div>
            <LikeButton post_id={post.id} />
          </div>
          <div>{new Date(post.created_at).toLocaleString()}</div>
        </div>
        <div className="flex items-center justify-start gap-3">
          <p>{post.author.username}</p>
          <p>{post.content}</p>
        </div>
        <CommentList post_id={post.id} />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
