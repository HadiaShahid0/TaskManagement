import AccessRequest from "../models/accessRequestModel.js";
import {
  findUser,
  findPendingRequest,
} from "../utils/accessRequestHelper.js";

// User creates request
export const createAccessRequestService = async (userId, module) => {
  const user = await findUser(userId);

  if (user.permissions.includes(module)) {
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

// Logged-in user's requests
export const getMyRequestsService = async (userId, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  const totalRequests = await AccessRequest.countDocuments({
    user: userId,
  });

  const requests = await AccessRequest.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    requests,
    currentPage: page,
    totalPages: Math.ceil(totalRequests / limit),
    totalRequests,
  };
};

// Admin gets all requests
export const getAllRequestsService = async (page = 1, limit = 5) => {
  const requests = await AccessRequest.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  const validRequests = requests.filter((request) => request.user);

  const totalRequests = validRequests.length;
  const skip = (page - 1) * limit;

  return {
    requests: validRequests.slice(skip, skip + limit),
    currentPage: page,
    totalPages: Math.ceil(totalRequests / limit),
    totalRequests,
  };
};

// Admin accepts request
export const acceptRequestService = async (requestId) => {
  const request = await findPendingRequest(requestId);

  const user = await findUser(request.user);

  if (!user.permissions.includes(request.module)) {
    user.permissions.push(request.module);
  }

  await user.save();

  request.status = "Accepted";
  await request.save();

  return request;
};

// Admin rejects request
export const rejectRequestService = async (requestId) => {
  const request = await findPendingRequest(requestId);

  request.status = "Rejected";
  await request.save();

  return request;
};