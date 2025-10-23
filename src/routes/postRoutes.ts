import { t, Elysia } from "elysia";
import Post from "../models/postModel";

export const postRoutes = new Elysia({ prefix: "/posts" })
  .get("/", async () => {
    return await Post.find().populate("author");
  })
  .post(
    "/",
    async ({ body }) => {
      const post = new Post(body);
      return await post.save();
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.Optional(t.String()),
        author: t.String(),
      }),
    }
  );

export default postRoutes;
