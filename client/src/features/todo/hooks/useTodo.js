import { useCallback, useEffect, useState } from "react";
import TodoApi from "../services/todoApi";

const useTodo = (statusFilter) => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTodo = useCallback(
    async (currentPage = 1) => {
      try {
        const response = await TodoApi.getTodo(
          currentPage,
          1,
          statusFilter
        );

        setTodos(response.data.todos);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching Todo:", error);
      }
    },
    [statusFilter]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTodo(page);
  }, [page, statusFilter, fetchTodo]);

  const addTodo = async (todoData) => {
    try {
      await TodoApi.createTodo(todoData);
      fetchTodo(page);
    } catch (error) {
      console.error("Error adding Todo:", error);
    }
  };

  const updateTodoById = async (todoId, updatedData) => {
    try {
      await TodoApi.updateTodo(todoId, updatedData);
      fetchTodo(page);
    } catch (error) {
      console.error("Error updating Todo:", error);
    }
  };

  const deleteTodoById = async (todoId) => {
    try {
      await TodoApi.deleteTodo(todoId);

      if (todos.length === 1 && page > 1) {
        setPage((prevPage) => prevPage - 1);
      } else {
        fetchTodo(page);
      }
    } catch (error) {
      console.error("Error deleting Todo:", error);
    }
  };

  return {
    todos,
    page,
    setPage,
    totalPages,
    addTodo,
    updateTodoById,
    deleteTodoById,
  };
};

export default useTodo;