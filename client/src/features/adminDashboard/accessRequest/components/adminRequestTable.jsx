import { acceptRequest, rejectRequest } from "../services/accessRequestService";

const AdminRequestTable = ({ requests, loadRequests, page }) => {
  const handleAccept = async (id) => {
    try {
      const response = await acceptRequest(id);

      alert(response.message);

      loadRequests(page);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await rejectRequest(id);

      alert(response.message);

      loadRequests(page);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <table className="table table-bordered table-hover mt-4 table-sm">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Email</th>
          <th>Module</th>
          <th>Status</th>
          <th>Requested At</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {requests.map((request, index) => (
          <tr key={request._id}>
            <td>{(page - 1) * 5 + index + 1}</td>

            <td>{request.user.name}</td>
            <td>{request.user.email}</td>
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

            <td>
              {request.status === "Pending" ? (
                <>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </button>
                </>
              ) : (
                "-"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminRequestTable;