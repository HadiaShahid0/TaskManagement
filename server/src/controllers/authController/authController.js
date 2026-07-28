import { registerUser, loginUser } from "../../services/authService.js";

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

    // Store JWT in Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000, //1 hour in milli second
    });

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

export { register, login, logout, verify};

