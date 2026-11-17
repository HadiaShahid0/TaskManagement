import socket from "../../services/socket";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout, verify } from "../../features/auth/services/authServices";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const permissions = user?.permissions ?? [];

  const hasTaskPermission = permissions.includes("task");
  const hasTodoPermission = permissions.includes("todo");
  const hasAllPermissions = hasTaskPermission && hasTodoPermission;

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await verify();

        if (response.success) {
          setUser(response.user);
          socket.emit("join", response.user._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
0
    loadUser();
  }, []);

  useEffect(() => {
    const handlePermissionUpdate = async () => {
      try {
        const response = await verify();

        if (response.success) {
          setUser(response.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    socket.on("permissionUpdated", handlePermissionUpdate);

    return () => {
      socket.off("permissionUpdated", handlePermissionUpdate);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Task Management
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <div className="navbar-nav me-auto">
            {(hasTaskPermission || hasTodoPermission) && (
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            )}

            {user && !hasAllPermissions && (
              <Link className="nav-link" to="/request">
                Request
              </Link>
            )}

            {hasTaskPermission && (
              <Link className="nav-link" to="/tasks">
                Tasks
              </Link>
            )}

            {hasTodoPermission && (
              <Link className="nav-link" to="/todo">
                Todo
              </Link>
            )}

            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </div>

          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
