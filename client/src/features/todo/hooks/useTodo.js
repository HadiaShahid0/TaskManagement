import { useEffect, useState } from "react";
import TodoApi from "../services/todoApi";

const useTodo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await TodoApi.getTodo();

        setTodos(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching Todo:", error);
      }
    };

    fetchTodo();
  }, []);

  const addTodo = async (todoData) => {
    try {
      const newTodo = await TodoApi.createTodo(todoData);

      setTodos((prevTodos) => [...prevTodos, newTodo.data]);
    } catch (error) {
      console.error("Error adding Todo:", error);
    }
  };

  const updateTodoById = async (todoId, updatedData) => {
    try {
      const updatedTodo = await TodoApi.updateTodo(todoId, updatedData);

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId ? updatedTodo.data : todo
        )
      );
    } catch (error) {
      console.error("Error updating Todo:", error);
    }
  };

  const deleteTodoById = async (todoId) => {
    try {
      await TodoApi.deleteTodo(todoId);

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== todoId)
      );
    } catch (error) {
      console.error("Error deleting Todo:", error);
    }
  };

  return {
    todos,
    addTodo,
    updateTodoById,
    deleteTodoById,
  };
};

export default useTodo;