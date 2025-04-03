import { getAllFollower, getAllFollowing } from "@/actions";
import { UserInfo } from "@/types";
import { JSX, useEffect, useState } from "react";
import UserCard from "../Users/UserCard";

const FollowSetting = (): JSX.Element => {
  const [followers, setFollowers] = useState<UserInfo[]>([]);
  const [following, setFollowing] = useState<UserInfo[]>([]);

  useEffect(() => {
    const fetchFollow = async (): Promise<void> => {
      const followerResult = await getAllFollower();
      const followingResult = await getAllFollowing();

      setFollowers(followerResult.result.map((follow) => follow.follower));
      setFollowing(followingResult.result.map((follow) => follow.following));
    };

    fetchFollow();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <p className="text-3xl font-semibold">FollowSetting</p>

      <section className="w-full flex items-start pt-5">
        <article className="flex-1 border-r-4 min-h-screen">
          <h5 className="text-center text-xl font-semibold border-b pb-2">
            Follower
          </h5>
          <ul className="mx-3">
            {followers.map((user, i) => (
              <div key={i}>
                <UserCard user={user} />
                <hr className="border-white" />
              </div>
            ))}
          </ul>
        </article>
        <article className="flex-1">
          <h5 className="text-center text-xl font-semibold border-b pb-2">
            Following
          </h5>
          <ul className="mx-3">
            {following.map((user, i) => (
              <div key={i}>
                <UserCard user={user} />
                <hr className="border-white" />
              </div>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
};

export default FollowSetting;
