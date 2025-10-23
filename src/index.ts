import { Elysia } from "elysia";
import connectDB from "./db";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import cakeRoutes from "./routes/cakeRoutes";
import { startCakeWorker } from "./queue/cakeQueue";

await connectDB();
startCakeWorker();

new Elysia()
  .use(userRoutes)
  .use(postRoutes)
  .use(cakeRoutes)
  .listen(3000);

console.log("✨ Server running at http://localhost:3000");
