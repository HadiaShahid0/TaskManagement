import TodoTask from "../models/todoModel.js";

const addToDoTaskService = async (taskData) => {
    const task = new TodoTask(taskData);
    return await task.save();
};

const getAllToDoTasksService = async () => {
    return await TodoTask.find();
};

const updateToDoTaskService = async (id, taskData) => {
    return await TodoTask.findByIdAndUpdate(
        id,
        taskData,
        {
            new: true
        }
    );
};

const deleteToDoTaskService = async (id) => {
    return await TodoTask.findByIdAndDelete(id);
};


export default{
    addToDoTaskService,
    getAllToDoTasksService,
    updateToDoTaskService,
    deleteToDoTaskService
};
