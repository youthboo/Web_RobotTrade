import React from 'react';
import { Link } from 'react-router-dom'; 
import Pic1 from '../../assets/Start.jpg';
import './StartHere.css';

const StartHere = () => {
  return (
    <div className="StartHereContainer">
      <h1 className="StartHereTitle">มาร่วมเดินทางไปกับเรา</h1>
      <p className="StartHereDescription">คุณสามารถมั่นใจได้ว่าเราจะนำคุณผ่านประสบการณ์การเทรดที่ดีที่สุดที่เคยมีมา ด้วยความเร็วในการออกคำสั่งที่รวดเร็วและทันใจ</p>
      <Link to="/signup"> 
        <button className="StartHereButton">Start Trading Now</button>
      </Link>
      <img src={Pic1} alt="Welcome" className="StartHereImage" />    
    </div>
  );
};

export default StartHere;

