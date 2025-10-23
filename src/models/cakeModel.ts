import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
  flavor: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "medium",
  },
  cookingTime: {
    type: Number,
    default: 3000, // milliseconds
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "cooking", "done", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Cake", cakeSchema);
