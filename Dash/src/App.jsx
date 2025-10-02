import React, {useState} from 'react';
import './App.css';
import Sidebar from './componenets/Sidebar';
import Topbar from './componenets/Topbar';
import DashboardPage from './componenets/DashboardPage';
import UsersPage from './componenets/UsersPage';
import ProductsPage from './componenets/ProductsPage';
import SettingsPage from './componenets/SettingsPage';

function App() {
	const [activePage, setActivePage] = useState('Dashboard');
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
	const closeSidebar = () => setSidebarOpen(false);

	const renderContent = () => {
		switch (activePage) {
			case 'Dashboard':
				return <DashboardPage />;
			case 'Users':
				return < UsersPage/>;
			case 'Products': return <ProductsPage />;
			case 'Settings': return <SettingsPage />;
			default:
				return <h2>Page not found</h2>;
		}
	};

	return (
		<div className="dashboard-container">
			<Sidebar
				activePage={activePage}
				setActivePage={setActivePage}
				isOpen={sidebarOpen}
				closeSidebar={closeSidebar}
			/>

			<div className="main-content">
				<Topbar toggleSidebar={toggleSidebar} />

				<div className="page-content">{renderContent()}</div>
			</div>
		</div>
	);
}

export default App;
