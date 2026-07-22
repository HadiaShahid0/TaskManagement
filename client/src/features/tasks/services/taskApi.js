
// Create a new task
const createTask = async (taskData) => {
  const response = await fetch("http://localhost:5000/api/tasks/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};

// Get all tasks
const getTasks = async () => {
  const response = await fetch("http://localhost:5000/api/tasks");

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

// Update a task
const updateTask = async (taskId, updatedData) => {
  const response = await fetch(`http://localhost:5000/api/tasks/update/${taskId}`, {
    method: "PUT",
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
  const response = await fetch(`http://localhost:5000/api/tasks/delete/${taskId}`, {
    method: "DELETE",
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