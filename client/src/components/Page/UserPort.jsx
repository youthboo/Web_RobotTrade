import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPort.css';
import Navbar from "../Navbar";
import { FaTimes } from 'react-icons/fa';

const UserPort = () => {
    const [mt4Data, setMt4Data] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLogin, setUserLogin] = useState('');
    const [showData, setShowData] = useState(false);
    const [totalProfit, setTotalProfit] = useState(0);
    const [commissionPayment, setCommissionPayment] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (showData) {
            fetchData();
        }
    }, [showData]);

    const handleLoginChange = (event) => {
        setUserLogin(event.target.value);
    };

    const handleButtonClick = () => {
        setShowData(true);
        togglePopup(); // เรียกใช้ togglePopup เพื่อแสดง Popup เมื่อคลิกที่ปุ่ม "Click!"
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5555/api/mt4data');
            setMt4Data(response.data);
            calculateCommission(response.data);
        } catch (error) {
            console.error('Error fetching MT4 data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateCommission = (data) => {
        let totalProfit = 0;
        data.forEach(item => {
            if (item.userLogin === userLogin) {
                totalProfit += item.profit;
            }
        });
        const commission = totalProfit * 0.1;
        setTotalProfit(totalProfit);
        setCommissionPayment(commission);
    };

    return (
        <div >
            <Navbar />
            <div className="input-container">
            <h1 className='topic'>My Portfolio</h1>
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
                    {showPopup && (
                        <div className="port-popup">
                            <button className="close-btn" onClick={togglePopup}>
                                <FaTimes />
                            </button>
                            <div>
                                <p>Total Profit : ${totalProfit.toFixed(2)}</p> 
                                <p>Commission Payment : ${commissionPayment.toFixed(2)}</p>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Datetime</th>
                                        <th>Order number</th>
                                        <th>Balance</th>
                                        <th>Equity</th>
                                        <th>Profit</th>
                                        <th>Symbol</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mt4Data.map(data => (
                                        <tr key={data._id}>
                                            <td>{new Date(data.datetime).toLocaleString()}</td>
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
            )}
        </div>
    );
};

export default UserPort;