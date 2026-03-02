import { NavLink } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">
          Task<span>.</span>Board
        </NavLink>
        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
          >
            All Tasks
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
          >
            Completed
          </NavLink>
        </nav>
      </header>

      <main className="container">{children}</main>
    </div>
  );
}
