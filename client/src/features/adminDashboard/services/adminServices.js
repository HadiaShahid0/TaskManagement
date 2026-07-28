import BASE_URL from "../../../services/api";

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