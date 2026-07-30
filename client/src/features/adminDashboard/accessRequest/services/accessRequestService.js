import BASE_URL from "../../../../services/api";

// Get all requests (Admin)
export const getAllRequests = async (page = 1, limit = 5) => {
  const response = await fetch(
    `${BASE_URL}/access-request?page=${page}&limit=${limit}`,
    {
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// Accept Request
export const acceptRequest = async (id) => {
  const response = await fetch(
    `${BASE_URL}/access-request/${id}/accept`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// Reject Request
export const rejectRequest = async (id) => {
  const response = await fetch(
    `${BASE_URL}/access-request/${id}/reject`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};