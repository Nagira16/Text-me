export type FetchData = {
  success: boolean;
  message: string;
};

export type UserData = FetchData & {
  result: UserWithoutPassword | null;
};

export type RegisterInput = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  profile_image?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

type User = {
  id: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  profile_image: string;
  role: Role;
  updated_at: Date;
};

export type UserWithoutPassword = Omit<User, "password">;

type UserInfo = { id: string; username: string; profile_image: string };

type Post = {
  id: string;
  created_at: Date;
  updated_at: Date;
  photo: string;
  content: string | null;
  author_id: string;
  likes_count: number;
};

type PostInfo = {
  id: string;
  content: string | null;
  created_at: Date;
  photo: string;
  likes_count: number;
};

export type PostWithUser = Post & {
  author: UserInfo;
};

type Like = {
  id: string;
  user_id: string;
  post_id: string;
  created_at: Date;
};

export type LikeWithUser = Like & {
  user: UserInfo;
};

export type LikeWithPost = Like & {
  post: PostInfo;
};

type Follow = {
  id: string;
  created_at: Date;
  follower_id: string;
  following_id: string;
};

export type FollowingWithUser = Follow & {
  following: UserInfo;
};

type Conversation = {
  id: string;
  created_at: Date;
  user1_id: string;
  user2_id: string;
};

export type ConversationWithUser = Conversation & {
  user1: UserInfo;
  user2: UserInfo;
};

type Comment = {
  id: string;
  created_at: Date;
  content: string;
  user_id: string;
  post_id: string;
};

export type CommentWithUser = Comment & {
  user: UserInfo;
};
