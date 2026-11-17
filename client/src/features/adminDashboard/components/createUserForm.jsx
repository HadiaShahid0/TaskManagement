import { useState } from "react";
import { createUser } from "../services/adminServices";

const CreateUserForm = ({ loadUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createUser(formData);

      alert(response.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      loadUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">

      <input
        className="form-control mb-2"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="Temporary Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      <select
        className="form-select mb-3"
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="btn btn-success">
        Create User
      </button>
    </form>
  );
};

export default CreateUserForm;