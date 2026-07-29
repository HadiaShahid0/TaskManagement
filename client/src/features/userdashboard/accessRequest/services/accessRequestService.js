import BASE_URL from "../../../../services/api";

// Send access request
export const createAccessRequest = async (module) => {
  const response = await fetch(`${BASE_URL}/access-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ module }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// Get logged-in user's requests
export const getMyRequests = async () => {
  const response = await fetch(`${BASE_URL}/access-request/my`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
