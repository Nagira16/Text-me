import { checkFollower, checkFollowing, toggleFollow } from "@/actions";
import { JSX, useEffect, useState } from "react";
import { ToggleFollowData } from "@/types";
import { useAuth } from "@/components/provider/AuthContent";
import { useSocket } from "@/components/provider/SocketContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const FollowButton = ({ user_id }: { user_id: string }): JSX.Element => {
  const { user } = useAuth();
  const socket = useSocket();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleFollow = async (): Promise<void> => {
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
    const fetchFollow = async (): Promise<void> => {
      const follower = await checkFollower(user_id);
      const following = await checkFollowing(user_id);
      setIsFollower(follower);
      setIsFollowing(following);
      setIsLoading(false);
    };

    fetchFollow();
  }, [user_id]);

  if (isLoading) {
    return <Skeleton className="w-28 h-[35px]" />;
  }

  let buttonText = "Follow";
  if (isFollower && isFollowing) buttonText = "Friend";
  else if (isFollower && !isFollowing) buttonText = "Follow Back";
  else if (!isFollower && isFollowing) buttonText = "Following";

  let buttonStyle = "bg-blue-500 hover:bg-blue-700";
  if (isFollower && isFollowing) buttonStyle = "bg-gray-500 hover:bg-gray-700";
  else if ((isFollower && !isFollowing) || (!isFollower && isFollowing))
    buttonStyle = "bg-black hover:bg-gray-700";

  return (
    <Button
      onClick={handleFollow}
      className={`${buttonStyle} text-white border border-white w-28 h-[35px]`}
    >
      {buttonText}
    </Button>
  );
};

export default FollowButton;
