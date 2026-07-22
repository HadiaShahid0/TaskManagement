import StatsCard from "../features/userdashboard/components/card.jsx";
import DashboardServices from "../features/userdashboard/services/dashboardServices.js";
import Navbar from "../components/common/navbar.jsx";
import Footer from "../components/common/footer.jsx";
import TaskList from "../features/tasks/components/taskList.jsx";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { stats, tasks } = DashboardServices();

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row my-4">
          <div className="col-md-4">
            <StatsCard title="Total Tasks" value={stats.total} />
          </div>
          <div className="col-md-4">
            <StatsCard title="Completed" value={stats.completed}/>
          </div>
          <div className="col-md-4">
            <StatsCard title="Pending" value={stats.pending} />
          </div>
        </div>
        <TaskList tasks={tasks.slice(0, 5)} showActions={false} />
        <div className="d-flex justify-content-center">
          <Link to="/tasks" className="btn btn-outline-success mt-3 w-25">
            View All Tasks
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
