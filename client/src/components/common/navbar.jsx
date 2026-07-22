import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="navbar-brand ps-5" >
        <span className="navbar-brand-text">Task Management</span>
      </div>
      <div className="navbar-nav ">
        <Link to="/" className="nav-link text-white">
          Dashboard
        </Link>
        <Link to="/tasks" className="nav-link text-white">
          Tasks
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
