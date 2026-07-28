import { useState, useEffect } from "react";


const TodoFormContent = ({ onAdd, editingTodo, onUpdate }) => {

  const [title, setTitle] = useState(editingTodo?.title ?? "");
  const [description, setDescription] = useState(editingTodo?.description ?? "",);
  const [status, setStatus] = useState(editingTodo?.status ?? false);
  
  useEffect(() => {
    if (editingTodo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setStatus(editingTodo.status === true || editingTodo.status === "true");
    } else {
      setTitle("");
      setDescription("");
      setStatus(false);
    }
  }, [editingTodo]);

  function submitHandler(e) {
    e.preventDefault();

    if (title.trim().length === 0) {
      alert("Please enter a title");
      return;
    }

    if (description.trim().length === 0) {
      alert("Please enter a description");
      return;
    }

    const TodoData = {
      title,
      description,
      status,
    };

    if (editingTodo) {
      onUpdate({
        ...TodoData,
        _id: editingTodo._id,
      });
    } else {
      onAdd(TodoData);
    }

    setTitle("");
    setDescription("");
    setStatus(false);
  }

  return (
    <div className="card p-3 mb-3 shadow-sm rounded-3 d-flex align-items-center">
      <form onSubmit={submitHandler} className="d-flex inline-flex gap-3">
        <input
          className="form-control mb-2 w-75"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Todo title"
          required
        />

        <textarea
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Todo description"
          required
        />

        <select
          value={status.toString()}
          onChange={(e) => setStatus(e.target.value === "true")}
          className="form-control mb-2 w-50"
        >
          <option value="" disabled>
            Select status
          </option>
          <option value={false}>Pending</option>

          <option value={true}>Completed</option>
        </select>
        <button className="btn btn-outline-success w-50 " type="submit">
          {editingTodo ? "Update Todo" : "Add Todo"}
        </button>
      </form>
    </div>
  );
};


const TodoForm = ({ onAdd, editingTodo, onUpdate }) => {
  return (
    <TodoFormContent
      key={editingTodo ? editingTodo._id : "new"}
      onAdd={onAdd}
      editingTodo={editingTodo}
      onUpdate={onUpdate}
    />
  );
};

export default TodoForm;
