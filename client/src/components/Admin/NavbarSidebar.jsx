import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavbarSidebar.css';
import DashboardIcon from '../../assets/dashboard.png';
import UserIcon from '../../assets/user.png';
import ModelIcon from '../../assets/model.png';
import CheckIcon from '../../assets/approval.png';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function NavbarSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminClicked, setIsAdminClicked] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAdminClick = () => {
    setIsAdminClicked(!isAdminClicked);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been logged out.',
          icon: 'success',
          timer: 2000 
        }).then(() => {
          window.location = '/login';
        });
      }      
    });
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
                <img src={CheckIcon} alt="Model Icon" className="icon" />
                Checklist
              </Link>
            </li>
            <li>
              <Link to="/admin/updatemodel"> 
                <img src={ModelIcon} alt="Model Icon" className="icon" />
                UpModel
              </Link>
            </li>
            <li>
            <button className="logout-button" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="icon"/>
              Logout
            </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavbarSidebar;
