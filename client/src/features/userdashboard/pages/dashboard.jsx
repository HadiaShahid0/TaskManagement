import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { verify } from "../../auth/services/authServices";
import StatsCard from "../components/card";
import DashboardServices from "../services/dashboardServices";
import Navbar from "../../../components/common/navbar";
import Footer from "../../../components/common/footer";
import TaskList from "../../tasks/components/taskList";
import TodoList from "../../todo/components/todoList";
import socket from "../../../services/socket";

const Dashboard = () => {
  const { taskStats, tasks, todos, todoStats } = DashboardServices();

  const [user, setUser] =useState(null);

  const loadUser = async () => {
    try {
      const response = await verify();

      if (response.success) {
        setUser(response.user);

        socket.emit("join", response.user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };                 

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUser();
  }, []);

  useEffect(() => {
    socket.on("permissionUpdated", async () => {
      await loadUser();
    });

    return () => {
      socket.off("permissionUpdated");
    };
  }, []);

  const permissions = user?.permissions ?? [];

  const hasTaskPermission = permissions.includes("task");
  const hasTodoPermission = permissions.includes("todo");

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="row">
          {hasTaskPermission && (
            <>
              <div className="col-md-4 mb-3">
                <StatsCard
                  title="Total Tasks"
                  value={taskStats.total}
                />
              </div>

              <div className="col-md-4 mb-3">
                <StatsCard
                  title="Completed Tasks"
                  value={taskStats.completed}
                />
              </div>

              <div className="col-md-4 mb-3">
                <StatsCard
                  title="Pending Tasks"
                  value={taskStats.pending}
                />
              </div>
            </>
          )}

          {hasTodoPermission && (
            <>
              <div className="col-md-4 mb-3">
                <StatsCard
                  title="Total Todos"
                  value={todoStats.total}
                />
              </div>

              <div className="col-md-4 mb-3">
                <StatsCard
                  title="Completed Todos"
                  value={todoStats.completed}
                />
              </div>

              <div className="col-md-4 mb-3">
                <StatsCard
                  title="Pending Todos"
                  value={todoStats.pending}
                />
              </div>
            </>
          )}
        </div>

        {hasTaskPermission && (
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

        {hasTodoPermission && (
          <>
            <h5 className="mt-4">Todo List</h5>

            <TodoList
              todos={todos.slice(0, 5)}
              showActions={false}
            />

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