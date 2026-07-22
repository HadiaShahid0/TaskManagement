import Task from "../../models/taskModel.js";
import Response from "../../utils/response.js";
import taskServices from "../../services/taskServices.js";
const addTask = async (req, res) => {
    try {

        const { title, description, status } = req.body;
        const newTask = await taskServices.addTaskService({
            title,
            description,
            status
        });

        Response.successResponse(
            res,
            "Task added successfully",
            newTask
        );

    } catch (error) {
        Response.errorResponse(res, error.message);
    }
};

const deleteTask = async (req, res) => {
    try{
        const deletedTask=await taskServices.deleteTaskService(req.params.id);
        if(!deletedTask){
            return res.status(404).json({ message: "Task not found" });

        }
        Response.successResponse(res, "Task deleted successfully", deletedTask);
    }catch(error){
        Response.errorResponse(res, error.message);
    }
};

const readTasks = async (req, res) => {
    try{
        const tasks = await taskServices.getAllTasksService();
        Response.successResponse(res, "Tasks retrieved successfully", tasks);
    } catch (error) {
        Response.errorResponse(res, error.message);
    }
};
const updateTask = async (req, res) => {
    try {
        const { title, description , status } = req.body;
        const updatedTask = await taskServices.updateTaskService(
            req.params.id, 
            { 
                title, 
                description, 
                status 
            });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        Response.successResponse(res, "Task updated successfully", updatedTask);
    } catch (error) {
        Response.errorResponse(res, error.message);
    }
}
export default { addTask, deleteTask, readTasks, updateTask };
