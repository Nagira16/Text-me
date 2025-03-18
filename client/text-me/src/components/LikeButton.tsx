"use client";

import { checkLiked, toggleLike } from "@/actions";
import { useEffect, useState } from "react";
import { useAuth } from "./provider/AuthContent";
import { LikeReturnType, ToggleLikeData } from "@/types";

const LikeButton = ({ post_id }: { post_id: string }) => {
  const { isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = async () => {
    const { liked }: ToggleLikeData = await toggleLike(post_id);

    setIsLiked(liked);
  };

  useEffect(() => {
    const fetchLike = async () => {
      const { liked }: LikeReturnType = await checkLiked(post_id);
      setIsLoading(false);
      setIsLiked(liked ? true : false);
    };
    fetchLike();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      {isSignedIn && (
        <button onClick={handleLike} className="text-3xl">
          {isLiked ? "❤️" : "🤍"}
        </button>
      )}
    </>
  );
};

export default LikeButton;
