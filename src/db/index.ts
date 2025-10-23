import mongoose from "mongoose";

export async function connectDB() {
  console.log(process.env.MONGO_URI);

  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/elysia_demo"
    );
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:");
    process.exit(1);
  }
}

export default connectDB;
