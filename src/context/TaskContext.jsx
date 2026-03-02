import { createContext, useContext } from "react";

export const TaskContext = createContext();

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within a TaskProvider");
  return ctx;
}