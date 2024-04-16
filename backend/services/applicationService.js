import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const ApplicationService = {
  submitApplication: async (userData, resumeFile, applicationData) => {
    const { name, email, coverLetter, phone, address, jobId } = applicationData;

    // Kiểm tra xem có tệp hồ sơ được tải lên không
    if (!resumeFile) {
      throw new Error("Resume File Required!");
    }

    // Kiểm tra định dạng của tệp hồ sơ
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resumeFile.mimetype)) {
      throw new Error("Invalid file type. Please upload a PNG file.");
    }

    // Tải hồ sơ lên Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(resumeFile.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      throw new Error("Failed to upload Resume to Cloudinary");
    }

    // Kiểm tra xem có thông tin công việc hợp lệ không
    if (!jobId) {
      throw new Error("Job not found!");
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      throw new Error("Job not found!");
    }

    // Tạo đối tượng ứng viên
    const applicantID = {
      user: userData._id,
      role: "Job Seeker",
    };
    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };

    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    return application;
  },

  getEmployerApplications: async (userId) => {
    const applications = await Application.find({ "employerID.user": userId });
    return applications;
  },

  getJobSeekerApplications: async (userId) => {
    const applications = await Application.find({ "applicantID.user": userId });
    return applications;
  },

  deleteJobSeekerApplication: async (applicationId) => {
    await Application.findByIdAndDelete(applicationId);
  },
};
