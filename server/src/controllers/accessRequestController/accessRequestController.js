import 
  {createAccessRequestService,
  getMyRequestsService,
  getAllRequestsService,
  acceptRequestService,
  rejectRequestService}
from "../../services/accessRequestServices.js";

// User sends request
export const createAccessRequest = async (req, res) => {
  try {
    const request = await createAccessRequestService(
      req.user._id,
      req.body.module,
    );

    res.status(201).json({
      success: true,
      message: "Access request sent successfully.",
      data: request,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Logged-in user's requests
export const getMyRequests = async (req, res) => {
  try {
    const requests = await getMyRequestsService(req.user._id);

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin gets all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await getAllRequestsService();

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin accepts request
export const acceptRequest = async (req, res) => {
  try {
    const request = await acceptRequestService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Request accepted successfully.",
      data: request,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin rejects request
export const rejectRequest = async (req, res) => {
  try {
    const request = await rejectRequestService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Request rejected successfully.",
      data: request,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
