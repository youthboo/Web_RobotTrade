import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarSidebar from './NavbarSidebar'; 

function Model() {
    const [data, setData] = useState([]);

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

    return (
        <div>
            <NavbarSidebar />
            <h1>Admin Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>User Login</th>
                        <th>Email</th>
                        <th>Commission</th>
                        <th>Amount Received</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(data) && data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.userLogin}</td>
                        <td>{item.email}</td>
                        <td>{item.payment}</td>
                        <td>{item.amountReceived}</td>
                        <td>{item.status}</td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
}

export default Model;
