import profileService from "../../services/profileServices.js";
import Response from "../../utils/response.js";

const uploadProfileImage = async (req, res) => {
  try {
    const user = await profileService.uploadProfileImageService(
      req.user._id,
      req.file.filename,
    );

    Response.successResponse(
      res,
      "Profile picture uploaded successfully",
      user,
    );
  } catch (error) {
    Response.errorResponse(res, error.message);
  }
};

export default {
  uploadProfileImage,
};
