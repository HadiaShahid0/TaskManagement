import { useState } from "react";
import TaskForm from "../features/tasks/components/taskForm";
import TaskList from "../features/tasks/components/taskList";
import useTasks from "../features/tasks/hooks/useTasks";
import Navbar from "../components/common/navbar.jsx";
import Footer from "../components/common/footer.jsx";
const Tasks = () => {
  const { tasks, addTask, removeTask, updateTask } = useTasks();

  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    const edittask = {
      ...task,
      status: task.status.toString(),
    };

    setEditingTask(edittask);
  };

  const handleUpdate = (task) => {
    updateTask(task);
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
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={removeTask} />
      </div>
      <Footer />
    </>
  );
};

export default Tasks;
