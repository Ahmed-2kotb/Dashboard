import React, { useState, useEffect } from 'react';
import './SettingsPage.css';

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem('notifications') !== 'false'; 
  });
  const [autoUpdate, setAutoUpdate] = useState(() => {
    return localStorage.getItem('autoUpdate') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('autoUpdate', autoUpdate);
  }, [darkMode, notifications, autoUpdate]);

  return (
    <div className={`settings-page ${darkMode ? 'dark' : ''}`}>
      <h2>Settings Page</h2>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Dark Mode
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Notifications
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={autoUpdate}
            onChange={() => setAutoUpdate(!autoUpdate)}
          />
          Auto-Update
        </label>
      </div>

      <div className="current-settings">
        <h3>Current Settings:</h3>
        <p>Dark Mode: {darkMode ? 'Enabled' : 'Disabled'}</p>
        <p>Notifications: {notifications ? 'Enabled' : 'Disabled'}</p>
        <p>Auto-Update: {autoUpdate ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  );
}

export default SettingsPage;
