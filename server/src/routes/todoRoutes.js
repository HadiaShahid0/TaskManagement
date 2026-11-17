import express from "express";
import ToDoController from "../controllers/todoController/todoController.js";
import validateTask from "../middleware/todoValidation/validateToDoTask.js";
import protect from "../middleware/authMiddleware/authMiddleware.js"

const todoRoutes = express.Router();


todoRoutes.post(
    "/add",
    protect,
    validateTask.validateTodoCreateTask,
    ToDoController.addTodoTask
);

todoRoutes.get(
    "/",
    protect,
    ToDoController.readTodoTasks
);

todoRoutes.delete(
    "/:id",
    protect,
    ToDoController.deleteTodoTask
);

todoRoutes.put(
    "/:id",
    protect,
    validateTask.validateTodoUpdateTask,
    ToDoController.updateTodoTask
);

export default todoRoutes;
