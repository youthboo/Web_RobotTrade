import React, { useState } from 'react';
import './Dashboard.css'; 
import NavbarSidebar from './NavbarSidebar'; 

function Dash() {

  return (
    <div className="dashboard">
      <NavbarSidebar /> 
      <h2 className='welad'>Welcome admin!</h2>
    </div>
  );
}

export default Dash;
