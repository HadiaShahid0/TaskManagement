import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout, verify } from "../../features/auth/services/authServices";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await verify();

        if (response.success) {
          setUser(response.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  const hasAllPermissions = user?.permissions?.task && user?.permissions?.todo;
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
            {(user?.permissions?.todo || user?.permissions?.task) && (
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            )}
            {user && !hasAllPermissions && (
              <Link className="nav-link" to="/Request">
                Request
              </Link>
            )}
            {user?.permissions?.task && (
              <Link className="nav-link" to="/tasks">
                Tasks
              </Link>
            )}

            {user?.permissions?.todo && (
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
