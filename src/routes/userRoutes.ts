import { t, Elysia } from "elysia";
import User from "../models/userModel";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    console.log(123);
    return await User.find();
  })
  .post(
    "/",
    async ({ body }) => {
      const user = new User(body);
      return await user.save();
    },
    { body: t.Object({ name: t.String(), email: t.String() }) }
  );

export default userRoutes;
