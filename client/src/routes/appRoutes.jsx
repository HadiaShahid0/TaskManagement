import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard.jsx";
import Tasks from "../pages/task.jsx";
import Todo from "../pages/todo.jsx"
import Login from "../pages/login.jsx";
import Register from "../pages/register.jsx";
import Profile from "../pages/profile.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import AdminDashboard from "../pages/adminDashboard.jsx";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<h2 className="text-center mt-5">404 - Page Not Found</h2>}
      />
    </Routes>
  );
};

export default AppRoutes;
