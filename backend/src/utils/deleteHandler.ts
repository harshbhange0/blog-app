import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

export async function deleteAllUser(c: Context) {
     const prisma = await new PrismaClient({
       datasourceUrl: c.env.DATABASE,
     }).$extends(withAccelerate());
     try {
       const user = await prisma.user.deleteMany();
       if (!user) {
         return c.json({
           error: "error deleting",
         });
       } else {
         return c.json({
           success: "success deleting",
         });
       }
     } catch (err) {
       console.log(err);
     }
}
export async function deleteAllPost(c: Context) {
  const prisma = await new PrismaClient({
    datasourceUrl: c.env.DATABASE,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.post.deleteMany();
    if (!user) {
      return c.json({
        error: "error deleting",
      });
    } else {
      return c.json({
        success: "success deleting",
      });
    }
  } catch (err) {
    console.log(err);
  }
}