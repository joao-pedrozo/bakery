import { Elysia } from "elysia";
import connectDB from "./db";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

await connectDB();

const app = new Elysia()
  .use(userRoutes)
  .use(postRoutes)
  .listen(3000);

console.log("✨ Server running at http://localhost:3000");
