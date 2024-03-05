// import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { Context, Next } from "hono";

// export async function prismaClientHandler(c: Context, next: Next) {
//   try {
//     const prisma = await new PrismaClient({
//       datasourceUrl: c.env.DATABASE,
//     }).$extends(withAccelerate());
//     if (!prisma) {
//       c.status(404);
//       return c.json({ msg: "unable to get prisma client" });
//     }
//     //@ts-ignore
//     c.set("prisma", prisma);
//     return await next();
//   } catch (error) {
//     console.log(error);
//     c.status(503);
//     return c.json({ msg: "error in /api/v1/user/*" });
//   }
// }
