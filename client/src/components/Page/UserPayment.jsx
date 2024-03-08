import React, { useState } from 'react';
import Navbar from "../Navbar";
import './UserPayment.css'



function userPayment() {
    const [amount, setAmount] = useState(0);
    const [qrCode, setQrCode] = useState('');
    const [file, setFile] = useState();
    // const secret = process.env.REACT_APP_KEY;

    
    // const [amountCheck, setAmountCheck] = useState(0);
    // console.log(file);
  
            const generateQrCode = async (event) => {
              try {
                event.preventDefault(); // Prevent page refresh
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
                event.preventDefault(); // Prevent page refresh
                  const formData = new FormData() ;
                  formData.append('file', file);
                const res = await fetch('https://developer.easyslip.com/api/v1/verify', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_KEY}`
                  },
                  body: formData,
                });
                if (!res.ok) {
                  throw new Error('Failed to verify payment');
                }
                const responseData = await res.json();
                const receivedAmount = JSON.stringify(responseData.data.amount.amount) ;
                // console.log(receivedAmount);
                // setAmountCheck(receivedAmount);
                if (receivedAmount === amount) {
                  console.log('Success');
                  // alert('Your payment is successful '+ amountCheck);
                  Swal.fire({
                    icon: 'success',
                    title: 'Your payment is successful',
                    showConfirmButton: false,
                    timer: 3000,
                  });
                } 
                else {
                  throw new Error('Something failed');
                }
  
              } catch (error) {
                console.error('Error', error);
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

                      <input
                      className='form-control'
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />

                      <br/>
                    
                    <button className='btn btn-success m-1' onClick={generateQrCode}>Generate QR Code</button>
                    
  
                          <br/>
                          {qrCode && (
                            <div className='card' >
                                  <div className='card-body'>
                                    <h2 className='card-title'>QR Code:</h2>
                                      <div dangerouslySetInnerHTML={{ __html: qrCode }} 
                                          style={{height:"350px",width:"350px"}} />
                                  </div>
                            </div>
                          )} 
                          <br/>
                        
                          <form onSubmit={checkSlip}>
                              <label className='form-label'>Plase upload you slip forcheck</label>
                                <input type='file' className='form-control'  onChange={handleFileChange} />
                                <br/>
                                  <button className='btn btn-primary' type='submit'>Submit</button>
                          </form >
                       
                  </div>
                </div>
              </div>
              <Navbar/>
            </>
            
    );
  };
export default userPayment