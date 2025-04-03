"use client";

import { JSX, useEffect, useState } from "react";
import { useAuth } from "../provider/AuthContent";
import { getAllPostsByUserId } from "@/actions";
import { PostWithUser } from "@/types";
import PostDeleteButton from "../PostDeleteButton";
import PostEditButton from "../PostEditButton";
import SmallPostCard from "../posts/SmallPostCard";
import { Skeleton } from "../ui/skeleton";

const PostSetting = (): JSX.Element => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      </div>
    );
  }

  useEffect(() => {
    const fetchAllPost = async (): Promise<void> => {
      const { success, result } = await getAllPostsByUserId(user.id);
      if (success && result) {
        setIsLoading(false);
        setPosts(result);
      }
    };
    fetchAllPost();
  }, [user.id]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl font-semibold">PostSetting</p>
        <section className="p-10 flex justify-center items-center flex-wrap ">
          {Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={i} className="m-5 size-[360px]" />
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-3xl font-semibold">PostSetting</p>
      <section className="p-10 flex justify-center items-center flex-wrap ">
        {posts.map((post) => (
          <div key={post.id} className="relative m-5">
            <SmallPostCard post={post} />
            <PostEditButton post_id={post.id} setPosts={setPosts} />
            <PostDeleteButton post_id={post.id} setPosts={setPosts} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default PostSetting;
