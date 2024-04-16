import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { ApplicationService } from "../services/applicationService.js";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { user, files, body } = req;
  try {
    const application = await ApplicationService.submitApplication(user, files.resume, body);
    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});

export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  try {
    const applications = await ApplicationService.getEmployerApplications(user._id);
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});

export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  try {
    const applications = await ApplicationService.getJobSeekerApplications(user._id);
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});

export const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { params } = req;
  try {
    await ApplicationService.deleteJobSeekerApplication(params.id);
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});
