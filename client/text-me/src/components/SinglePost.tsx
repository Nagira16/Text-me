"use client";

import { getPostById } from "@/actions";
import { CommentWithUser, PostWithUser } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import LikeButton from "./LikeButton";
import Link from "next/link";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const SinglePost = () => {
  const { postId }: { postId: string } = useParams();
  const [post, setPost] = useState<PostWithUser | null>(null);
  const [allComments, setComments] = useState<CommentWithUser[]>([]);

  useEffect(() => {
    const fetchSinglePost = async () => {
      const { success, result } = await getPostById(postId);
      if (success && result) {
        setPost(result);
      }
    };

    fetchSinglePost();
  }, []);

  return (
    <>
      {post ? (
        <Card className="relative shadow-md border border-black dark:border-white w-[700px] h-[900px] overflow-hidden z-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-5 text-lg mb-5">
              <Link href={`/account/${post.author_id}`}>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src={post.author.profile_image} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </Link>

              <p>{post.author.username}</p>
            </CardTitle>
          </CardHeader>

          <div className="relative w-[700px] h-[400px] overflow-hidden z-0">
            <Image
              src={post.photo}
              alt="Post Photo"
              layout="fill"
              objectFit="cover"
              className="absolute"
            />
          </div>

          <CardFooter className="grid space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LikeButton post_id={post.id} />
              </div>
              <div>{new Date(post.created_at).toLocaleString()}</div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <p>{post.author.username}</p>
              <p>{post.content}</p>
            </div>
          </CardFooter>
          <hr />
          <div className="h-[200px] w-[90%] mx-auto">
            <CommentList
              allComments={allComments}
              setComments={setComments}
              post_id={postId}
            />
          </div>
          <div className="w-[95%] mx-auto">
            <CommentForm post_id={postId} setComments={setComments} />
          </div>
        </Card>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        </div>
      )}
    </>
  );
};

export default SinglePost;
