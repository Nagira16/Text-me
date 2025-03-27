import { checkFollowing, toggleFollow } from "@/actions";
import React, { JSX, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ToggleFollowData } from "@/types";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "./provider/AuthContent";
import { useSocket } from "./provider/SocketContext";

const FollowButton = ({ user_id }: { user_id: string }): JSX.Element => {
  const { user } = useAuth();
  const socket = useSocket();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleFollow = async () => {
    const { followed }: ToggleFollowData = await toggleFollow(user_id);

    setIsFollowing(followed);
    if (followed) {
      socket.emit("notification", {
        type: "Follow",
        username: user?.username,
        userId: user_id,
      });
    }
  };

  useEffect(() => {
    const fetchFollow = async () => {
      const result: boolean = await checkFollowing(user_id);
      setIsLoading(false);
      setIsFollowing(result);
    };

    fetchFollow();
  }, [user_id]);

  if (isLoading) {
    return <Skeleton className="w-28 h-[35px]" />;
  }

  return (
    <Button
      onClick={handleFollow}
      className={`${
        isFollowing
          ? "bg-black hover:bg-gray-700"
          : "bg-blue-500 hover:bg-blue-700"
      } text-white border border-white w-28 h-[35px]`}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
