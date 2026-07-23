import taskRoutes from './taskRoutes.js';
import todoRoutes from './todoRoutes.js';

const routes = (app) => {
  app.use('/api/tasks', taskRoutes);
  app.use('/api/todos', todoRoutes);
};

export default routes;