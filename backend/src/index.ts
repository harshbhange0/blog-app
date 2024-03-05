import { Hono } from "hono";
import { cors } from "hono/cors";
import userRouter from "./routes/User.routes";
import postRouter from "./routes/Post.routes";
import { rootHandler } from "./utils/rootHandler";
import { deleteAllPost, deleteAllUser } from "./utils/deleteHandler";
// Create the main Hono app
const app = new Hono<{
  Bindings: { DATABASE: string; JWT_SECRET: string };
}>();

app.get("/", rootHandler);
app.use(
  "*",
  cors({
    origin: "*",
  })
);
app.get("/delete-all-user", deleteAllUser);
app.get("/delete-all-post", deleteAllPost);
app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", postRouter);

export default app;
