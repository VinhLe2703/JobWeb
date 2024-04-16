import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  comment: {
    type: String,
    required: [true, "Please provide a comment."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Review = mongoose.model("Review", reviewSchema);
