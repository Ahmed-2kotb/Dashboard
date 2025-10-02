import React from 'react';
import './DashboardPage.css';
import StatCard from './StatCard';
import TodoList from './TodoList';
import RecentActivities from './RecentActivities';

function DashboardPage() {
	return (
		<div className="dashboard-page main-content">
			<h2>Dashboard Overview</h2>
			<div className="stats-container">
				<StatCard title="Users" value="120" color="#3498db" />
				<StatCard title="Sales" value="$3,400" color="#2ecc71" />
				<StatCard title="Tasks" value="23" color="#e74c3c" />
			</div>
			<TodoList />
			<RecentActivities />
		</div>
	);
}

export default DashboardPage;
