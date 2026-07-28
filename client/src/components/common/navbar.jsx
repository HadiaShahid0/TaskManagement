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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/dashboard">
          Task Management
        </Link>

        <div className="navbar-nav me-auto">

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

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

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;