import React, { useState } from "react";
import "./App.css";

// Reusable Header Component
const Header = ({ theme, toggleTheme, userName }) => {
  return (
    <header className="app-header">
      <div className="brand">
        <h2>ModernUI</h2>
        <span className="brand-sub">Dashboard</span>
      </div>
      <div className="header-actions">
        <span><span className="welcome">Welcome, <strong>{userName}</strong></span></span>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>
    </header>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <span className="stat-title">{title}</span>
      </div>
      <div className="stat-body">
        <h3 className="stat-value">{value}</h3>
        <span className={`stat-badge ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? "▲" : "▼"} {change}
        </span>
      </div>
    </div>
  );
};

// Interactive Task List Component
const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <div className="task-container">
      <h3>Project Milestones</h3>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-state">No active milestones found.</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                />
                <span>{task.title}</span>
              </label>
              <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

// Main Modern UI Application Component
export default function App() {
  const [theme, setTheme] = useState("light");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design Component Wireframes", completed: true },
    { id: 2, title: "Build Responsive Layout System", completed: false },
    { id: 3, title: "Optimize Dark/Light Theme Switching", completed: false },
  ]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      title: taskInput.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={`app-root ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} userName="Alex Vance" />

      <main className="dashboard-content">
        <section className="stats-grid">
          <StatCard
            title="Total Revenue"
            value="$48,250"
            change="14.2%"
            isPositive={true}
            icon="01"
          />
          <StatCard
            title="Active Sessions"
            value="2,840"
            change="8.6%"
            isPositive={true}
            icon="02"
          />
          <StatCard
            title="Bounce Rate"
            value="21.4%"
            change="2.1%"
            isPositive={false}
            icon="03"
          />
        </section>

        <section className="task-section">
          <form className="task-form" onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Add a new milestone"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <button type="submit">Add Task</button>
          </form>

          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </main>
    </div>
  );
}
