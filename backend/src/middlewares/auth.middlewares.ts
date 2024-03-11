import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const Auth = async (c: Context, next: Next) => {
  const token = await c.req.header("authorization");
  try {
    if (!token) {
      c.status(404);
      return c.json({ msg: "/api/v1/* provide token in headers" });
    } else {
      const prisma = await new PrismaClient({
        datasourceUrl: c.env.DATABASE,
      }).$extends(withAccelerate());
      if (!prisma) {
        c.status(404);
        return c.json({ msg: "unable to get prisma client" });
      }
      const verifiedToken = await verify(token, c.env.JWT_SECRET);
      const exUser = await prisma.user.findUnique({
        where: {
          email: verifiedToken.email,
        },
      });
      if (!exUser) {
        c.status(404);
        return c.json({ auth: false, msg: "user not found" });
      }
      return await next();
    }
  } catch (error) {
    console.log(error);

    return c.json({ error: "auth" });
  }
};
export default Auth;
