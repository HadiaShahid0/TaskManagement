import BASE_URL from "../../../services/api";
// Create a new task
const createTask = async (taskData) => {
  const response = await fetch(`${BASE_URL}/tasks/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};

// Get all tasks
export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

// Update a task
const updateTask = async (taskId, updatedData) => {
  const response = await fetch(`${BASE_URL}/tasks/update/${taskId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};

// Delete a task
const deleteTask = async (taskId) => {
  const response = await fetch(`${BASE_URL}/tasks/delete/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
};

const taskApi = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

export default taskApi;