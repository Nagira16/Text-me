import React, { JSX } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { PostWithUser } from "@/types";
import Image from "next/image";
import LikeButton from "./LikeButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CommentDialog from "./CommentDialog";
import Link from "next/link";

const PostCard = ({ post }: { post: PostWithUser }): JSX.Element => {
  return (
    <Card className="relative shadow-md border border-black dark:border-white w-[700px] h-[600px] overflow-hidden z-10">
      <CardHeader>
        <CardTitle className="flex items-center gap-5 text-lg mb-5">
          <Link href={`account/${post.author_id}`}>
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src={post.author.profile_image} />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </Link>

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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LikeButton post_id={post.id} />
            <CommentDialog post_id={post.id} />
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
