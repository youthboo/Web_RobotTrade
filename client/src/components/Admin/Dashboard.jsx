import React, { useState } from 'react';
import './Dashboard.css'; 
import NavbarSidebar from './NavbarSidebar'; // นำเข้า NavbarSidebar ที่สร้างไว้

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
      <NavbarSidebar /> 
      <h2 className='welad'>Welcome admin!</h2>
    </div>
  );
}

export default Dash;
