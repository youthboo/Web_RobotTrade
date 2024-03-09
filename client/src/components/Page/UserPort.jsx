import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './UserPort.css';

const UserPort = () => {
    const [mt4Data, setMt4Data] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLogin, setUserLogin] = useState('');
    const [showData, setShowData] = useState(false); 

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
            const response = await axios.post('http://localhost:5555/api/commission', { userLogin, commissionPayment });
            console.log('Commission payment sent successfully');
        } catch (error) {
            console.error('Error sending commission payment:', error);
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
                    <p>Total Profit: ${totalProfit.toFixed(2)}</p> 
                    <p>Commission Payment: ${commissionPayment}</p> 
                    <Link to={{
                        pathname: '/payment/userPayment',
                        state: { commissionPayment }
                    }} onClick={sendCommissionPayment}>Payment</Link>

                    <table>
                        <thead>
                            <tr>
                                <th>User Login</th>
                                <th>Balance</th>
                                <th>Equity</th>
                                <th>Profit</th>
                                <th>Symbol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(data => (
                                <tr key={data._id}>
                                    <td>{data.userLogin}</td>
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
