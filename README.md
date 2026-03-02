# 📋 Task.Board

A sleek, minimalist task management dashboard built with **React** and **Context API**. This application features a professional "Blue & White" SaaS aesthetic, real-time status tracking, and a responsive grid layout.

## ✨ Features

* **Modern SaaS UI**: Clean white-space, subtle blue accents, and professional "Inter" typography.
* **Context State Management**: Centralized task logic using React Context and `useReducer`.
* **Dynamic Summary**: Real-time count of Pending, In-Progress, and Completed tasks.
* **Smart Workflow**: One-click status progression (Pending → In Progress → Completed).
* **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
* **Persistence**: Tasks are automatically saved to `localStorage`.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install

```

### 2. Start the dev server

```bash
npm run dev

```

---

## 🛠 Tech Stack

* **Frontend**: React 18+ (Vite)
* **Styling**: Modern CSS3 with Custom Properties (Variables)
* **Routing**: React Router 6
* **Icons**: Custom SVG & Unicode symbols
* **State**: React Context API + `useReducer`

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── DashboardSummary   # Top-level stats cards
│   ├── TaskList           # Main grid and toolbar logic
│   ├── TaskCard           # Individual task display & actions
│   └── TaskForm           # Modal for adding/editing tasks
├── context/
│   └── TaskContext.jsx    # Global state and localStorage sync
├── App.jsx                # Main entry point
└── index.css              # Global design system variables

```
