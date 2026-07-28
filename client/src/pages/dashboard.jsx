import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { verify } from "../features/auth/services/authServices";
import StatsCard from "../features/userdashboard/components/card";
import DashboardServices from "../features/userdashboard/services/dashboardServices";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer";
import TaskList from "../features/tasks/components/taskList";
import TodoList from "../features/todo/components/todoList"
const Dashboard = () => {
  const { taskStats, tasks, todos, todoStats } = DashboardServices();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await verify();

      if (response.success) {
        setUser(response.user); // or response.data if you changed verify()
      }
    };

    getUser();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="row">

          {user?.permissions?.task && (
            <>
              <div className="col-md-4 mb-3">
                <StatsCard title="Total Tasks" value={taskStats.total} />
              </div>

              <div className="col-md-4 mb-3">
                <StatsCard title="Completed Tasks" value={taskStats.completed} />
              </div>

              <div className="col-md-4 mb-3">
                <StatsCard title="Pending Tasks" value={taskStats.pending} />
              </div>
            </>
          )}

          {user?.permissions?.todo && (
            <>
              <div className="col-md-4 mb-3">
                <StatsCard title="Total Todos" value={todoStats.total} />
              </div>

              <div className="col-md-4 mb-3">
                <StatsCard title="Completed Todos" value={todoStats.completed} />
              </div>

              <div className="col-md-4 mb-3">
                <StatsCard title="Pending Todos" value={todoStats.pending} />
              </div>
            </>
          )}

        </div>

        {user?.permissions?.task && (
          <>
          <h5>Task List</h5>
            <TaskList
              tasks={tasks.slice(0, 5)}
              showActions={false}
            />

            <div className="d-flex justify-content-center">
              <Link
                to="/tasks"
                className="btn btn-outline-success mt-3"
              >
                View All Tasks
              </Link>
            </div>
          </>
        )}

        {user?.permissions?.todo && (
          <>
          <h5>Todo List</h5>
            <TodoList todos={todos.slice(0, 5)} showActions={false} />

            <div className="d-flex justify-content-center">
              <Link
                to="/todo"
                className="btn btn-outline-primary mt-3"
              >
                View All Todos
              </Link>
            </div>
          </>
        )}

      

      </div>

      <Footer />
    </>
  );
};

export default Dashboard;