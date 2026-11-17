import {
  getAllUsersService,
  updatePermissionsService,
  createUserService,
} from "../../services/adminServices.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, permissions } = req.body;
    const user = await createUserService({
      name,
      email,
      password,
      role,
      permissions,
    });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePermissions = async (req, res) => {
  try {
    const permissions = req.body;

    const user = await updatePermissionsService(req.params.id, permissions);

    // Get io instance
    const io = req.app.get("io");

    // Notify the updated user
    io.to(user._id.toString()).emit("permissionUpdated", {
      permissions: user.permissions,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
