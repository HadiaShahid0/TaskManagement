import Task from "../models/taskModel.js";

const addTaskService = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const getAllTasksService = async (
  userId,
  page = 1,
  limit = 1,
  status = "All",
) => {
  const skip = (page - 1) * limit;

  const query = {
    user: userId,
  };

  if (status === "Completed") {
    query.status = true;
  } else if (status === "Pending") {
    query.status = false;
  }

  const totalTasks = await Task.countDocuments(query);

  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    tasks,
    currentPage: page,
    totalPages: Math.ceil(totalTasks / limit),
    totalTasks,
  };
};
const updateTaskService = async (id, taskData) => {
  return await Task.findByIdAndUpdate(id, taskData, {
    new: true,
  });
};

const deleteTaskService = async (id) => {
  return await Task.findByIdAndDelete(id);
};

export default {
  addTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
};
