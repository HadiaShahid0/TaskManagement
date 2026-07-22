import { useEffect, useState } from "react";
import taskApi from "../services/taskApi";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskApi.getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTaskById = async (taskId, updatedData) => {
    try {
      const updatedTask = await taskApi.updateTask(taskId, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask.data : task)),
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTaskById = async (taskId) => {
    try {
      await taskApi.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return { tasks, addTask, updateTaskById, deleteTaskById };
};

export default useTasks;
