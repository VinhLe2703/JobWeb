import { User } from "../models/userSchema.js";

export const registerUserService = async ({ name, email, phone, role, password }) => {
  const user = await User.create({ name, email, phone, role, password });
  return user;
};

export const findUserByEmailService = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const loginUserByEmailService = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  return user;
};
