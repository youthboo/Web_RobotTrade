import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Model.css'
import Swal from 'sweetalert2';
import NavbarSidebar from './NavbarSidebar'; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

function Model() {
    const [data, setData] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5555/api/admincheck'); 
                setData(response.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditFormData(data[index]);
        setOpenEditDialog(true);
    };

    const handleEditFormChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:5555/api/admincheck/${editFormData._id}`, editFormData);
            setOpenEditDialog(false);
            fetchData();
        } catch (error) {
            console.error('Error editing data:', error);
        }
    };

    const handleDelete = async (id) => {
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
            try {
                await axios.delete(`http://localhost:5555/api/admincheck/${id}`);
                fetchData();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    };    

    return (
        <div>
            <NavbarSidebar />
            
            <table>
                <thead>
                    <tr>
                        <th>User Login</th>
                        <th>Email</th>
                        <th>Commission</th>
                        <th>Amount Received</th>
                        <th>Payment Status</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.userLogin}</td>
                            <td>{item.email}</td>
                            <td>{item.payment}</td>
                            <td>{item.amountReceived}</td>
                            <td>{item.statusPayment}</td>
                            <td>{new Date(item.date).toLocaleString()}</td>
                            <td>{item.status}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Commission</DialogTitle>
                <DialogContent>
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
                    <TextField
                        label="Status"
                        name="status"
                        value={editFormData.status || ''}
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
    );
}

export default Model;
