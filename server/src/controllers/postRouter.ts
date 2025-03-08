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
      result: null,
    });
  }
};

export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post_id: string = req.params.id;

    const post: PostWithUser | null = await findPostById(post_id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
        result: null,
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
      message: "Server Error: Get Post By Id",
      result: null,
    });
  }
};

export const createNewPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content }: PostInput = req.body;

    const photo: Express.Multer.File | undefined = req.file;

    if (!photo) {
      res.status(400).json({
        success: false,
        message: "Bad Request: No image uploaded",
        result: null,
      });
      return;
    }

    const user_id: string | undefined = req.user?.id;
    if (!user_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
        result: null,
      });
      return;
    }

    const photoUrl = `http://localhost:5001/uploads/${photo.filename}`;

    const newPost: PostWithUser = await prisma.post.create({
      data: {
        photo: photoUrl,
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
      result: null,
    });
  }
};

export const updatePostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post_id: string = req.params.id;
    const { content }: { content?: string } = req.body;

    const post: PostWithUser | null = await findPostById(post_id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
        result: null,
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
      message: "Server Error: Update Post By Id",
      result: null,
    });
  }
};

export const deletePostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post_id: string = req.params.id;

    const post: PostWithUser | null = await findPostById(post_id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
        result: null,
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
      message: "Server Error: Delete Post By Id",
      result: null,
    });
  }
};

//Sub Function

export const findPostById = async (
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
