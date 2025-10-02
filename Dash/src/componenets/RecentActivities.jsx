import React, {useState} from 'react';
import './RecentActivities.css';

function RecentActivities() {
	const [activities] = useState([
		{id: 1, activity: 'User Ahmed logged in', time: '10:30 AM'},
		{id: 2, activity: 'New order #1023 placed', time: '11:00 AM'},
		{id: 3, activity: 'Settings updated by Admin', time: '11:45 AM'},
		{id: 4, activity: 'User Sara registered', time: '12:10 PM'},
	]);

	return (
		<div className="recent-activities">
			<h3>Recent Activities</h3>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Activity</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					{activities.map((a) => (
						<tr key={a.id}>
							<td>{a.id}</td>
							<td>{a.activity}</td>
							<td>{a.time}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default RecentActivities;
