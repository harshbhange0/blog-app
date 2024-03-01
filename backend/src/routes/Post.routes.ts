import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { CreatePost, DeletePost, GetPosts, UpdatePost } from "../controllers/Post.controllers";
import Auth from "../middlewares/auth.middlewares";
type Variables = {
  prisma: PrismaClient;
};
const postRouter = new Hono<{
  Bindings: { DATABASE: string; JWT_SECRET: string };
  Variables: Variables;
}>();
// this middlewares is used for creating prisma instances
postRouter.use("*", async (c, next) => {
  try {
    const prisma = await new PrismaClient({
      datasourceUrl: c.env.DATABASE,
    }).$extends(withAccelerate());
    if (!prisma) {
      c.status(404);
      return c.json({ msg: "unable to get prisma client" });
    }
    //@ts-ignore
    c.set("prisma", prisma);
    return await next();
  } catch (error) {
    console.log(error);
    c.status(503);
    return c.json({ msg: "error in /api/v1/user/*" });
  }
});
// context this route to check if prisma instances is available or not
postRouter.get("test", async (c) => {
  const prisma = await c.get("prisma");
  const post = await prisma.post.findMany();
  return c.json({ post });
});
// this is a public route to get all the posts
postRouter.get("/all", GetPosts);
//after this route all routes are authorized you have to give token in header
postRouter.post("/auth/create/:userid", Auth, CreatePost);
postRouter.delete("/auth/delete/:postid", Auth, DeletePost);
postRouter.put("/auth/update/:postid", Auth, UpdatePost);


export default postRouter;
