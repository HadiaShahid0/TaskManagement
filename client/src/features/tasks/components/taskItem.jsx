import { FiEdit, FiTrash2 } from "react-icons/fi";
const TaskItem = ({ task, onEdit, onDelete, showActions = true }) => {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.status ? "Completed" : "Pending"}</td>

      {showActions && (
        <td>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(task)}
          >
            <FiEdit/>
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(task.id)}
          >
            <FiTrash2/>
          </button>
        </td>
      )}
    </tr>
  );
};

export default TaskItem;
