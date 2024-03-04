import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';
import DashboardIcon from '../../assets/dashboard.png';
import UserIcon from '../../assets/user.png';
import ModelIcon from '../../assets/model.png';

function UserList() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminClicked, setIsAdminClicked] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAdminClick = () => {
    setIsAdminClicked(!isAdminClicked);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="dashboard">
      <div className="navbar">
        <div className="menu-btn" onClick={toggleSidebar}>
          <button className="hamburger-button"><i className="fas fa-bars"></i></button>
        </div>
        <div className="logo">
          <h1>Robot Trade</h1>
        </div>
        <div className="admin-btn">
          <button onClick={handleAdminClick}>Admin</button>
        </div>
      </div>
      {isOpen && (
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/admin/summary"> 
                <img src={DashboardIcon} alt="Dashboard Icon" className="icon" />
                Summary
              </Link>
            </li>
            <li>
              <Link to="/admin/userlist"> 
                <img src={UserIcon} alt="User Icon" className="icon" />
                User
              </Link>
            </li>
            <li>
              <Link to="/admin/model"> 
                <img src={ModelIcon} alt="Model Icon" className="icon" />
                Model
              </Link>
            </li>
          </ul>
        </div>
      )}
      {isAdminClicked && <div className="welcome-msg">Welcome, Admin</div>}
      <div className="user-list-content">
        <h3>User Management</h3>
        <table>
          <thead>
            <tr>
              <th>ID Card</th>
              <th>Port</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.IDcard}</td>
                <td>{user.port}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td className="actions">
                  <Link to={`/admin/users/${user._id}/edit`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;



