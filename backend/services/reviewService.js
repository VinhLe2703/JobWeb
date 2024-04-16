// reviewService.js
import { Review } from "../models/reviewSchema.js";

export const getReviewsByJobId = async (jobId) => {
  return await Review.find({ job: jobId });
};

export const createReview = async (userId, jobId, comment) => {
  return await Review.create({
    user: userId,
    job: jobId,
    comment,
  });
};

export const updateReviewById = async (reviewId, userId, comment) => {
  const review = await Review.findOne({ _id: reviewId, user: userId });

  if (!review) {
    throw new Error("Review not found or you're not the owner.");
  }

  review.comment = comment || review.comment;
  await review.save();

  return review;
};

export const deleteReviewById = async (reviewId, userId) => {
  const review = await Review.findOne({ _id: reviewId, user: userId });

  if (!review) {
    throw new Error("Review not found or you're not the owner.");
  }

  await review.remove();

  return review;
};
