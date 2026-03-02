import { useTasks } from "../context/TaskContext";
import "./DashboardSummary.css";

const STATUSES = [
  { key: "pending",   label: "Pending Tasks",   status: "Pending" },
  { key: "progress",  label: "In Progress",     status: "In Progress" },
  { key: "completed", label: "Completed",       status: "Completed" },
];

export default function DashboardSummary() {
  const { tasks } = useTasks();
  const countFor = (status) => tasks.filter((t) => t.status === status).length;

  return (
    <div className="summary">
      {STATUSES.map(({ key, label, status }) => (
        <div key={key} className={`summary-card ${key}`}>
          <span className="summary-label">{label}</span>
          <span className="summary-count">{countFor(status)}</span>
        </div>
      ))}
    </div>
  );
}