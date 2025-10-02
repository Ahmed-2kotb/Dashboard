import React, { useState, useEffect } from 'react';
import './UsersPage.css';

function UsersPage() {
  const defaultUsers = [
    { id: 1, name: 'Ahmed', email: 'ahmed@example.com' },
    { id: 2, name: 'Sara', email: 'sara@example.com' },
    { id: 3, name: 'Omar', email: 'omar@example.com' },
    { id: 4, name: 'Samy', email: 'Samy@example.com' },
  ];

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const parsed = JSON.parse(savedUsers);
      const merged = defaultUsers.filter(u => !parsed.find(p => p.id === u.id));
      return [...parsed, ...merged];
    }
    return defaultUsers;
  });

  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({ name: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = (e) => {
    e.preventDefault();
    const nextId = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id: nextId, ...newUser }]);
    setNewUser({ name: '', email: '' });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditUserData({ name: user.name, email: user.email });
  };

  const handleEditSave = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...editUserData } : u));
    setEditUserId(null);
    setEditUserData({ name: '', email: '' });
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-page main-content">
      <h2>Users Page</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <form onSubmit={handleAddUser} className="add-user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={e => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {editUserId === u.id ? (
                  <input
                    type="text"
                    value={editUserData.name}
                    onChange={e => setEditUserData({ ...editUserData, name: e.target.value })}
                  />
                ) : (
                  u.name
                )}
              </td>
              <td>
                {editUserId === u.id ? (
                  <input
                    type="email"
                    value={editUserData.email}
                    onChange={e => setEditUserData({ ...editUserData, email: e.target.value })}
                  />
                ) : (
                  u.email
                )}
              </td>
              <td>
                {editUserId === u.id ? (
                  <button onClick={() => handleEditSave(u.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(u)}>Edit</button>
                    <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
