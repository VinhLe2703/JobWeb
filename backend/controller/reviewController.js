import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Review } from "../models/reviewSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await Review.find({ job: req.params.jobId });
  res.status(200).json({
    success: true,
    reviews,
  });
});

export const postReview = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  const { jobId } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return next(new ErrorHandler("Please provide a comment.", 400));
  }

  const review = await Review.create({
    user: user._id,
    job: jobId,
    comment,
  });

  res.status(200).json({
    success: true,
    message: "Review Posted Successfully!",
    review,
  });
});

export const updateReview = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  const { reviewId } = req.params;
  const { comment } = req.body;

  const review = await Review.findOne({ _id: reviewId, user: user._id });

  if (!review) {
    return next(new ErrorHandler("Review not found or you're not the owner.", 404));
  }

  review.comment = comment || review.comment;
  await review.save();

  res.status(200).json({
    success: true,
    message: "Review Updated Successfully!",
    review,
  });
});

export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  const { reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId, user: user._id });

  if (!review) {
    return next(new ErrorHandler("Review not found or you're not the owner.", 404));
  }

  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully!",
  });
});
