import TodoItem from "./todoItem";

const todoList = ({ todos, onEdit, onDelete, showActions = true }) => {
  
  console.log("Todos in TodoList:", todos);
  return (
    <div className="card p-3 shadow-sm mt-3">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {(todos || []).map((todo) => {
            return (
              <TodoItem
                key={todo._id}
                todo={todo}
                onEdit={onEdit}
                onDelete={onDelete}
                showActions={showActions}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default todoList;
