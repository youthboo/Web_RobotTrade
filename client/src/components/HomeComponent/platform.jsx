import React from 'react';
import Pic1 from '../../assets/mt4pic.png';
import './platform.css';

const RobotTrade = () => {
  return (
    <div className="trading-container">
      <div className="trading-header">
        <h1>ยินดีต้อนรับสู่โลกการเทรด</h1>
        <h3>เปิดโอกาสการเทรดตลอด 24 ชั่วโมงด้วย AI Autobot</h3>
      </div>
      
      <div className="trading-content">
        <div className="content-left">
          <h1>Metatrader 4 : Platform ซื้อขาย forex ที่เป็นที่นิยมที่สุดของโลก</h1> <br/>
          <p>Metatrader 4 เป็นหนึ่งในแพลตฟอร์มการซื้อขายที่ได้รับความนิยมอย่างแพร่หลายในวงการการเงิน มีความสามารถในการวางแผนและดำเนินการซื้อขายอย่างมีประสิทธิภาพ เป็นเครื่องมือที่สำคัญสำหรับนักเทรดที่ต้องการผลการซื้อขายที่แม่นยำและรวดเร็ว</p>
        </div>
        <div className="content-right">
          <img src={Pic1} alt="Metatrader 4" />
        </div>
      </div>
    </div>
  );
};

export default RobotTrade;
