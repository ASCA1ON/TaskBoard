import DashboardSummary from "../components/DashboardSummary";
import TaskList from "../components/TaskList";

export default function CompletedTasks() {
  return (
    <>
      <DashboardSummary />
      <TaskList fixedStatus="Completed" />
    </>
  );
}
