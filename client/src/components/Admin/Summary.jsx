import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import './Summary.css';
import NavbarSidebar from './NavbarSidebar';

function Summary() {
  const [totalProfit, setTotalProfit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // เพิ่ม state สำหรับเก็บสถานะของ Sidebar

  useEffect(() => {
    fetchMt4Data();
    fetchUserCount();
  }, []);

  const fetchMt4Data = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5555/api/mt4data');
      const mt4Data = response.data;
      const totalProfitSum = mt4Data.reduce((sum, data) => sum + data.profit, 0);
      setTotalProfit(totalProfitSum);
      const formattedData = mt4Data.map(data => {
        const date = new Date(data.datetime);
        return {
          date: date.toISOString().split('T')[0], // แปลงวันที่ให้อยู่ในรูปแบบ YYYY-MM-DD
          profit: data.profit,
        };
      });
      setChartData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching MT4 data:', error);
      setLoading(false);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/users/count');
      setUserCount(response.data.count);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  useEffect(() => {
    if (chartData.length > 0) {
      const ctx = document.getElementById('myChart').getContext('2d');
      const labels = chartData.map(data => data.date);
      const datasets = [{
        label: 'Profit',
        data: chartData.map(data => data.profit),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
      }];
  
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
  
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  useEffect(() => {
    if (userCount > 0) {
      const ctx = document.getElementById('userChart').getContext('2d');
      const labels = ['Users'];
      const datasets = [{
        label: 'Number of Users',
        data: [userCount],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }];
  
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
  
      const userChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [userCount]);

  const toggleSidebar = () => { // เพิ่มฟังก์ชันเพื่อเปลี่ยนสถานะของ Sidebar เมื่อคลิก
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`dashboard ${isOpen ? 'sidebar-active' : ''}`}>
        <NavbarSidebar toggleSidebar={toggleSidebar} />
        <div className={`summary-container ${isOpen ? 'sidebar-active' : ''}`}>
          <h1 className="summary-header">Summary</h1>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : (
            <div className="summary-content">
              <div className="summary-item">
                <p>Total Profit :</p>
                <p>${(totalProfit * 0.1).toFixed(2)}</p>
              </div>
              <div className="summary-item">
                <p>Total Users :</p>
                <p>{userCount}</p>
              </div>
              <div className="chart-container">
                <canvas id="myChart" width="400" height="200"></canvas>
              </div>
              <div className="chart-container">
                <canvas id="userChart" width="400" height="200"></canvas>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}

export default Summary;
