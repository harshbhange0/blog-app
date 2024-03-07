import { createBlog, updateBlog } from "@harshbhange0/blogts-types";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

export const GetPosts = async (c: Context) => {
  try {
    const prisma = await new PrismaClient({
      datasourceUrl: c.env.DATABASE,
    }).$extends(withAccelerate());
    if (!prisma) {
      c.status(404);
      return c.json({ msg: "unable to get prisma client" });
    }
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      select: {
        content: true,
        title: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({ posts });
  } catch (error) {
    console.log(error);
    c.status(503);
    return c.json({ error: error });
  }
};
export const GetPost = async (c: Context) => {
  const id = c.req.param("postid");
  console.log(id);

  try {
    const prisma = await new PrismaClient({
      datasourceUrl: c.env.DATABASE,
    }).$extends(withAccelerate());
    if (!prisma) {
      c.status(404);
      return c.json({ msg: "unable to get prisma client" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        published: true,
        content: true,
        title: true,
        id: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({ post });
  } catch (error) {
    console.log(error);
    c.status(503);
    return c.json({ error: error });
  }
};
export const CreatePost = async (c: Context) => {
  try {
    const prisma = await c.get("prisma");
    const id = c.req.param("userid");
    const body = await c.req.json();
    const { success } = createBlog.safeParse(body);
    if (!success) {
      c.status(404);
      return c.json({ msg: "invalid inputs" });
    }
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: id,
        published: true,
      },
    });
    if (!post) {
      c.status(404);
      return c.json({ msg: "unable to create post" });
    }
    c.status(200);
    return c.json({ msg: "post  created" });
  } catch (error) {
    console.log(error);
    c.status(503);
    return c.json({ error: error });
  }
};
export const MyPosts = async (c: Context) => {
  try {
    const prisma = await new PrismaClient({
      datasourceUrl: c.env.DATABASE,
    }).$extends(withAccelerate());
    if (!prisma) {
      c.status(404);
      return c.json({ msg: "unable to get prisma client" });
    }
    const posts = await prisma.post.findMany({
      where: {
        authorId: c.req.param("userid"),
      },
      select: {
        content: true,
        title: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({ posts });
  } catch (error) {
    console.log(error);
    c.status(503);
    return c.json({ error: error });
  }
};
export const DeletePost = async (c: Context) => {
  try {
    const userId = await c.req.header("userId");
    const id = c.req.param("postid");
    const prisma = await c.get("prisma");
    const deletedPost = await prisma.post.delete({
      where: { authorId: userId, id },
    });
    if (!deletedPost) {
      c.status(404);
      return c.json({ msg: "unable to delete post or your not authorized" });
    }
    c.status(200);
    return c.json({ msg: "post deleted" });
  } catch (error) {
    console.log(error);
    c.status(503);
    return c.json({ error: error });
  }
};
export const UpdatePost = async (c: Context) => {
  try {
    const prisma = await c.get("prisma");
    const userId = await c.req.header("userId");
    const id = c.req.param("postid");
    const body = await c.req.json();
    const { success } = updateBlog.safeParse(body);
    if (!success) {
      c.status(404);
      return c.json({ msg: "invalid inputs" });
    }

    const updatePost = await prisma.post.update({
      where: { authorId: userId, id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });
    if (!updatePost) {
      c.status(404);
      return c.json({ msg: "unable to update post" });
    }
    c.status(200);
    return c.json({ msg: "post updated" });
  } catch (error) {
    console.log(error);
    c.status(503);
    return c.json({ error: error });
  }
};
