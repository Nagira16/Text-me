import { getAllLikedPost } from "@/actions";
import { JSX, useEffect, useState } from "react";
import SmallPostCard from "../posts/SmallPostCard";
import { PostInfo } from "@/types";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const LikedSetting = (): JSX.Element => {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllPost = async (): Promise<void> => {
      const { success, result } = await getAllLikedPost();

      if (success && result) {
        setIsLoading(false);
        setPosts(result.map((like) => like.post));
      }
    };
    fetchAllPost();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center max-sm:space-y-5">
        <p className="text-3xl font-semibold">PostSetting</p>
        <section className="sm:p-10 flex justify-center items-center flex-wrap ">
          {Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={i} className="m-5 size-[300px] sm:size-[360px]" />
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center max-sm:space-y-5">
      <p className="text-3xl font-semibold">PostSetting</p>
      <section className="sm:p-10 flex justify-center items-center flex-wrap ">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <Link
              href={`/post/${post.id}`}
              key={post.id}
              className="relative m-5"
            >
              <SmallPostCard post={post} />
            </Link>
          ))
        )}
      </section>
    </div>
  );
};

export default LikedSetting;
