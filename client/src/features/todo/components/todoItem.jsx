import { FiEdit, FiTrash2 } from "react-icons/fi";
const todoItem = ({ todo, onEdit, onDelete, showActions = true }) => {
  return (
    <tr>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>{todo.status ? "Completed" : "Pending"}</td>

      {showActions && (
        <td>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(todo)}
          >
            <FiEdit/>
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(todo._id)}
          >
            <FiTrash2/>
          </button>
        </td>
      )}
    </tr>
  );
};

export default todoItem;
