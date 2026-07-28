import { useState } from "react";
import TodoForm from "../features/todo/components/todoForm.jsx";
import TodoList from "../features/todo/components/todoList.jsx";
import useTodo from "../features/todo/hooks/useTodo.js";
import Navbar from "../components/common/navbar.jsx";
import Footer from "../components/common/footer.jsx";
const Todos = () => {
  const { todos, addTodo, deleteTodoById, updateTodoById } = useTodo();

  const [editingTodo, setEditingTodo] = useState(null);

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
        <TodoList
  todos={todos}
  onEdit={handleEdit}
  onDelete={deleteTodoById}
/>
      </div>
      <Footer />
    </>
  );
};

export default Todos;
