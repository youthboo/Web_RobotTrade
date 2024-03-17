import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import './UserList.css';
import Swal from 'sweetalert2';
import NavbarSidebar from './NavbarSidebar'; 

function UserList() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminClicked, setIsAdminClicked] = useState(false);
  const [users, setUsers] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editUserId, setEditUserId] = useState(null);

  const deleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5555/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    setEditFormData(userToEdit);
    setEditUserId(userId);
    setOpenEditDialog(true);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5555/api/users/${editUserId}`, editFormData);
      setOpenEditDialog(false);
      const updatedUsers = users.map(user => {
        if (user._id === editUserId) {
          return { ...user, ...editFormData };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error editing user:', error);
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
                <td className="actions">
                  <button className="edit-button" onClick={() => handleEdit(user._id)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              name="name"
              value={editFormData.name || ''}
              onChange={handleEditFormChange}
              fullWidth
              style={{ marginBottom: '10px', padding: '20px' }} 
              InputProps={{
                style: { padding: '10px' } 
              }}
              InputLabelProps={{
                style: { padding: '10px' } 
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={editFormData.email || ''}
              onChange={handleEditFormChange}
              fullWidth
              style={{ marginBottom: '10px', padding: '20px' }} 
              InputProps={{
                style: { padding: '10px' } 
              }}
              InputLabelProps={{
                style: { padding: '10px' } 
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default UserList;
