import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createUserService = async ({
  name,
  email,
  password,
  role,
  permissions,
}) => {
  const exists = await User.findOne({ email });

  if (exists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
    permissions,
    mustChangePassword: true,
  });

  return user;
};

export const getAllUsersService = async () => {
  return await User.find();
};

export const updatePermissionsService = async (id, permissions) => {
  return await User.findByIdAndUpdate(
    id,
    { permissions },
    { new: true }
  );
};