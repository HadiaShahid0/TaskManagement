import AdminNavbar from '../components/adminNavbar.jsx';
import CreateUserForm from '../components/createUserForm.jsx';
import Footer from '../../../components/common/footer.jsx';
const userCreate = ({ loadUsers }) => {
    return (
        <>
        <AdminNavbar/>
            <CreateUserForm loadUsers={loadUsers} />
            <Footer/>
        </>
    );
};

export default userCreate;