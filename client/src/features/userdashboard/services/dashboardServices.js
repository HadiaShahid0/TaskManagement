import useTask from "../../tasks/hooks/useTasks";

const DashboardServices = () => {
  const { tasks } = useTask();

  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  return { stats, tasks };
};

export default DashboardServices;
