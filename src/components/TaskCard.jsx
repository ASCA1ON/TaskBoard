import { useTasks } from "../context/TaskContext";
import "./TaskCard.css";

export default function TaskCard({ task, onEdit }) {
  const { deleteTask, editTask } = useTasks();

  const isOverdue =
    task.status !== "Completed" &&
    task.dueDate &&
    new Date(task.dueDate) < new Date();

  const formattedDate = task.dueDate
    ? new Date(task.dueDate + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "No date";

  const handleProgress = () => {
    console.log("handleProgress called with task:", task);
    if (task.status === "Pending") {
      editTask({ ...task, status: "In Progress" });
    } else if (task.status === "In Progress") {
      editTask({ ...task, status: "Completed" });
    }
  };

  const badgeClass = task.status.replace(" ", "-").toLowerCase();

  return (
    <div className={`task-card ${isOverdue ? "is-overdue" : ""}`}>
      <div className="task-card-top">
        <div className="task-header-main">
          <span className={`badge ${badgeClass}`}>{task.status}</span>
          <h3 className="task-title">{task.title}</h3>
        </div>
      </div>

      {task.description && <p className="task-desc" title={task.description}>{task.description}</p>}

      <div className="task-footer">
        <div className={`task-date ${isOverdue ? "overdue" : ""}`}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {formattedDate}
          {isOverdue && <span> • Overdue</span>}
        </div>

        <div className="task-actions">
          {task.status !== "Completed" && (
            <button
              className="icon-btn progress-btn"
              onClick={handleProgress}
              title="Advance Status"
            >
              {task.status === "Pending" ? "→" : "✓"}
            </button>
          )}
          <button
            className="icon-btn edit"
            onClick={() => onEdit(task)}
            title="Edit"
          >
            ✎
          </button>
          <button
            className="icon-btn delete"
            onClick={() => deleteTask(task.id)}
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
