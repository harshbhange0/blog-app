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
  return c.json({
    health: Date(),
    URL: "https://backend.harshbhange123.workers.dev/",
    endPoints: {
      user: {
        "/api/v1/user": [
          {
            endpoint: "/register",
            ReqBody: ["email", "password", "name"],
            ResBody: ["success", "token", "id"],
          },
          {
            endpoint: "/login",
            ReqBody: ["email", "password"],
            ResBody: ["success", "token", "id"],
          },
          {
            endpoint: "/check-token",
            ReqBody: [],
            ReqHeaders: ["authorization"],
            ResBody: ["auth"],
          },
          {
            endpoint: "/me",
            ReqBody: ["userId"],
            ReqHeaders: ["authorization"],
            ResBody: [
              {
                email: true,
                name: true,
                posts: [{}],
              },
            ],
          },
        ],
      },

      post: {
        "/api/v1/post": [
          {
            endpoint: "/all",
            ReqBody: [],
            ReqHeaders: [],
            ResBody: ["posts"],
          },
          {
            endpoint: "/auth/create/:userId",
            ReqBody: ["title", "content", "published"],
            ReqHeaders: ["authorization"],
            ResBody: [{ msg: "post  created" }],
          },
          {
            endpoint: "/auth/delete/:postId",
            ReqBody: [],
            ReqHeaders: ["authorization"],
            ResBody: [{ msg: "post  deleted" }],
          },
          {
            endpoint: "/auth/update/:postId",
            ReqBody: ["title", "content", "published"],
            ReqHeaders: ["authorization"],
            ResBody: [{ msg: "post  updated" }],
          },
        ],
      },
    },
  });
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
app.get("/delete-all-post", async (c) => {
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
});

app.route("/api/v1/user", userRouter);

app.route("/api/v1/post", postRouter);

export default app;
