import express from "express";
import {
  deleteJobController,
  getAllJobsController,
  getMyJobsController,
  getSingleJobController,
  postJobController,
  updateJobController,
} from "../controller/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobsController);
router.post("/post", isAuthenticated, postJobController);
router.get("/getmyjobs", isAuthenticated, getMyJobsController);
router.put("/update/:id", isAuthenticated, updateJobController);
router.delete("/delete/:id", isAuthenticated, deleteJobController);
router.get("/:id", isAuthenticated, getSingleJobController);

export default router;
