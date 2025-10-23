import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  comments: [
    {
      text: String,
      author: String,
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Post", postSchema);
