import User from "../models/userModel.js";

const uploadProfileImageService = async (userId, filename) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      profileImage: filename,
    },
    {
      new: true,
    },
  );
};

export default {
  uploadProfileImageService,
};
