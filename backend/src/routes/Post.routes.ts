import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {
  CreatePost,
  DeletePost,
  GetPost,
  GetPosts,
  MyPosts,
  UpdatePost,
} from "../controllers/Post.controllers";
import Auth from "../middlewares/auth.middlewares";
type Variables = {
  prisma: PrismaClient;
};
const postRouter = new Hono<{
  Bindings: { DATABASE: string; JWT_SECRET: string };
  Variables: Variables;
}>();
// this middlewares is used for creating prisma instances

// this is a public route to get all the posts
postRouter.get("/all", GetPosts);
postRouter.get("/get-post/:postid", GetPost);
//after this route all routes are authorized you have to give token in header
postRouter.post("/auth/create", Auth, CreatePost);
postRouter.get("/my-post/:userid", Auth, MyPosts);
postRouter.delete("/auth/delete/:postid", Auth, DeletePost);
postRouter.put("/auth/update/:postid", Auth, UpdatePost);

export default postRouter;
