import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavbarSidebar.css';
import DashboardIcon from '../../assets/dashboard.png';
import UserIcon from '../../assets/user.png';
import ModelIcon from '../../assets/model.png';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function NavbarSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminClicked, setIsAdminClicked] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAdminClick = () => {
    setIsAdminClicked(!isAdminClicked);
  };

  return (
    <div>
      <div className="navbar">
        <div className="menu-btn" onClick={toggleSidebar}>
          <button className="hamburger-button">
            <i className="fas fa-bars"></i>
          </button>
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
          <button className="close-button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
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
                Checklist
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FontAwesomeIcon icon={faSignOutAlt} className="icon"/>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavbarSidebar;
