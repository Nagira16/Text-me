"use client";

import { checkLiked, getPostById, toggleLike } from "@/actions";
import { JSX, useEffect, useState } from "react";
import { LikeReturnType, ToggleLikeData } from "@/types";
import { useAuth } from "@/components/provider/AuthContent";
import { useSocket } from "@/components/provider/SocketContext";

const LikeButton = ({ post_id }: { post_id: string }): JSX.Element => {
  const { isSignedIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const socket = useSocket();

  const handleLike = async (): Promise<void> => {
    if (!socket) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    const { liked }: ToggleLikeData = await toggleLike(post_id);

    setIsLiked(liked);
    if (liked) {
      const { result } = await getPostById(post_id);
      socket.emit("notification", {
        type: "Like",
        username: user?.username,
        post: result,
        userId: result?.author_id,
      });
    }
  };

  useEffect(() => {
    const fetchLike = async () => {
      const { liked }: LikeReturnType = await checkLiked(post_id);
      setIsLoading(false);
      setIsLiked(liked ? true : false);
    };
    fetchLike();
  }, [post_id]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      {isSignedIn && (
        <button
          onClick={handleLike}
          className={`text-2xl cursor-pointer transition-transform duration-1000 ${
            isAnimating && "animate-ping"
          }`}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
      )}
    </>
  );
};

export default LikeButton;
