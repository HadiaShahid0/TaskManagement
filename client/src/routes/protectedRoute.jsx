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
  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Force password change
  if (user.mustChangePassword) {
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
    user.permissions?.task || user.permissions?.todo;

  if (!hasPermission && location.pathname !== "/request") {
    return <Navigate to="/request" replace />;
  }

  if (hasPermission && location.pathname === "/request") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;