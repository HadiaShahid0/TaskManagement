import User from "../models/userModel.js";

export const getAllUsersService = async () => {
  return await User.find();
};

export const updatePermissionsService = async (id, permissions) => {
  return await User.findByIdAndUpdate(
    id,
    {
      permissions,
    },
    { new: true },
  );
};
