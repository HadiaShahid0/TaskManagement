import AccessRequest from "../models/accessRequestModel.js";
import User from "../models/userModel.js";
import { findUser, findPendingRequest } from "../utils/accessRequestHelper.js";

export const createAccessRequestService = async (userId, module) => {
  const user = await findUser(userId);

  if (user.permissions[module]) {
    throw new Error(`You already have access to the ${module} module.`);
  }

  const existingRequest = await AccessRequest.findOne({
    user: userId,
    module,
    status: "Pending",
  });

  if (existingRequest) {
    throw new Error("You already have a pending request.");
  }

  return await AccessRequest.create({
    user: userId,
    module,
  });
};

export const getMyRequestsService = async (userId) => {
  return await AccessRequest.find({ user: userId }).sort({
    createdAt: -1, // Newest added request
  });
};

export const getAllRequestsService = async () => {
  return await AccessRequest.find()
    .populate("user", "name email")  //Mongodb method
    .sort({ createdAt: -1 });  // Newest added request
}; 

export const acceptRequestService = async (requestId) => {
  const request = await findPendingRequest(requestId);

  const user = await findUser(request.user);

  user.permissions[request.module] = true;

  await user.save();

  request.status = "Accepted";

  await request.save();

  return request;
};

export const rejectRequestService = async (requestId) => {
  const request = await findPendingRequest(requestId);

  request.status = "Rejected";

  await request.save();

  return request;
};
