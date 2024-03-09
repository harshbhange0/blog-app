import { Context } from "hono";
import { generateJwtToken } from "../utils";
import { verify } from "hono/jwt";
import { logInSchema, registerSchema } from "@harshbhange0/blogts-types";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const Register = async (c: Context) => {
  const prisma = await new PrismaClient({
    datasourceUrl: c.env.DATABASE,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  let { success } = registerSchema.safeParse(body);
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

export const Login = async (c: Context) => {
  const prisma = await new PrismaClient({
    datasourceUrl: c.env.DATABASE,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  let { success } = logInSchema.safeParse(body);
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
      const prisma = await new PrismaClient({
        datasourceUrl: c.env.DATABASE,
      }).$extends(withAccelerate());
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
export const UserInfo = async (c: Context) => {
  const token = await c.req.header("Authorization");
  if (!token) {
    c.status(404);
    return c.json({ msg: "/api/v1/user/me provide token in headers" });
  }
  try {
    const id = c.req.param("id");
    const prisma = await new PrismaClient({
      datasourceUrl: c.env.DATABASE,
    }).$extends(withAccelerate());
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        name: true,
        posts: true,
      },
    });
    if (!user) {
      c.status(404);
      return c.json({ msg: "user not found" });
    }
    c.status(200);
    return c.json({ user });
  } catch (error) {
    console.log(error);
    c.status(503);
    return c.json({ error: error });
  }
};
