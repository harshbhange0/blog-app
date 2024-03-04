import { Context, Next } from "hono";
import { verify } from "hono/jwt";

const Auth = async (c: Context, next: Next) => {
  const token = await c.req.header("authorization");
  try {
    if (!token) {
      return c.json({ msg: "provide token in headers" });
    } else {
      const prisma = await c.get("prisma");
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
    //@ts-ignore
    return c.json({ error: error });
  }
};
export default Auth;
