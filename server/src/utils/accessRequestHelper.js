import User from "../models/userModel.js";
import AccessRequest from "../models/accessRequestModel.js";

// Find user by ID
export const findUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

// Find request by ID
export const findRequest = async (requestId) => {
  const request = await AccessRequest.findById(requestId);

  if (!request) {
    throw new Error("Request not found.");
  }

  return request;
};

// Find a pending request by ID
export const findPendingRequest = async (requestId) => {
  const request = await findRequest(requestId);

  if (request.status !== "Pending") {
    throw new Error("Request has already been processed.");
  }

  return request;
};
