import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminNavbar";
import Footer from "../../../components/common/footer";
import AdminRequestTable from "../accessRequest/components/adminRequestTable";
import { getAllRequests } from "../accessRequest/services/accessRequestService";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadRequests = async (currentPage = page) => {
    try {
      const response = await getAllRequests(currentPage);

      if (response.success) {
        setRequests(response.data.requests);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadRequests(page);
  }, [page]);

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        <h3 className="mt-5 mb-3">Access Requests</h3>

        <AdminRequestTable
          requests={requests}
          loadRequests={loadRequests}
          page={page}
        />

        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-primary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Request;
