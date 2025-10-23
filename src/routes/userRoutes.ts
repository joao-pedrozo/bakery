import { t, Elysia } from "elysia";
import { createUser, getUsers } from "../services/userService";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => await getUsers())
  .post("/", async ({ body, status }) => await createUser(body, status), {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
  });
export default userRoutes;
