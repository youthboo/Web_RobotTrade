import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';
import NavbarSidebar from './NavbarSidebar'; 

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
    <div>
      <div className="user-list-content">
      <NavbarSidebar />
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



