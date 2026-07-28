import BASE_URL from "../../../services/api";

export const uploadProfileImage = async (image) => {
  const formData = new FormData();

  formData.append("profileImage", image);

  const response = await fetch(`${BASE_URL}/profile/upload`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  return await response.json();
};
