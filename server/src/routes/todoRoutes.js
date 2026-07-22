import express from "express";
import ToDoController from "../controllers/todoController/todoController.js";
import validateTask from "../middleware/todoValidation/validateToDoTask.js";
const todoRoutes = express.Router();


todoRoutes.post(
    "/add",
    validateTask.validateTodoCreateTask,
    ToDoController.addTodoTask
);

todoRoutes.get(
    "/",
    ToDoController.readTodoTasks
);

todoRoutes.delete(
    "/:id",
    ToDoController.deleteTodoTask
);

todoRoutes.put(
    "/:id",
    validateTask.validateTodoUpdateTask,
    ToDoController.updateTodoTask
);

export default todoRoutes;
