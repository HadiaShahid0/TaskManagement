import useTask from "../../tasks/hooks/useTasks";

const DashboardServices = () => {
  const { tasks } = useTask();
  const taskList = Array.isArray(tasks) ? tasks : [];

  const stats = {
    total: taskList.length,
    completed: taskList.filter((task) => task.status).length,
    pending: taskList.filter((task) => !task.status).length,
  };

  return { stats, tasks };
};

export default DashboardServices;
