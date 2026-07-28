import {
  getAllUsersService,
  updatePermissionsService,
} from "../../services/adminServices.js";

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
    const { task, todo } = req.body;

    const user = await updatePermissionsService(req.params.id, {
      task,
      todo,
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
