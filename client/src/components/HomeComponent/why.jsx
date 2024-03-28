import React from 'react';
import Icon1 from '../../assets/approval.png';
import Icon2 from '../../assets/model.png';
import Icon3 from '../../assets/motivation.png';
import './why.css'

const RobotTrade = () => {
  return (
    <div className="iq-option">
      <div className="header">
        <h1>ทำไมต้องใช้ Robot Trade?</h1>
      </div>

      <div className="content">
        <div className="feature">
          <img src={Icon2} alt="Award" />
          <h2>การทำนายที่แม่นยำ</h2>
          <p>เพิ่มโอกาสในการลงทุนด้วยการทำนายที่แม่นยำจากโมเดล LSTM แห่งความชำนาญทางด้าน Machine Learning ที่ได้รับการพัฒนาขึ้นเพื่อช่วยคุณตัดสินใจการลงทุนอย่างมั่นใจ</p>
        </div>

        <div className="feature">
          <img src={Icon1} alt="Withdraw" />
          <h2>การเรียนรู้และปรับปรุงตามเวลา</h2>
          <p>โมเดล Machine Learning ที่มีการเรียนรู้และปรับปรุงตามเวลา เพื่อให้คุณได้รับข้อมูลที่ทันสมัยและการวิเคราะห์ที่มีประสิทธิภาพอยู่เสมอ</p>
        </div>

        <div className="feature">
          <img src={Icon3} alt="Support" />
          <h2>ความสะดวกสบายในการใช้งาน</h2>
          <p>ระบบที่ใช้งานง่าย สะดวก และเข้าใจได้ง่าย ทำให้การลงทุนเป็นเรื่องที่มีความสะดวกสบายมากยิ่งขึ้น</p>
        </div>
      </div>
    </div>
  );
};

export default RobotTrade;
