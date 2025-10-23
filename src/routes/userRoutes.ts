import { t, Elysia } from "elysia";
import User from "../models/userModel";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    return await User.find();
  })
  .post(
    "/",
    async ({ body, status }) => {
      const existentUser = await User.findOne({
        email: body.email,
      });

      if (existentUser) {
        return status(409, {
          error: "User already exists",
          details: "A user with this email address is already registered.",
        });
      }

      const user = new User(body);
      return await user.save();
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  );
export default userRoutes;
