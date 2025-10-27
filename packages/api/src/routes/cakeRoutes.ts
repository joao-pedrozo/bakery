import { t, Elysia } from "elysia";
import { createCake, listCakes } from "../services/cakeService";
import { addCakeToQueue } from "../queue/cakeQueue";

export const cakeRoutes = new Elysia({ prefix: "/cakes" })
  .get("/", async () => await listCakes())
  .post(
    "/",
    async ({ body }) => {
      const cake = await createCake(body);
      await addCakeToQueue(cake.id, cake.cookingTime);
      return cake;
    },
    {
      body: t.Object({
        name: t.String(),
        categoryId: t.String(),
        size: t.Optional(
          t.Union([t.Literal("small"), t.Literal("medium"), t.Literal("large")])
        ),
        cookingTime: t.Optional(t.Number()),
      }),
    }
  );

export default cakeRoutes;
