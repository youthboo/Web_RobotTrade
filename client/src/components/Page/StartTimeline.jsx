import React from 'react';
import './StartTimeline.css';

const Timeline = () => {
  return (
    <div className="timeline">
      <h1>ขั้นตอนการใช้งาน</h1>
      <div className="timeline-steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>ปรับแต่ง Parameters</h3>
            <p>ปรับแต่ง Lot size ตามที่คุณต้องการและกดเพื่อ download ไฟล์ .set</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Download Bot EA ของคู่เงินที่คุณต้องการ</h3>
            <p>เลือกคู่เงินที่คุณต้องการ จากนั้น click เพื่อ download ไฟล์บอท</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>เปิด Metatrader 4</h3>
            <p>เปิด MT4 จากนั้นลากไฟล์บอทที่ download ไว้แล้วมาใส่ในคู่เงินที่เราเลือกเทรด</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;