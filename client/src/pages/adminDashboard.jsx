import AdminNavbar from "../features/adminDashboard/components/adminNavbar";
import Footer from "../components/common/footer";
import UserTable from "../features/adminDashboard/components/userTable";
import useAdmin from "../features/adminDashboard/hooks/useAdmin";

const AdminDashboard = () => {
  const { users, savePermissions } = useAdmin();

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          Admin Dashboard
        </h2>

        <UserTable
          users={users}
          savePermissions={savePermissions}
        />

      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;