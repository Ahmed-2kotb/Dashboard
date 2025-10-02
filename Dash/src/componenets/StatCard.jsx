import React from 'react';
import './StatCard.css';

function StatCard({ title, value, color }) {
  return (
    <div className="stat-card" style={{ backgroundColor: color }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default StatCard;
