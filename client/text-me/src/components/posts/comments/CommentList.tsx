"use client";

import { getCommentByPostId } from "@/actions";
import { AllCommentData, CommentWithUser } from "@/types";
import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Skeleton } from "../../ui/skeleton";
import { useMediaQuery } from "react-responsive";

const CommentList = ({
  post_id,
  allComments,
  setComments,
}: {
  post_id: string;
  allComments: CommentWithUser[];
  setComments: Dispatch<SetStateAction<CommentWithUser[]>>;
}): JSX.Element => {
  const [expandedComments, setExpandedComments] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });

  useEffect(() => {
    const fetchAllComments = async (): Promise<void> => {
      const { success, result }: AllCommentData = await getCommentByPostId(
        post_id
      );

      if (success && result) {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <ul className="space-y-3 overflow-y-scroll h-[200px]">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="w-full h-12" />
        ))}
      </ul>
    );
  }

  return (
    <>
      {allComments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet.</p>
      ) : (
        <ul className="space-y-3 overflow-y-scroll h-[200px] sm:h-[300px]">
          {allComments.map((comment) => (
            <li
              key={comment.id}
              className="flex flex-wrap justify-between items-start sm:items-center gap-4 border-b border-foreground pb-2"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-7 h-7 border border-white">
                    <AvatarImage
                      src={comment.user.profile_image || "/user-icon.jpeg"}
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-sm">
                    {comment.user.username}
                  </p>
                </div>

                <div className="max-w-full sm:max-w-[400px] text-sm text-gray-400 break-words">
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
                  ) : comment.content.length > (isSmallScreen ? 25 : 35) ? (
                    <span>
                      {comment.content.slice(0, isSmallScreen ? 25 : 35)}...
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

              <div className="text-xs text-gray-500 sm:text-right">
                {new Date(comment.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CommentList;
