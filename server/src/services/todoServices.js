import TodoTask from "../models/todoModel.js";

const addToDoTaskService = async (todoData) => {
  const task = new TodoTask(todoData);
  return await task.save();
};

const getAllToDoTasksService = async (
  userId,
  page = 1,
  limit = 1,
  status = "All"
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

  const totalTodos = await TodoTask.countDocuments(query);

  const todos = await TodoTask.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    todos,
    currentPage: page,
    totalPages: Math.ceil(totalTodos / limit),
    totalTodos,
  };
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