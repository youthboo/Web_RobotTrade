import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditUser.css'; // import CSS file for styling

function EditUser() {
  const { id } = useParams(); // Get the user ID from the URL params
  const [user, setUser] = useState({
    IDcard: '',
    port: '',
    name: '',
    email: '',
    status: '',
  });

  // Function to fetch user data by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]); // Fetch user data whenever the ID changes

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/api/users/${id}`, user);
      alert('User updated successfully');
      // Optionally, you can redirect the user to another page after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="edit-user">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="name"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status: </label>
          <input
            type="status"
            id="status"
            name="status"
            value={user.status}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
