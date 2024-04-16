import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { getAllJobsService, postJobService, getMyJobsService, updateJobService, deleteJobService, getSingleJobService } from "../services/jobService.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobsController = catchAsyncErrors(async (req, res, next) => {
  const jobs = await getAllJobsService();
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJobController = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }
  const job = await postJobService(req.body);
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

export const getMyJobsController = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }
  const myJobs = await getMyJobsService(req.user._id);
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJobController = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }
  const job = await updateJobService(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Job Updated!",
    job,
  });
});

export const deleteJobController = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }
  await deleteJobService(req.params.id);
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getSingleJobController = catchAsyncErrors(async (req, res, next) => {
  const job = await getSingleJobService(req.params.id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }
  res.status(200).json({
    success: true,
    job,
  });
});
