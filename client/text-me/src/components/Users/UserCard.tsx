import { UserInfo } from "@/types";
import { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import FollowButton from "../follows/FollowButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

const UserCard = ({ user }: { user: UserInfo }): JSX.Element => {
  const router: AppRouterInstance = useRouter();
  return (
    <div className="p-3 flex justify-around items-center">
      <div>
        <Avatar
          onClick={() => router.push(`/account/${user.id}`)}
          className="size-12 border-2 border-white"
        >
          <AvatarImage src={user.profile_image || "/user-icon.jpeg"} />
          <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p>{user.username}</p>
      </div>
      <div>
        <FollowButton user_id={user.id} />
      </div>
    </div>
  );
};

export default UserCard;
