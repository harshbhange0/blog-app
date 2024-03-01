import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { sign } from "hono/jwt";

interface User {
  email: string;
  password: string;
  name: string | null;
  id: string;
}
export const generateJwtToken = (data: User, c: Context) => {
  const token = sign(data, c.env.JWT_SECRET,);
  return token;
};
