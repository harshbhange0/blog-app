import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Login, Register, TokenAuth } from "../controllers/User.controllers";
type Variables = {
  prisma: PrismaClient;
};
const userRouter = new Hono<{
  Bindings: { DATABASE: string; JWT_SECRET: string };
  Variables: Variables;
}>();
userRouter.use("*", async (c, next) => {
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
// context test route
userRouter.get("test", async (c) => {
  const prisma = await c.get("prisma");
  const users = await prisma.user.findMany();
  return c.json({ users });
});
userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/check-token", TokenAuth);

export default userRouter;
