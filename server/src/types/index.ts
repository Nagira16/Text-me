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
  profile_image?: string;
};
