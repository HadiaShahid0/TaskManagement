import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/userdashboard/pages/dashboard.jsx";
import Tasks from "../features/tasks/pages/task.jsx";
import Todo from "../features/todo/pages/todo.jsx";
import Login from "../features/auth/pages/login.jsx";
import Register from "../features/auth/pages/register.jsx";
import Profile from "../features/profile/pages/profile.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import AdminDashboard from "../features/adminDashboard/pages/adminDashboard.jsx";
import Request from "../features/userdashboard/accessRequest/pages/request.jsx";
import AdminRequest from "../features/adminDashboard/pages/request.jsx";
import ChangePassword from "../features/adminDashboard/pages/userCreate.jsx";
import UserCreate from "../features/adminDashboard/pages/userCreate.jsx";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
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
        path="/admin/request"
        element={
          <ProtectedRoute>
            <AdminRequest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user-create"
        element={
          <ProtectedRoute>
            <UserCreate />
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
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
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
        path="/request"
        element={
          <ProtectedRoute>
            <Request />
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
