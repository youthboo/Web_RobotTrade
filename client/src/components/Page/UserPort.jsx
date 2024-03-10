import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPort.css';
import Swal from 'sweetalert2';

const UserPort = () => {
    const [mt4Data, setMt4Data] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLogin, setUserLogin] = useState('');
    const [showData, setShowData] = useState(false);
    const [isEndOfMonth, setIsEndOfMonth] = useState(false); 
    const [isAfter15th, setIsAfter15th] = useState(false); 
    
    useEffect(() => {
        if (showData) {
            fetchData(); 
        }
        // ตรวจสอบว่าเราอยู่ในวันสิ้นเดือนหรือไม่
        /*const date = new Date();
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        setIsEndOfMonth(date.getDate() === lastDayOfMonth);*/
        // ตรวจสอบว่าเราอยู่ในวันสิ้นเดือนหรือไม่
        const date = new Date();
        setIsEndOfMonth(date.getDate() === 11);
        setIsAfter15th(date.getDate() > 15); 
    }, [showData]);

    const handleLoginChange = (event) => {
        setUserLogin(event.target.value);
    };

    const handleButtonClick = () => {
        setShowData(true); 
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5555/api/mt4data');
            setMt4Data(response.data);
        } catch (error) {
            console.error('Error fetching MT4 data:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const filteredData = mt4Data.filter(data => data.userLogin === userLogin);
    
    const totalProfit = filteredData.reduce((total, data) => total + data.profit, 0);
    const commissionPayment = (totalProfit * 0.1).toFixed(2); 

    const sendCommissionPayment = async () => {
        try {
            if (commissionPayment < 0) { // เช็คว่า commission เป็นลบหรือไม่
                // แสดง popup ว่าไม่ต้องจ่าย commission
                Swal.fire({
                    icon: 'info',
                    title: 'No Commission in Month',
                    text: 'ไม่มีค่า commission ที่ต้องจ่าย',
                    confirmButtonText: 'ตกลง'
                });
                return; // ออกจากฟังก์ชันถ้าไม่ต้องจ่ายเงิน
            }
    
            const response = await axios.put('http://localhost:5555/api/commission', { userLogin, commissionPayment });
            console.log('Commission payment sent successfully');
            window.location = '/payment/userPayment';
        } catch (error) {
            console.error('Error sending commission payment:', error);
            // แสดง popup แจ้งเตือนเมื่อเกิดข้อผิดพลาด
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'เกิดข้อผิดพลาดในการส่งค่า commission',
                confirmButtonText: 'ตกลง'
            });
        }
    };
    
    return (
        <div>
            <h1 className='topic'>My Portfolio</h1>
            <div className="input-container">
                <label htmlFor="loginInput">Enter your Port Number</label>
                <input 
                    className='input-portnum'
                    type="text" 
                    id="loginInput" 
                    value={userLogin} 
                    onChange={handleLoginChange} 
                />
                <button className='btn-showdata' onClick={handleButtonClick}>Click!</button>
            </div>
            {showData && !loading && (
                <div>
                    <p>Total Profit : ${totalProfit.toFixed(2)}</p> 
                    <p>Commission Payment : ${commissionPayment}</p> 
                    {isEndOfMonth && !isAfter15th &&( // แสดงปุ่ม Payment และข้อความเฉพาะในวันสิ้นเดือน
                        <div>
                            <h2>Paid Commission : ${commissionPayment}</h2>
                            <button className='btn-pay' onClick={sendCommissionPayment}>Payment</button>
                        </div>
                    )}

                    <table>
                        <thead>
                            <tr>
                                <th>Order number</th>
                                <th>Balance</th>
                                <th>Equity</th>
                                <th>Profit</th>
                                <th>Symbol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(data => (
                                <tr key={data._id}>
                                    <td>{data.order.ticket}</td>
                                    <td>{data.balance}</td>
                                    <td>{data.equity}</td>
                                    <td>{data.profit}</td>
                                    <td>{data.symbol}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserPort;

