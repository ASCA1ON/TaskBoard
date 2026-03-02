import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import "./TaskForm.css";

const EMPTY_FORM = {
  title: "",
  description: "",
  status: "Pending",
  dueDate: "",
};

export default function TaskForm({ task, onClose }) {
  const { addTask, editTask } = useTasks();
  const isEditing = Boolean(task);

  const [form, setForm] = useState(isEditing ? { ...task } : EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Please provide a title";
    if (!form.dueDate) e.dueDate = "Due date is required";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }    
    isEditing ? editTask(form) : addTask(form);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">
            Title <span className="req">*</span>
          </label>
          <input
            className={`form-input ${errors.title ? "error" : ""}`}
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Design System Update"
            autoFocus
          />
          {errors.title ? <p className="error-msg">{errors.title}</p> : <p className="no-error-msg"></p>}
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Add a brief description..."
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Due Date <span className="req">*</span>
            </label>
            <input
              type="date"
              className={`form-input ${errors.dueDate ? "error" : ""}`}
              value={form.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
            {errors.dueDate ? <p className="error-msg">{errors.dueDate}</p> : <p className="no-error-msg"></p>}
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            {isEditing ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
