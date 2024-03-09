import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './UserPayment.css';
import Navbar from "../Navbar";
import Swal from 'sweetalert2';
import axios from 'axios';

const UserPayment = () => {
    const [amount, setAmount] = useState(0);
    const [qrCode, setQrCode] = useState('');
    const [file, setFile] = useState(null);
    const [userLogin, setUserLogin] = useState('');
    const [portNumber, setPortNumber] = useState('');
    const location = useLocation();
    const { commissionPayment, userLogin: user } = location.state || {};

    useEffect(() => {
        if (commissionPayment) {
            setAmount(commissionPayment);
        }
        if (user) {
            setUserLogin(user);
        }
    }, [commissionPayment, user]);

    const fetchCommissionByPort = async (userLogin) => {
        try {
            const response = await axios.get(`http://localhost:5555/api/commission?userLogin=${userLogin}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching commission data:', error);
            return null;
        }
    };

    useEffect(() => {
        if (portNumber) {
            fetchCommissionByPort(portNumber)
                .then(commissions => {
                    if (commissions && commissions.length > 0) {
                        const filteredCommission = commissions.filter(commission => commission.userLogin === portNumber);
                        if (filteredCommission.length > 0) {
                            setAmount(filteredCommission[0].payment);
                            setQrCode(''); // Clear QR code if commission found
                        } else {
                            setAmount(0);
                            setQrCode(''); // Clear QR code if commission not found
                            Swal.fire({
                                icon: 'warning',
                                title: 'Commission not found',
                                text: 'No commission data found for the specified port number.',
                                confirmButtonText: 'OK'
                            });
                        }
                    } else {
                        setAmount(0);
                        setQrCode(''); // Clear QR code if commission not found
                    }
                })
                .catch(error => {
                    console.error('Error fetching commission data:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        confirmButtonText: 'OK'
                    });
                });
        }
    }, [portNumber]);

    const generateQrCode = async () => {
        try {
            const response = await axios.post('http://localhost:5555/api/payment', { amount, portNumber });
            setQrCode(response.data);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const checkSlip = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('http://localhost:5555/api/upload-image', formData);
            Swal.fire({
                icon: 'success',
                title: 'Payment completed successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            generateQrCode();
        }
    };

    return (
        <>
            <div className='container'>
                <div className='card '>
                    <div className='card-body'>
                        <label className='form-label'>Port Number : </label>
                        <input
                            className='form-control'
                            type="text"
                            value={portNumber}
                            onChange={(e) => setPortNumber(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <p>Commission Payment: ${amount}</p>
                        <br />
                        <button className='btn btn-success m-1' onClick={generateQrCode}>QR Code</button>
                        {qrCode && (
                            <div className='card' >
                                <div className='card-body'>
                                    <div className="qrcode" dangerouslySetInnerHTML={{ __html: qrCode }}
                                        style={{ height: "400px", width: "400px" }} />
                                </div>
                            </div>
                        )}
                        <br />
                        <form onSubmit={checkSlip}>
                            <label className='form-label-p'>Please upload your slip for check</label>
                            <input type='file' className='form-controlna' onChange={handleFileChange} />
                            <button className='btn btn-primary' type='submit'>Submit</button>
                        </form>

                    </div>
                </div>
            </div>
            <Navbar />
        </>
    );
};

export default UserPayment;
