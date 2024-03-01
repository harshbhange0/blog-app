import { Context } from "hono";
import { generateJwtToken } from "../utils";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { jwt, verify } from "hono/jwt";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export const Register = async (c: Context) => {
  const prisma = await c.get("prisma");

  const body = await c.req.json();
  const { success } = await registerSchema.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      error: "invalid inputs / body",
    });
  }
  try {
    const exUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (exUser) {
      c.status(200);
      return c.json({ msg: "user Already registered" });
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await generateJwtToken(user, c);
    if (user) {
      c.status(200);
      return c.json({ success: true, token, id: user.id });
    }
  } catch (error) {
    c.status(400);
    return c.json({ error: "unable to register user" });
  }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const Login = async (c: Context) => {
  const prisma = await c.get("prisma");
  const body = await c.req.json();
  const { success } = await loginSchema.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      error: "invalid inputs / body",
    });
  }
  try {
    const exUser = await prisma.user.findUnique({
      where: { email: body.email, password: body.password },
    });
    if (exUser) {
      const token = await generateJwtToken(exUser, c);
      c.status(200);
      return c.json({ success: true, token, id: exUser.id });
    }
  } catch (error) {
    c.status(400);
    return c.json({ error: "unable to log in user" });
  }
};
export const TokenAuth = async (c: Context) => {
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
      c.status(200);
      return c.json({ auth: true });
    }
  } catch (error) {
    //@ts-ignore
    return c.json({ error: error?.name });
  }
};
