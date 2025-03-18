"use server";

import {
  AllCommentData,
  AllPostData,
  CommentData,
  FollowData,
  LikeReturnType,
  ToggleLikeData,
  UserData,
  UserWithPostData,
} from "@/types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const getUser = async (): Promise<UserData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch("http://localhost:5001/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
  });
  const data: UserData = await res.json();

  return data;
};

export const getUserById = async (
  user_id: string
): Promise<UserWithPostData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(`http://localhost:5001/user/${user_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
  });
  const data: UserWithPostData = await res.json();

  return data;
};

export const getAllPost = async (): Promise<AllPostData> => {
  const res: Response = await fetch("http://localhost:5001/post");
  const data: AllPostData = await res.json();

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return {
    success: data.success,
    message: data.message,
    result: data.result,
  };
};

export const checkLiked = async (post_id: string): Promise<LikeReturnType> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(`http://localhost:5001/like/${post_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
  });
  const data: LikeReturnType = await res.json();

  return data;
};

export const toggleLike = async (post_id: string): Promise<ToggleLikeData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(`http://localhost:5001/like/${post_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
  });
  const data: ToggleLikeData = await res.json();

  return data;
};

export const getCommentByPostId = async (
  post_id: string
): Promise<AllCommentData> => {
  const res: Response = await fetch(`http://localhost:5001/comment/${post_id}`);
  const data: AllCommentData = await res.json();

  return data;
};

export const createNewComment = async (
  post_id: string,
  content: string
): Promise<CommentData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(
    `http://localhost:5001/comment/${post_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }
  );
  const data: CommentData = await res.json();

  return data;
};

export const getAllFollowing = async () => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(`http://localhost:5001/follow/following`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
  });
  const data: FollowData = await res.json();

  console.log(data);

  return data;
};
