import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import './Summary.css';

// Function to get the week number from a date
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

function Summary() {
  const [totalProfit, setTotalProfit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [chartData, setChartData] = useState([]);

  // Fetch MT4 data and user count on component mount
  useEffect(() => {
    fetchMt4Data();
    fetchUserCount();
  }, []);

  // Fetch MT4 data from API
  const fetchMt4Data = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5555/api/mt4data');
      const mt4Data = response.data;
      const totalProfitSum = mt4Data.reduce((sum, data) => sum + data.profit, 0);
      setTotalProfit(totalProfitSum);
      const formattedData = mt4Data.map(data => ({
        date: new Date(data.date),
        profit: data.profit,
      }));
      setChartData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching MT4 data:', error);
      setLoading(false);
    }
  };

  // Fetch user count from API
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
      const labels = chartData.map(data => {
        const date = data.date;
        const weekNumber = getWeekNumber(date);
        return `Week ${weekNumber}`;
      });
      const datasets = [{
        label: 'Profit',
        data: chartData.map(data => data.profit),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
      }];
  
      // Destroy existing chart if exists
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
  

  return (
    <div className="summary-container">
      <h1 className="summary-header">Summary</h1>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="summary-content">
          <div className="summary-item">
            <p>Total Profit:</p>
            <p>${(totalProfit * 0.1).toFixed(2)}</p>
          </div>
          <div className="summary-item">
            <p>Total Users:</p>
            <p>{userCount}</p>
          </div>
          <div className="chart-container">
            <canvas id="myChart" width="400" height="200"></canvas>
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
