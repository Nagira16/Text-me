import { getAllPosts, getFollowingAllPost } from "@/actions";
import PostCard from "./PostCard";
import { AllPostData, PostWithUser } from "@/types";
import { JSX } from "react";

const PostList = async (): Promise<JSX.Element> => {
  let posts: PostWithUser[] = [];

  const { result: followingPosts }: AllPostData = await getFollowingAllPost();

  if (followingPosts && followingPosts.length > 0) {
    posts = followingPosts;
  } else {
    const { result: allPosts }: AllPostData = await getAllPosts();
    if (allPosts) posts = allPosts;
  }

  if (!posts || posts.length === 0) {
    return (
      <div>
        <p>No posts found.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-25 sm:my-10 space-y-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
