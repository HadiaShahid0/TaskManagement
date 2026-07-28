import TodoTask from "../models/todoModel.js";

const addToDoTaskService = async (todoData) => {
  const task = new TodoTask(todoData);
  return await task.save();
};

const getAllToDoTasksService = async (userId) => {
  return await TodoTask.find({ user: userId });
};

const updateToDoTaskService = async (id, todoData) => {
  return await TodoTask.findByIdAndUpdate(id, todoData, {
    new: true,
  });
};

const deleteToDoTaskService = async (id) => {
  return await TodoTask.findByIdAndDelete(id);
};

export default {
  addToDoTaskService,
  getAllToDoTasksService,
  updateToDoTaskService,
  deleteToDoTaskService,
};