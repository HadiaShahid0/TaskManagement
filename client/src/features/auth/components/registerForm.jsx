import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authServices";
import { FiEye, FiEyeOff } from "react-icons/fi";
const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setPasswordErrors([]);

    try {
      const data = await register(formData);

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);

      setMessage(error.message || "Registration failed");

      if (error.errors) {
        setPasswordErrors(error.errors);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>

              {message && <div className="alert alert-danger">{message}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <label className="form-label">Password</label>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {passwordErrors.length > 0 && (
                  <div className="alert alert-danger mt-2">
                    <ul className="mb-0">
                      {passwordErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className="btn btn-success w-100">Register</button>
                <p>
                  Already have an account? <Link to="/login">Login Here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
