import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  Login,
  Register,
  TokenAuth,
  UserInfo,
} from "../controllers/User.controllers";
type Variables = {
  prisma: PrismaClient;
};
const userRouter = new Hono<{
  Bindings: { DATABASE: string; JWT_SECRET: string };
  Variables: Variables;
}>();

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/check-token", TokenAuth);
userRouter.get("/me/:id", UserInfo);

export default userRouter;
