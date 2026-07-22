import TaskItem from "./taskItem";

const TaskList = ({ tasks, onEdit, onDelete, showActions = true }) => {
  return (
    <div className="card p-3 shadow-sm mt-3">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Status</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              showActions={showActions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
