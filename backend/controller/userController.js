import { registerUserService, findUserByEmailService, loginUserByEmailService } from "../services/userService.js";
import { sendToken } from "../utils/jwtToken.js";
import ErrorHandler from "../middlewares/error.js";

export const registerUserController = async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  try {
    if (!name || !email || !phone || !role || !password) {
      throw new ErrorHandler("Please fill the complete form!", 400);
    }
    const isEmail = await findUserByEmailService(email);
    if (isEmail) {
      throw new ErrorHandler("Email already registered!", 400);
    }
    const user = await registerUserService({ name, email, phone, role, password });
    sendToken(user, 201, res, "User Registered!");
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      throw new ErrorHandler("Please provide email, password, and role.", 400);
    }
    const user = await loginUserByEmailService(email);
    if (!user) {
      throw new ErrorHandler("Invalid Email Or Password.", 400);
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      throw new ErrorHandler("Invalid Email Or Password.", 400);
    }
    if (user.role !== role) {
      throw new ErrorHandler(`User with provided email and ${role} role not found!`, 404);
    }
    sendToken(user, 200, res, "User Logged In!");
  } catch (error) {
    next(error);
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged Out Successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
