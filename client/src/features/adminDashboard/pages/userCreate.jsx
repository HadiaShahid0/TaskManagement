import CreateUserForm from '../components/createUserForm.jsx';

const userCreate = ({ loadUsers }) => {
    return (
        <>
            <CreateUserForm loadUsers={loadUsers} />
        </>
    );
};

export default userCreate;