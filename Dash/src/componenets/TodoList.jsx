import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Finish React project', done: false },
    { id: 2, task: 'Check emails', done: true },
    { id: 3, task: 'Update dashboard UI', done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="todo-list">
      <h3>To-Do List</h3>
      <ul>
        {tasks.map(t => (
          <li
            key={t.id}
            className={t.done ? 'done' : ''}
            onClick={() => toggleTask(t.id)}
          >
            {t.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
