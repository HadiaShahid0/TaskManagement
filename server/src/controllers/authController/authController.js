import {
  registerUser,
  loginUser,
  changePasswordService,
} from "../../services/authService.js";

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);

    // Always create the authentication cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
    });

    // Tell frontend to redirect to Change Password page
    if (user.mustChangePassword) {
      return res.status(200).json({
        success: true,
        mustChangePassword: true,
        message: "Please change your password before continuing.",
        user,
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePasswordService(
      req.user._id,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};

const verify = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export {
  register,
  login,
  changePassword,
  logout,
  verify,
};