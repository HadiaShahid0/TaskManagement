import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { verify } from "../features/auth/services/authServices";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await verify();

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Refresh user every 5 seconds
    const interval = setInterval(checkAuth, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin" && user.createdByAdmin && user.mustChangePassword) {
    if (location.pathname !== "/change-password") {
      return <Navigate to="/change-password" replace />;
    }

    return children;
  }

  // Prevent going back to change-password
  if (location.pathname === "/change-password") {
    return <Navigate to="/" replace />;
  }

  // Admin
  if (user.role === "admin") {
    if (!location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/users" replace />;
    }

    return children;
  }

  // Normal user permission check
  const hasPermission =
    user.permissions?.includes("task") || user.permissions?.includes("todo");

  if (!hasPermission && location.pathname !== "/request") {
    return <Navigate to="/request" replace />;
  }

  return children;
};

export default ProtectedRoute;
