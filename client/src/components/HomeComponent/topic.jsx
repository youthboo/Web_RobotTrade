import React from 'react';
import Pic1 from '../../assets/mlbot.png';
import './topic.css';

const RobotTrade = () => {
  return (
    <div className="topic-container">
      
      <div className="topic-content">
        <div className="content-left-topic">
          <h1>ให้โรบอทเทรด AI ทำงานแทนคุณ 24 ชั่วโมง</h1> <br/>
          <p>Autobot ถูกออกแบบมาเพื่อเป็นเครื่องมือการเทรดอัตโนมัติ 100% ด้วยโรบอทเทรดที่สามารถประมวลผลและตัดสินใจเร็วกว่า ทำให้จุดเข้าและจุดออกของออเดอร์ได้ค่อนข้างแม่นยำ และเพิ่มโอกาสในการทำกำไรมากยิ่งขึ้น</p>
        </div>
        <div className="content-right-topic">
          <img src={Pic1} alt="Metatrader 4" />
        </div>
      </div>
    </div>
  );
};

export default RobotTrade;
