import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import "./TaskList.css";

const FILTERS = ["All", "Pending", "In Progress", "Completed"];

export default function TaskList({ fixedStatus }) {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [modal, setModal] = useState(null);

  const activeFilter = fixedStatus || filter;

  const visible = [...tasks]
    .filter((t) => activeFilter === "All" || t.status === activeFilter)
    .sort((a, b) => {
      const diff = new Date(a.dueDate) - new Date(b.dueDate);
      return sortAsc ? diff : -diff;
    });

  return (
    <>
      <div className="toolbar">
        {!fixedStatus && (
          <div className="filter-group">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <button className="sort-btn" onClick={() => setSortAsc((s) => !s)}>
          <span>{sortAsc ? "↑" : "↓"}</span> Due Date
        </button>

        {!fixedStatus && (
          <button className="add-btn" onClick={() => setModal("add")}>
            + New Task
          </button>
        )}
      </div>

      <div className="task-grid">
        {visible.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <p className="empty-text">
              {fixedStatus
                ? "No completed tasks yet."
                : "No tasks found. Time to start something new!"}
            </p>
          </div>
        ) : (
          visible.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={(t) => setModal(t)} />
          ))
        )}
      </div>

      {modal && (
        <TaskForm
          task={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
