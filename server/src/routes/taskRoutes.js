import express from 'express';
import taskController from '../controllers/taskControllers/taskController.js';
import validateTask from '../middleware/taskValidation/validateTask.js';
const taskRoutes = express.Router();

taskRoutes.post('/add', validateTask.validateCreateTask, taskController.addTask);
taskRoutes.get('/', taskController.readTasks);
taskRoutes.delete('/delete/:id', taskController.deleteTask);
taskRoutes.put('/update/:id', validateTask.validateUpdateTask, taskController.updateTask);

export default taskRoutes;