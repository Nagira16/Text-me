"use client";

import { getCommentByPostId } from "@/actions";
import { AllCommentData, CommentWithUser } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentList = ({
  post_id,
  allComments,
  setComments,
}: {
  post_id: string;
  allComments: CommentWithUser[];
  setComments: Dispatch<SetStateAction<CommentWithUser[]>>;
}) => {
  const [expandedComments, setExpandedComments] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchAllComments = async () => {
      const { success, result }: AllCommentData = await getCommentByPostId(
        post_id
      );

      if (success && result) {
        setComments(result);
      }
    };

    fetchAllComments();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {allComments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet.</p>
      ) : (
        <ul className="space-y-3 overflow-y-scroll h-[200px]">
          {allComments.map((comment) => (
            <li
              key={comment.id}
              className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-200 pb-2"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-7 h-7 border border-white">
                    <AvatarImage src={comment.user.profile_image} />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-sm">
                    {comment.user.username}
                  </p>
                </div>

                <div className="max-w-[400px] text-sm text-gray-400 break-words">
                  {expandedComments[comment.id] ? (
                    <span>
                      {comment.content}{" "}
                      <button
                        className="text-blue-500 ml-1 hover:underline"
                        onClick={() => toggleExpand(comment.id)}
                      >
                        Close
                      </button>
                    </span>
                  ) : comment.content.length > 35 ? (
                    <span>
                      {comment.content.slice(0, 35)}...
                      <button
                        className="text-blue-500 ml-1 hover:underline"
                        onClick={() => toggleExpand(comment.id)}
                      >
                        Read more
                      </button>
                    </span>
                  ) : (
                    comment.content
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* <CommentForm post_id={post_id} setComments={setComments} /> */}
    </>
  );
};

export default CommentList;
