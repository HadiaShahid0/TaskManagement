import useTask from "../../tasks/hooks/useTasks";
import useTodo from "../../todo/hooks/useTodo";

const DashboardServices = () => {
  const { tasks } = useTask();
  const { todos } = useTodo();

  const taskList = Array.isArray(tasks) ? tasks : [];
  const todoList = Array.isArray(todos) ? todos : [];

  const taskStats = {
    total: taskList.length,
    completed: taskList.filter((task) => task.status).length,
    pending: taskList.filter((task) => !task.status).length,
  };

  const todoStats = {
    total: todoList.length,
    completed: todoList.filter((todo) => todo.status).length,
    pending: todoList.filter((todo) => !todo.status).length,
  };

  return {
    taskStats,
    todoStats,
    tasks: taskList,
    todos: todoList,
  };
};

export default DashboardServices;