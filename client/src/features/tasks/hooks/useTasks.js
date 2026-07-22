import { useState } from "react";
const useTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React",
      description: "Practice hooks",
      status: false,
    },
  ]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (task) => {
    setTasks((prev) => prev.map((item) => (item.id === task.id ? task : item)));
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    updateTask,
    removeTask,
  };
};
export default useTasks;
