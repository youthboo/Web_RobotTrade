import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UserPayment.css';
import Navbar from "../Navbar"; // Import Navbar definition

const UserPayment = () => {
    const [amount, setAmount] = useState(0);
    const [qrCode, setQrCode] = useState('');
    const [file, setFile] = useState(null); 
    const [userLogin, setUserLogin] = useState(''); 
    const location = useLocation(); 
    const { commissionPayment, userLogin: user } = location.state || {}; //
    useEffect(() => {
        if (commissionPayment) {
            setAmount(commissionPayment);
        }
        if (user) {
            setUserLogin(user);
        }
    }, [commissionPayment, user]);

    const generateQrCode = async (event) => {
        try {
            event.preventDefault();
            const response = await fetch('http://localhost:5555/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate QR code');
            }

            const svg = await response.text();
            setQrCode(svg);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const checkSlip = async (event) => {
      try {
          event.preventDefault();
          const formData = new FormData();
          formData.append('file', file);
          
          const res = await fetch('http://localhost:5555/api/upload-image', {
              method: 'POST',
              body: formData,
          });
          if (!res.ok) {
              throw new Error('Failed to upload image');
          }
          // ดำเนินการต่อตามที่คุณต้องการ
      } catch (error) {
          console.error('Error uploading image:', error);
      }
  };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    
    return (
        <>
            <div className='container'>
                <div className='card '>
                    <div className='card-body'>
                        <label className='form-label'> Amount:</label>
                        <p>Commission Payment: ${amount}</p>
                        <input
                            className='form-control'
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <br />
                        <button className='btn btn-success m-1' onClick={generateQrCode}>Generate QR Code</button>
                        <br />
                        {qrCode && (
                            <div className='card' >
                                <div className='card-body'>
                                    <h2 className='card-title'>QR Code:</h2>
                                    <div className="qrcode" dangerouslySetInnerHTML={{ __html: qrCode }}
                                        style={{ height: "300px", width: "300px" }} />
                                </div>
                            </div>
                        )}
                        <br />

                        <form onSubmit={checkSlip}>
                            <label className='form-label-p'>Please upload you slip for check</label>
                            <input type='file' className='form-control' onChange={handleFileChange} />
                            <br />
                            <button className='btn btn-primary' type='submit'>Submit</button>
                        </form >

                    </div>
                </div>
            </div>
            <Navbar />
        </>

    );
};
export default UserPayment;
