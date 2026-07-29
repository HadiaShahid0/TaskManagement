import { useState } from "react";
import TodoForm from "../components/todoForm.jsx";
import TodoList from "../components/todoList.jsx";
import useTodo from "../hooks/useTodo.js";
import Navbar from "../../../components/common/navbar.jsx";
import Footer from "../../../components/common/footer.jsx";
const Todos = () => {
  const { todos, addTodo, deleteTodoById, updateTodoById } = useTodo();

  const [editingTodo, setEditingTodo] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const handleEdit = (Todo) => {
    const editTodo = {
      ...Todo,
      status: Todo.status.toString(),
    };

    setEditingTodo(editTodo);
  };

  const handleUpdate = (Todo) => {
    updateTodoById(Todo._id, Todo);
    setEditingTodo(null);
  };
  const filteredTodo = todos.filter((todo) => {
    if (statusFilter === "All") {
      return true;
    }

    if (statusFilter === "Completed") {
      return todo.status === true;
    }

    if (statusFilter === "Pending") {
      return todo.status === false;
    }

    return true;
  });
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
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Todos</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Filtered Task List */}
        <TodoList

          todos={filteredTodo}
          onEdit={handleEdit}
          onDelete={deleteTodoById}
        />
      </div>
      <Footer />
    </>
  );
};

export default Todos;
