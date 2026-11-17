import UserRow from "./userRow";

const UserTable = ({ users, savePermissions }) => {
  return (
    <table className="table table-bordered table-hover mt-4 table-sm">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Task</th>
          <th>Todo</th>
           <th>First Login</th>
        </tr>
      </thead>

      <tbody>
        {(users || []).map((user) => (
          <UserRow key={user._id} user={user} onSave={savePermissions} />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
