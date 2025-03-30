import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

interface SmallPostCardProps {
  id: string;
  created_at: Date;
  updated_at: Date;
  content: string | null;
  photo: string;
  likes_count: number;
}

const SmallPostCard = ({ post }: { post: SmallPostCardProps }) => {
  return (
    <Card className="p-4 shadow-md w-full border-black dark:border-white">
      {post.photo && (
        <div className="relative w-full h-64 aspect-[4/3]">
          <Image
            src={post.photo}
            alt="Post"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      <CardContent>
        <p className="mt-2 text-gray-700">{post.content}</p>
        <p className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString()} ・ {post.likes_count}{" "}
          Likes
        </p>
      </CardContent>
    </Card>
  );
};

export default SmallPostCard;
