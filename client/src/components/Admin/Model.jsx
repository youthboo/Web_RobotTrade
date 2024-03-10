import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Model() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/admincheck');
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Model</h2>
            <div>
                {data.map(item => (
                    <div key={item.userLogin}>
                        <h3>User Login: {item.userLogin}</h3>
                        <p>Commission Payment: ${item.commissionPayment}</p>
                        <p>Slip Image: {item.slipImage}</p>
                        <p>Upload Date Time: {item.uploadDateTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Model;
