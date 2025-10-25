import { Elysia } from "elysia";
import connectDB from "./db";
import userRoutes from "./routes/userRoutes";
import cakeRoutes from "./routes/cakeRoutes";
import { startCakeWorker } from "./queue/cakeQueue";

await connectDB();
startCakeWorker();

const app = new Elysia().use(userRoutes).use(cakeRoutes).listen(3000);

console.log("✨ Server running at http://localhost:3000");

export type App = typeof app;
