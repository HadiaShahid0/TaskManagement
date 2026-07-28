import { useState } from "react";
import { uploadProfileImage } from "../services/profileApi";

const ProfileForm = ({ onUpload }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const data = await uploadProfileImage(image);

    alert(data.message);

    if (onUpload) {
      onUpload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit" className="btn btn-success mt-3">
        Upload
      </button>
    </form>
  );
};

export default ProfileForm;