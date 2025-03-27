"use client";

import { checkLiked, getPostById, toggleLike } from "@/actions";
import { JSX, useEffect, useState } from "react";
import { useAuth } from "./provider/AuthContent";
import { LikeReturnType, ToggleLikeData } from "@/types";
import { useSocket } from "./provider/SocketContext";

const LikeButton = ({ post_id }: { post_id: string }): JSX.Element => {
  const { isSignedIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const socket = useSocket();

  const handleLike = async (): Promise<void> => {
    if (!socket) return;

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
        <button onClick={handleLike} className="text-2xl">
          {isLiked ? "❤️" : "🤍"}
        </button>
      )}
    </>
  );
};

export default LikeButton;
