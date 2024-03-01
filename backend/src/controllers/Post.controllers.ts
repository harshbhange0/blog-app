import { Context } from "hono";

export const GetPosts = async (c: Context) => {
  try {
    const prisma = await c.get("prisma");
    const posts = await prisma.post.findMany({
      where: {
        published: true,
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
export const CreatePost = async (c: Context) => {
  try {
    const prisma = await c.get("prisma");
    const id = c.req.param("userid");
    const body = await c.req.json();
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
export const DeletePost = async (c: Context) => {
  try {
    const body = await c.req.json();
    const id = c.req.param("postid");
    const prisma = await c.get("prisma");
    const deletedPost = await prisma.post.delete({
      where: { authorId: body.userId, id },
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
    const body = await c.req.json();
    const id = c.req.param("postid");
    const prisma = await c.get("prisma");

    const deletedPost = await prisma.post.update({
      where: { authorId: body.userId, id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });
    if (!deletedPost) {
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
