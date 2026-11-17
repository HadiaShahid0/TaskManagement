import { useState } from "react";
import TaskForm from "../components/taskForm.jsx";
import TaskList from "../components/taskList.jsx";
import useTasks from "../hooks/useTasks.js";
import Navbar from "../../../components/common/navbar.jsx";
import Footer from "../../../components/common/footer.jsx";

const Tasks = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const {
    tasks,
    addTask,
    deleteTaskById,
    updateTaskById,
    page,
    setPage,
    totalPages,
  } = useTasks(statusFilter);

  const handleEdit = (task) => {
    setEditingTask({
      ...task,
      status: task.status.toString(),
    });
  };

  const handleUpdate = (task) => {
    updateTaskById(task._id, task);
    setEditingTask(null);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="text-center my-4">Task Management Service</h1>

        <TaskForm
          onAdd={addTask}
          editingTask={editingTask}
          onUpdate={handleUpdate}
        />

        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select w-auto"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={deleteTaskById} />

        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-primary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Tasks;
