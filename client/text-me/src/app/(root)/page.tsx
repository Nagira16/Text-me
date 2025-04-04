import PostList from "@/components/posts/PostList";
import { JSX } from "react";

const Home = async (): Promise<JSX.Element> => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <PostList />
    </div>
  );
};

export default Home;
