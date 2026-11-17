import { useState } from "react";
import PermissionCheckbox from "./permissionCheckbox";

const UserRow = ({ user, onSave }) => {
  const permissions = user.permissions || [];

  const [task, setTask] = useState(permissions.includes("task") || false);
  const [todo, setTodo] = useState(permissions.includes("todo")  || false);

  const isAdmin = user.role === "admin";

  const handleTaskChange = () => {
  if (isAdmin) return;

  const newTask = !task;
  setTask(newTask);

  const permissions = [];
  if (newTask) permissions.push("task");
  if (todo) permissions.push("todo");

  onSave(user._id, permissions);
};

 const handleTodoChange = () => {
  if (isAdmin) return;

  const newTodo = !todo;
  setTodo(newTodo);

  const permissions = [];
  if (task) permissions.push("task");
  if (newTodo) permissions.push("todo");

  onSave(user._id, permissions);
};

  return (
    <tr className={user.role === "admin" ? "table-secondary" : ""}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <PermissionCheckbox
          checked={task}
          onChange={handleTaskChange}
          disabled={isAdmin}
        />
      </td>

      <td>
        <PermissionCheckbox
          checked={todo}
          onChange={handleTodoChange}
          disabled={isAdmin}
        />
      </td>
      <td>
        {user.mustChangePassword ? (
          <span className="badge bg-warning text-dark">Pending</span>
        ) : (
          <span className="badge bg-success">Completed</span>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
