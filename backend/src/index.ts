import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import userRouter from "./routes/User.routes";
import postRouter from "./routes/Post.routes";
// Create the main Hono app
const app = new Hono<{
  Bindings: { DATABASE: string; JWT_SECRET: string };
}>();

app.get("/", (c) => {
  return c.json({ env: c.env });
});
app.use(
  "*",
  cors({
    origin: "*",
  })
);

app.get("/delete-all-user", async (c) => {
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
});

app.route("/api/v1/user", userRouter);

app.route("/api/v1/post", postRouter);

export default app;
