import { useEffect, useState } from "react";
import { getUsers, updatePermissions } from "../services/adminServices";

const useAdmin = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      console.log("API Response:", data);

      setUsers(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await loadUsers();
    };

    fetchUsers();
  }, []);

  const savePermissions = async (id, permissions) => {
    await updatePermissions(id, permissions);
    loadUsers();
  };

  return {
    users,
    savePermissions,
  };
};

export default useAdmin;
