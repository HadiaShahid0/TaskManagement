import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminNavbar";
import Footer from "../../../components/common/footer";
import AdminRequestTable from "../accessRequest/components/adminRequestTable";
import { getAllRequests } from "../accessRequest/services/accessRequestService";

const Request = () => {
  const [requests, setRequests] = useState([]);
  // Load all access requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getAllRequests();

        if (response.success) {
          setRequests(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await getAllRequests();

      if (response.success) {
        setRequests(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        {/* Access Requests */}
        <h3 className="mt-5 mb-3">Access Requests</h3>

        <AdminRequestTable requests={requests} loadRequests={loadRequests} />
      </div>

      <Footer />
    </>
  );
};

export default Request;
