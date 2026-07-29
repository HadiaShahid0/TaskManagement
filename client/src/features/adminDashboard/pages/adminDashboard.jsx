import AdminNavbar from "../components/adminNavbar";
import Footer from "../../../components/common/footer";
import UserTable from "../components/userTable";
import useAdmin from "../hooks/useAdmin";

const AdminDashboard = () => {
  const { users, savePermissions } = useAdmin();
  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        <h3 className="mb-4">Users</h3>
        <UserTable users={users} savePermissions={savePermissions} />
      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;
