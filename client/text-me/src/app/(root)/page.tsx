import PostList from "@/components/PostList";

const Home = async () => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <PostList />
    </div>
  );
};

export default Home;
