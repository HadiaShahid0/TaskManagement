import BASE_URL from "../../../services/api";
// Create a new Todo
const createTodo = async (TodoData) => {
  const response = await fetch(`${BASE_URL}/todos/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(TodoData),
  });

  if (!response.ok) {
    throw new Error("Failed to create Todo");
  }

  return response.json();
};

// Get all todo
export const getTodo = async (page = 1, limit = 1, status = "All") => {
  const response = await fetch(
    `${BASE_URL}/todos?page=${page}&limit=${limit}&status=${status}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }
  return response.json();
};

// Update a Todo
const updateTodo = async (todoId, updatedData) => {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update Todo");
  }

  return response.json();
};

// Delete a Todo
const deleteTodo = async (todoId) => {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete Todo");
  }

  return response.json();
};

const TodoApi = {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};

export default TodoApi;
