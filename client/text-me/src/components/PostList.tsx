import { getAllPost } from "@/actions";
import PostCard from "./PostCard";
import { AllPostData } from "@/types";

const PostList = async () => {
  const posts: AllPostData = await getAllPost();

  if (!posts?.result || posts.result.length === 0) {
    return (
      <div>
        <p>No posts found.</p>
      </div>
    );
  }

  return (
    <div className="my-14 space-y-3">
      {posts.result
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
    </div>
  );
};

export default PostList;
