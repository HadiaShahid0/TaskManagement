import { useState } from "react";
import TaskForm from "../components/taskForm.jsx";
import TaskList from "../components/taskList.jsx";
import useTasks from "../hooks/useTasks.js";
import Navbar from "../../../components/common/navbar.jsx";
import Footer from "../../../components/common/footer.jsx";
const Tasks = () => {
  const { tasks, addTask, deleteTaskById, updateTaskById } = useTasks();

  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleEdit = (task) => {
    const edittask = {
      ...task,
      status: task.status.toString(),
    };

    setEditingTask(edittask);
  };

  const handleUpdate = (task) => {
    updateTaskById(task._id, task);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "All") {
      return true;
    }

    if (statusFilter === "Completed") {
      return task.status === true;
    }

    if (statusFilter === "Pending") {
      return task.status === false;
    }

    return true;
  });

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

        {/* Filter Dropdown */}
        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Filtered Task List */}
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={deleteTaskById}
        />
      </div>

      <Footer />
    </>
  );
};

export default Tasks;
