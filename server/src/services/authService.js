import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Register User
const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already Exists");
  }

  // Generate Salt
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    mustChangePassword: false, // Users who register themselves
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

// Login User
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  // Compare Password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Email or Password");
  }

  // Generate JWT Token
  const token = generateToken(user._id);

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      mustChangePassword: user.mustChangePassword,
    },
  };
};

// Change Password
const changePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  // Generate Salt
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));

  // Hash New Password
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update Password
  user.password = hashedPassword;

  // User has changed password, so no need to force again
  user.mustChangePassword = false;

  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

export { registerUser, loginUser, changePasswordService };
