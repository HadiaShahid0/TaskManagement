import Task from "../models/taskModel.js";

const addTaskService = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const getAllTasksService = async (userId) => {
  return await Task.find({ user: userId });
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
