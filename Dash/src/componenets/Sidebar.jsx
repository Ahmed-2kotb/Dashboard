import React from 'react';
import './Sidebar.css';

function Sidebar({ activePage, setActivePage, isOpen, closeSidebar }) {
  const pages = ['Dashboard', 'Users', 'Products', 'Settings'];

  return (
    <>
      <div
        className={`overlay ${isOpen ? 'show' : ''}`}
        onClick={closeSidebar}
      ></div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>Dashboard</h2>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => {
              setActivePage(page);
              closeSidebar();
            }}
            className={activePage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
