import { useEffect, useState } from "react";
import { verify } from "../../auth/services/authServices";
import ProfileForm from "./profileForm";

const ProfileCard = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const data = await verify();

    if (data.success) {
      setUser(data.user);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await verify();

      if (data.success) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card p-4 shadow rounded w-50">
        {user?.profileImage && (
          <img
            src={`http://localhost:5000/uploads/avaters/${user.profileImage}`}
            alt="Profile"
            className="rounded-circle mx-auto mb-3"
            width="150"
            height="150"
          />
        )}

        <div className="row">
          <div className="col-md-6">
            <p>
              <b>Username:</b> {user?.name}
            </p>
          </div>

          <div className="col-md-6">
            <p>
              <b>Email:</b> {user?.email}
            </p>
          </div>
        </div>

        <ProfileForm onUpload={getUser} />
      </div>
    </div>
  );
};

export default ProfileCard;
