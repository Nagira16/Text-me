import { UserInfo } from "@/types";
import { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import FollowButton from "../follows/FollowButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

const UserCard = ({ user }: { user: UserInfo }): JSX.Element => {
  const router: AppRouterInstance = useRouter();
  return (
    <div className="py-3 flex justify-around items-center">
      <div>
        <Avatar
          onClick={() => router.push(`/account/${user.id}`)}
          className="size-8 lg:size-12 border-2 border-white"
        >
          <AvatarImage src={user.profile_image || "/user-icon.jpeg"} />
          <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="text-xs lg:text-base">{user.username}</p>
      </div>
      <div className="hidden md:block">
        <FollowButton user_id={user.id} />
      </div>
    </div>
  );
};

export default UserCard;
