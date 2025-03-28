"use client";

import { getUserById } from "@/actions";
import { UserWithPostData } from "@/types";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { Button } from "./ui/button";
import { useAuth } from "./provider/AuthContent";
import FollowButton from "./FollowButton";
import { useSocket } from "./provider/SocketContext";
import Link from "next/link";

const UserProfile = (): JSX.Element => {
  const { user } = useAuth();
  const socket = useSocket();
  const { id }: { id: string } = useParams();
  const [userData, setUserData] = useState<UserWithPostData["result"] | null>(
    null
  );
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      const { success, result }: UserWithPostData = await getUserById(id);
      if (success && result) {
        setUserData(result);
        setFollowerCount(result.followerCount);
        setFollowingCount(result.followingCount);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinUserProfile", id);

    socket.on(
      "followerCountUpdate",
      ({ userId, count }: { userId: string; count: number }) => {
        if (userId === id) {
          setFollowerCount(count);
        }
      }
    );

    return () => {
      socket.emit("leaveRoom", id);
      socket.off("followerCountUpdate");
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  const selectedUser = userData.user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-10">
      <Card className="w-full max-w-screen-md p-6 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-white p-1">
              <AvatarImage
                src={selectedUser.profile_image || "/default-avatar.png"}
              />
              <AvatarFallback>{selectedUser.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{selectedUser.username}</h2>
              <p className="text-sm text-gray-500">
                {followerCount} Followers ・ {followingCount} Following
              </p>
            </div>
            <div>
              {user?.id === selectedUser.id ? (
                <Button>Edit</Button>
              ) : (
                <FollowButton user_id={selectedUser.id} />
              )}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedUser.post.length > 0 ? (
          selectedUser.post.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <Card className="p-4 shadow-md w-full">
                {post.photo && (
                  <div className="relative w-full h-64 aspect-[4/3]">
                    <Image
                      src={post.photo}
                      alt="Post"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                )}
                <CardContent>
                  <p className="mt-2 text-gray-700">{post.content}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()} ・{" "}
                    {post.likes_count} Likes
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No Posts</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
