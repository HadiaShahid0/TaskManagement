import { useEffect, useState } from "react";
import { verify } from "../../../auth/services/authServices";
import RequestModuleModal from "../components/requestModal";
import { getMyRequests } from "../services/accessRequestService";
import Navbar from "../../../../components/common/navbar";
import Footer from "../../../../components/common/footer";

const Request = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const response = await getMyRequests();

      if (response.success) {
        setRequests(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await verify();

        if (response.success) {
          setUser(response.user);
        }

        await loadRequests();
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  const hasAllPermissions = user?.permissions?.task && user?.permissions?.todo;

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        {user && !hasAllPermissions && (
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target="#requestModal"
            >
              Request Module Access
            </button>
          </div>
        )}

        {user && (
          <RequestModuleModal
            permissions={user.permissions}
            onRequestSent={loadRequests}
          />
        )}

        {user && !user.permissions.task && !user.permissions.todo && (
          <div className="alert alert-warning text-center">
            <h5>You don't have access to any modules.</h5>
          </div>
        )}

        {requests.length > 0 && (
          <>
            <h4 className="mt-5 mb-3">My Requests</h4>

            <table className="table table-bordered table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Module</th>
                  <th>Status</th>
                  <th>Requested At</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request, index) => (
                  <tr key={request._id}>
                    <td>{index + 1}</td>

                    <td className="text-capitalize">{request.module}</td>

                    <td>
                      <span
                        className={
                          request.status === "Pending"
                            ? "badge bg-warning text-dark"
                            : request.status === "Accepted"
                              ? "badge bg-success"
                              : "badge bg-danger"
                        }
                      >
                        {request.status}
                      </span>
                    </td>

                    <td>{new Date(request.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Request;
