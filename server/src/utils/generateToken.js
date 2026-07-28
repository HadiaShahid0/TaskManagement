import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId, //payload
    },
    process.env.JWT_SECRET_KEY, //jwt secret key
    {
      expiresIn: "1h",
    },
  );
};

export default generateToken;
