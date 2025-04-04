"use server";

import {
  AllCommentData,
  AllLikeData,
  AllPostData,
  CheckFollowData,
  CommentData,
  FollowerData,
  FollowingData,
  LikeReturnType,
  PostData,
  ToggleFollowData,
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

export const getAllPosts = async (): Promise<AllPostData> => {
  const res: Response = await fetch("http://localhost:5001/post");
  const data: AllPostData = await res.json();

  return data;
};

export const getAllPostsByUserId = async (
  user_id: string
): Promise<AllPostData> => {
  const res: Response = await fetch(
    `http://localhost:5001/post/user/${user_id}`
  );
  const data: AllPostData = await res.json();

  return data;
};

export const getPostById = async (post_id: string): Promise<PostData> => {
  const res: Response = await fetch(`http://localhost:5001/post/${post_id}`);
  const data: PostData = await res.json();

  return data;
};

export const updatePostById = async (
  post_id: string,
  formData: FormData
): Promise<PostData> => {
  const content = formData.get("content") as string;

  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(`http://localhost:5001/post/${post_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  const data: PostData = await res.json();

  return data;
};

export const deletePostById = async (post_id: string): Promise<PostData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(`http://localhost:5001/post/${post_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-type": "application/json",
    },
  });
  const data: PostData = await res.json();

  return data;
};

export const getFollowingAllPost = async (): Promise<AllPostData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch("http://localhost:5001/post/follow", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-type": "application/json",
    },
  });
  const data: AllPostData = await res.json();

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return data;
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

export const getAllFollower = async (): Promise<FollowerData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch("http://localhost:5001/follow/follower", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
  });
  const data: FollowerData = await res.json();

  return data;
};

export const getAllFollowing = async (): Promise<FollowingData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(`http://localhost:5001/follow/following`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
  });
  const data: FollowingData = await res.json();

  return data;
};

export const checkFollowing = async (user_id: string): Promise<boolean> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(
    `http://localhost:5001/follow/following/${user_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data: CheckFollowData = await res.json();

  return data.result ? true : false;
};

export const checkFollower = async (user_id: string): Promise<boolean> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(
    `http://localhost:5001/follow/follower/${user_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data: CheckFollowData = await res.json();

  return data.result ? true : false;
};

export const toggleFollow = async (
  user_id: string
): Promise<ToggleFollowData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(`http://localhost:5001/follow/${user_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
  });
  const data: ToggleFollowData = await res.json();

  return data;
};

export const updateUser = async (formData: FormData): Promise<UserData> => {
  const updateData = generateUpdateUserData(formData);
  if (!updateData) {
    return { success: false, message: "No Data To Update", result: null };
  }

  const cookie: RequestCookie | undefined = (await cookies()).get("token");

  const res: Response = await fetch(`http://localhost:5001/user`, {
    method: "PUT",
    body: updateData,
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
    },
  });

  const data: UserData = await res.json();

  return data;
};

const generateUpdateUserData = (formData: FormData): FormData | null => {
  const username = formData.get("username") as string;
  const profile_image = formData.get("profile_image") as File | null;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  if (!username && profile_image?.size === 0 && !firstName && !lastName)
    return null;

  const data = new FormData();
  if (username) data.append("username", username);
  if (profile_image && profile_image.size > 0) {
    data.append("profile_image", profile_image);
  }
  if (firstName) data.append("firstName", firstName);
  if (lastName) data.append("lastName", lastName);

  return data;
};

export const getAllLikedPost = async (): Promise<AllLikeData> => {
  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch("http://localhost:5001/like", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
  });
  const data: AllLikeData = await res.json();

  return data;
};

export const updatePassword = async (
  prevState: UserData,
  formData: FormData
): Promise<UserData> => {
  const current_password = formData.get("current_password") as string;
  const new_password = formData.get("new_password") as string;
  const confirm_password = formData.get("confirm_password") as string;

  const cookie: RequestCookie | undefined = (await cookies()).get("token");
  const res: Response = await fetch(`http://localhost:5001/user/password`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${cookie?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      current_password,
      new_password,
      confirm_password,
    }),
  });
  const data: UserData = await res.json();

  return data;
};
