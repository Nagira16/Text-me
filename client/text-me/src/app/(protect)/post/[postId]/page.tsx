import SinglePost from "@/components/posts/SinglePost";
import { JSX } from "react";

const Post = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full grid place-items-center py-5">
      <SinglePost />
    </div>
  );
};

export default Post;
