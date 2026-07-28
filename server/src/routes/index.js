import taskRoutes from "./taskRoutes.js";
import todoRoutes from "./todoRoutes.js";
import authRoutes from "./authRoutes.js";
import profileRoutes from "./profileRoutes.js";
import adminRoutes from "./adminRoutes.js";
const routes = (app) => {
  app.use("/api/tasks", taskRoutes);
  app.use("/api/todos", todoRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/admin",adminRoutes)
  app.use("/api/profile", profileRoutes);
};

export default routes;
