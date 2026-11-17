import BASE_URL from "../../../services/api";

export const createUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/admin/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/admin/users`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const updatePermissions = async (id, permissions) => {
  const response = await fetch(`${BASE_URL}/admin/permissions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(permissions),
  });

  if (!response.ok) {
    throw new Error("Failed to update permissions");
  }

  return response.json();
};