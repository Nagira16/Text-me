import {
  Comment,
  Conversation,
  Follow,
  Like,
  Message,
  Post,
  User,
} from "@prisma/client";

export type RegisterInput = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type Payload = {
  id: string;
  username: string;
  email: string;
  profile_image: string;
};

export type UserUpdateInput = {
  first_name?: string;
  last_name?: string;
  username?: string;
};

export type PostInput = {
  content?: string;
};

export type CommentInput = {
  content: string;
  post_id: string;
};

export type UserWithoutPassword = Omit<User, "password">;

export type UserInfo = { id: string; username: string; profile_image: string };

type PostInfo = {
  id: string;
  content: string | null;
  photo: string;
  likes_count: number;
  created_at: Date;
  updated_at: Date;
};

export type CommentWithUser = Comment & {
  user: UserInfo;
};

export type PostWithUser = Post & {
  author: UserInfo;
};

export type LikeWithPost = Like & {
  post: PostInfo;
};

export type LikeWithUser = Like & {
  user: UserInfo;
};

export type FollowerWithUser = Follow & {
  follower: UserInfo;
};

export type FollowingWithUser = Follow & {
  following: UserInfo;
};

export type ConversationWithUser = Conversation & {
  user1: UserInfo;
  user2: UserInfo;
};

export type MessageWithUser = Message & {
  sender: UserInfo;
};

export type UserWithPost = UserWithoutPassword & {
  post: {
    id: string;
    created_at: Date;
    updated_at: Date;
    content: string | null;
    photo: string;
    likes_count: number;
  }[];
};

export type NotificationType =
  | {
      type: "Comment";
      username: string;
      comment: string;
      post: PostWithUser;
      userId: string;
    }
  | {
      type: "Follow";
      username: string;
      userId: string;
    }
  | {
      type: "Like";
      username: string;
      post: PostWithUser;
      userId: string;
    };
