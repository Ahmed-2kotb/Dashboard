import React from 'react';
import './Topbar.css';

function Topbar({ toggleSidebar }) {
  return (
    <div className="topbar">
      
      <h1>My Dashboard</h1>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
    </div>
  );
}

export default Topbar;
