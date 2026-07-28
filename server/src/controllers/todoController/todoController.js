import Response from "../../utils/response.js";
import ToDoServices from "../../services/todoServices.js";
const addTodoTask = async (req, res) => {
    try {

        const { title, description, status } = req.body;
        const newTask = await ToDoServices.addToDoTaskService({
            title,
            description,
            status,
            user: req.user._id
        });

        Response.successResponse(
            res,
            "Todo Task added successfully",
            newTask
        );

    } catch (error) {
        Response.errorResponse(res, error.message);
    }
};

const deleteTodoTask = async (req, res) => {
    try{
        const deletedTask=await ToDoServices.deleteToDoTaskService(req.params.id);
        if(!deletedTask){
            return res.status(404).json({ message: "Task not found" });

        }
        Response.successResponse(res, "Todo Task deleted successfully", deletedTask);
    }catch(error){
        Response.errorResponse(res, error.message);
    }
};

const readTodoTasks = async (req, res) => {
    try{
        const tasks = await ToDoServices.getAllToDoTasksService(req.user._id);
        Response.successResponse(res, "Todo Tasks retrieved successfully", tasks);
    } catch (error) {
        Response.errorResponse(res, error.message);
    }
};
const updateTodoTask = async (req, res) => {
    try {
        const { title, description , status } = req.body;
        const updatedTask = await ToDoServices.updateToDoTaskService(
            req.params.id, 
            { 
                title, 
                description, 
                status 
            });
        if (!updatedTask) {
            return res.status(404).json({ message: "Todo Task not found" });
        }
        Response.successResponse(res, "Todo Task updated successfully", updatedTask);
    } catch (error) {
        Response.errorResponse(res, error.message);
    }
}
export default { addTodoTask, deleteTodoTask, readTodoTasks, updateTodoTask };
