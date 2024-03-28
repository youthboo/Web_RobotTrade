import React from 'react';
import Pic1 from '../../assets/deep-learning.png';
import './topic2.css';

const RobotTrade = () => {
  return (
    <div className="topic2-container">
      
      <div className="topic2-content">
        <div className="content-left-topic2">
          <h1>ปลดล็อคศักยภาพในการเทรดด้วย AI LSTM</h1> <br/>
          <p>เพิ่มความสำคัญของการเทรดด้วยการใช้เทคโนโลยี Artificial Intelligence (AI) และโมเดล Deep Learning ระดับยอดเยี่ยม Long Short-Term Memory (LSTM) Neural Networks เพื่อช่วยในการวิเคราะห์และตัดสินใจการเทรด โดยบอทที่ใช้ LSTM สามารถทำนายทิศทางของราคาได้อย่างแม่นยำ และปรับใช้ในการเปิด-ปิดออเดอร์ในเวลาที่เหมาะสม ด้วยความเข้าถึงตลาดตลอด 24 ชั่วโมง นักลงทุนทั้งมืออาชีพและมือใหม่สามารถมั่นใจในการตัดสินใจการเทรดของตนเองได้ มาร่วมประสบการณ์การเทรดที่แตกต่างด้วยเทคโนโลยี AI กับเราวันนี้!</p>
        </div>
        <div className="content-right-topic2">
          <img src={Pic1} alt="Metatrader 4" />
        </div>
      </div>
    </div>
  );
};

export default RobotTrade;
