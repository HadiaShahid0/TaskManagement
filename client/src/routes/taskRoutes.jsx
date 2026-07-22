import { Routes, Route } from "react-router-dom";
import Task from "../pages/task.jsx";
import Dashboard from "../pages/dashboard.jsx";
const TaskRoutes = () => {
  return (
    <Routes>
      <Route path="/tasks" element={<Task />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default TaskRoutes;
