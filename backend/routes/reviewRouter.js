import express from "express";
import {
  getAllReviews,
  postReview,
  updateReview,
  deleteReview
} from "../controller/reviewController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:jobId", isAuthenticated, getAllReviews);
router.post("/:jobId", isAuthenticated, postReview);
router.put("/:reviewId", isAuthenticated, updateReview);
router.delete("/:reviewId", isAuthenticated, deleteReview);

export default router;
