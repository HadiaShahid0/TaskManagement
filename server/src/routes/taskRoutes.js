import express from 'express';
import taskController from '../controllers/taskControllers/taskController.js';
import validateTask from '../middleware/taskValidation/validateTask.js';
import protect from "../middleware/authMiddleware/authMiddleware.js"
const taskRoutes = express.Router();

taskRoutes.post('/add',protect, validateTask.validateCreateTask, taskController.addTask);
taskRoutes.get('/', protect,taskController.readTasks);
taskRoutes.delete('/delete/:id',protect, taskController.deleteTask);
taskRoutes.put('/update/:id',protect, validateTask.validateUpdateTask, taskController.updateTask);

export default taskRoutes;