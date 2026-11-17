import { useState } from "react";
import TodoForm from "../components/todoForm.jsx";
import TodoList from "../components/todoList.jsx";
import useTodo from "../hooks/useTodo.js";
import Navbar from "../../../components/common/navbar.jsx";
import Footer from "../../../components/common/footer.jsx";

const Todos = () => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const {
    todos,
    addTodo,
    deleteTodoById,
    updateTodoById,
    page,
    setPage,
    totalPages,
  } = useTodo(statusFilter);

  const handleEdit = (todo) => {
    setEditingTodo({
      ...todo,
      status: todo.status.toString(),
    });
  };

  const handleUpdate = (todo) => {
    updateTodoById(todo._id, todo);
    setEditingTodo(null);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="text-center my-4">Todo Management Service</h1>

        <TodoForm
          onAdd={addTodo}
          editingTodo={editingTodo}
          onUpdate={handleUpdate}
        />

        {/* Filter Dropdown */}
        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select w-auto"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Todos</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Todo List */}
        <TodoList
          todos={todos}
          onEdit={handleEdit}
          onDelete={deleteTodoById}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-primary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Todos;