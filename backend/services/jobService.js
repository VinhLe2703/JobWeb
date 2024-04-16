import { Job } from "../models/jobSchema.js";

export const getAllJobsService = async () => {
  return await Job.find({ expired: false });
};

export const postJobService = async (jobData) => {
  return await Job.create(jobData);
};

export const getMyJobsService = async (userId) => {
  return await Job.find({ postedBy: userId });
};

export const updateJobService = async (jobId, newData) => {
  return await Job.findByIdAndUpdate(jobId, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};

export const deleteJobService = async (jobId) => {
  return await Job.findByIdAndDelete(jobId);
};

export const getSingleJobService = async (jobId) => {
  return await Job.findById(jobId);
};
