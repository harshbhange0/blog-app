import { Context } from "hono";

export function rootHandler(c: Context) {
  return c.json({
    health: Date(),
    URL: "https://blog-backend.harshbhange123.workers.dev",
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
}
