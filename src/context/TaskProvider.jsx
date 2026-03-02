import { useMemo, useReducer } from "react";
import { TaskContext } from "./TaskContext";

const loadFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  } catch {
    return [];
  }
};

const saveToStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState = {
  tasks: loadFromStorage(),
};

function taskReducer(state, action) {
  let tasks;

  switch (action.type) {
    case "ADD":
      tasks = [
        ...state.tasks,
        { ...action.payload, id: Date.now().toString() },
      ];
      break;

    case "EDIT":
      tasks = state.tasks.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t,
      );
      break;

    case "DELETE":
      tasks = state.tasks.filter((t) => t.id !== action.id);
      break;

    default:
      return state;
  }

  saveToStorage(tasks);
  return { tasks };
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const value = useMemo(
    () => ({
      tasks: state.tasks,
      addTask: (payload) => dispatch({ type: "ADD", payload }),
      editTask: (payload) => dispatch({ type: "EDIT", payload }),
      deleteTask: (id) => dispatch({ type: "DELETE", id }),
    }),
    [state.tasks],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
