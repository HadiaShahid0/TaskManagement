import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const createAdmin = async () => {
  const admin = await User.findOne({
    email: process.env.email,
  });

  if (admin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(process.env.password, 10);

  await User.create({
    name: "Admin",
    email: process.env.email,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Default admin created");
};

export default createAdmin;