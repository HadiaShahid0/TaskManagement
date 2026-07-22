import express from "express";
import ToDoController from "../controllers/todoController/todoController.js";
import validateTask from "../middleware/todoValidation/validateToDoTask.js";
console.log("Todo routes loaded");
const todoRoutes = express.Router();
todoRoutes.get("/test", (req, res) => {
    res.send("Todo route working");
});

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
