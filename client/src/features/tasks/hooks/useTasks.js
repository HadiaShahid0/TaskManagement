import { useCallback, useEffect, useState } from "react";
import taskApi from "../services/taskApi";

const useTasks = (statusFilter) => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = useCallback(
    async (currentPage = 1) => {
      try {
        const response = await taskApi.getTasks(
          currentPage,
          1,
          statusFilter
        );

        setTasks(response.data.tasks);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    [statusFilter]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks(page);
  }, [page, statusFilter, fetchTasks]);

  const addTask = async (taskData) => {
    try {
      await taskApi.createTask(taskData);
      fetchTasks(page);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTaskById = async (taskId, updatedData) => {
    try {
      await taskApi.updateTask(taskId, updatedData);
      fetchTasks(page);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTaskById = async (taskId) => {
    try {
      await taskApi.deleteTask(taskId);

      if (tasks.length === 1 && page > 1) {
        setPage((prevPage) => prevPage - 1);
      } else {
        fetchTasks(page);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return {
    tasks,
    page,
    setPage,
    totalPages,
    addTask,
    updateTaskById,
    deleteTaskById,
  };
};

export default useTasks;