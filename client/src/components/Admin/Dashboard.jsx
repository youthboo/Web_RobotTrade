import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Dashboard.css'; 
import DashboardIcon from '../../assets/dashboard.png'
import UserIcon from '../../assets/user.png'
import ModelIcon from '../../assets/model.png'

function Dash() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminClicked, setIsAdminClicked] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAdminClick = () => {
    setIsAdminClicked(!isAdminClicked);
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <div className="menu-btn" onClick={toggleSidebar}>
          <button className="hamburger-button"><i className="fas fa-bars"></i></button>
        </div>
        <div className="logo">
          <h1>Robot Trade</h1>
        </div>
        <div className="admin-btn">
          <button onClick={handleAdminClick}>Admin</button>
        </div>
      </div>
      {isOpen && (
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/admin/summary"> 
                <img src={DashboardIcon} alt="Dashboard Icon" className="icon" />
                Summary
              </Link>
            </li>
            <li>
              <Link to="/admin/userlist"> 
                <img src={UserIcon} alt="User Icon" className="icon" />
                User
              </Link>
            </li>
            <li>
              <Link to="/admin/model"> 
                <img src={ModelIcon} alt="Model Icon" className="icon" />
                Model
              </Link>
            </li>
          </ul>
        </div>
      )}
      {(isAdminClicked || isOpen) && (
        <div className="welcome-msg">Welcome, Admin</div>
      )}
    </div>
  );
}

export default Dash;

