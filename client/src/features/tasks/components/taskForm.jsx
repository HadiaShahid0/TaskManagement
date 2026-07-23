import { useState, useEffect } from "react";


const TaskFormContent = ({ onAdd, editingTask, onUpdate }) => {

  const [title, setTitle] = useState(editingTask?.title ?? "");
  const [description, setDescription] = useState(editingTask?.description ?? "",);
  const [status, setStatus] = useState(editingTask?.status ?? false);
  
  useEffect(() => {
    if (editingTask) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status === true || editingTask.status === "true");
    } else {
      setTitle("");
      setDescription("");
      setStatus(false);
    }
  }, [editingTask]);

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

    const taskData = {
      title,
      description,
      status,
    };

    if (editingTask) {
      onUpdate({
        ...taskData,
        _id: editingTask._id,
      });
    } else {
      onAdd(taskData);
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
          placeholder="Enter task title"
          required
        />

        <textarea
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
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
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};


const TaskForm = ({ onAdd, editingTask, onUpdate }) => {
  return (
    <TaskFormContent
      key={editingTask ? editingTask._id : "new"}
      onAdd={onAdd}
      editingTask={editingTask}
      onUpdate={onUpdate}
    />
  );
};

export default TaskForm;
