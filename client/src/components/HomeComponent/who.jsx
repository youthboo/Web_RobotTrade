import React from 'react';
import Icon1 from '../../assets/time.png';
import Icon2 from '../../assets/new-employee.png';
import Icon3 from '../../assets/budget.png';
import './who.css'

const RobotTrade = () => {
  return (
    <div className="trade-container">
      <div className="trade-header">
        <h1>Robot Trade เหมาะกับใคร?</h1>
      </div>

      <div className="trade-content">
        <div className="trade-feature">
          <img src={Icon2} alt="Award" className="trade-icon" />
          <h2>สำหรับมือใหม่</h2>
          <p>ต้องการอิสรภาพทางการเงินแต่
            เริ่มต้นไม่ถูกและไม่เข้าใจตลาด</p>
        </div>

        <div className="trade-feature">
          <img src={Icon1} alt="Withdraw" className="trade-icon" />
          <h2>ผู้ที่ไม่มีเวลา</h2>
          <p>ไม่มีเวลาในการเทรดและไม่สามารถ
            เฝ้ากราฟได้ตลอดเวลา</p>
        </div>

        <div className="trade-feature">
          <img src={Icon3} alt="Support" className="trade-icon" />
          <h2>Passive Income</h2>
          <p>ผู้ที่ต้องการสร้าง Passive Income
            ที่มีผลตอบแทนอย่างสม่ำเสมอ</p>
        </div>
      </div>
    </div>
  );
};

export default RobotTrade;
