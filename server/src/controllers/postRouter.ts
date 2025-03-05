import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { PostInput, PostWithUser } from "../types";

export const getAllPosts = async (_: Request, res: Response): Promise<void> => {
  try {
    const posts: PostWithUser[] = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profile_image: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "All Post Found Successfully",
      result: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get All Posts",
    });
  }
};

export const getPostByUuid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const uuid: string = req.params.id;

  try {
    const post: PostWithUser | null = await findPostByUuid(uuid);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Post Found Successfully",
      result: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Post By Uuid",
    });
  }
};

export const createNewPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { photo, content }: PostInput = req.body;

  try {
    const user_id: string | undefined = req.user?.id;
    if (!user_id) {
      res.status(404).json({
        success: false,
        message: "User Id Not Found",
      });
      return;
    }

    const newPost: PostWithUser = await prisma.post.create({
      data: {
        photo,
        content: content || null,
        author_id: user_id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profile_image: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      result: newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Create New Post",
    });
  }
};

export const updatePostByUuid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const uuid: string = req.params.id;
  const { content }: { content?: string } = req.body;

  try {
    const post: PostWithUser | null = await findPostByUuid(uuid);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
      return;
    }

    const updatedPost: PostWithUser = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        content: content || post.content,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profile_image: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Post Updated Successfully",
      result: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Update Post By Uuid",
    });
  }
};

export const deletePostByUuid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const uuid: string = req.params.id;

  try {
    const post: PostWithUser | null = await findPostByUuid(uuid);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
      return;
    }

    const deletedPost: PostWithUser = await prisma.post.delete({
      where: {
        id: post.id,
      },
      include: {
        author: {
          select: { id: true, username: true, profile_image: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
      result: deletedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Delete Post By Uuid",
    });
  }
};

//Sub Function

export const findPostByUuid = async (
  uuid: string
): Promise<PostWithUser | null> => {
  return await prisma.post.findUnique({
    where: {
      id: uuid,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_image: true,
        },
      },
    },
  });
};
