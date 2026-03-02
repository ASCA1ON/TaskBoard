import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { TaskProvider } from "./context/TaskContext";
import Layout from "./components/Layout";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";
import "./index.css";
import { TaskProvider } from "./context/TaskProvider";

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Layout>
          <Routes>
            <Route path="/"          element={<AllTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </Layout>
      </TaskProvider>
    </BrowserRouter>
  );
}
