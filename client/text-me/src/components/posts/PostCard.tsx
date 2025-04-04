import React, { JSX } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { PostWithUser } from "@/types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentDialog from "./comments/CommentDialog";
import Link from "next/link";
import LikeButton from "./likes/LikeButton";

const PostCard = ({ post }: { post: PostWithUser }): JSX.Element => {
  return (
    <Card className="relative shadow-md border border-foreground w-[calc(100vw-40px)] sm:w-[400px] md:w-[500px] lg:w-[700px] h-[500px] lg:h-[600px] overflow-hidden z-10">
      <CardHeader>
        <CardTitle className="flex items-center gap-5 text-lg mb-5">
          <Link href={`account/${post.author_id}`}>
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage
                src={post.author.profile_image || "/user-icon.jpeg"}
              />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </Link>

          <p>{post.author.username}</p>
        </CardTitle>
      </CardHeader>

      <div className="relative w-[calc(100vw-40px)] sm:w-[400px] md:w-[500px] lg:w-[700px] h-[300px] md:h-[400px] overflow-hidden z-0">
        <Image
          src={post.photo}
          alt="Post Photo"
          fill
          priority
          className="absolute object-cover"
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
