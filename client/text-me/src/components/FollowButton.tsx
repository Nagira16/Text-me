import { checkFollowing, toggleFollow } from "@/actions";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ToggleFollowData } from "@/types";
import { Skeleton } from "./ui/skeleton";

const FollowButton = ({ user_id }: { user_id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleFollow = async () => {
    const { followed }: ToggleFollowData = await toggleFollow(user_id);

    setIsFollowing(followed);
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
      } text-white border border-white w-28`}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
