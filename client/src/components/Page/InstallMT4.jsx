import React from 'react';
import './InstallMT4.css';
import Num3 from '../../assets/num3.png';
import InstallImage1 from '../../assets/manual1.jpg';
import InstallImage2 from '../../assets/manual2.jpg';
import InstallImage3 from '../../assets/manual3.jpg';
import InstallImage4 from '../../assets/manual4.jpg';
import InstallImage5 from '../../assets/manual5.jpg';
import InstallImage6 from '../../assets/manual6.jpg';

const InstallMT4 = () => {
  return (
    <div className='user-manual'>
      <div className="install-bg">
        <img src={Num3} alt="Number three" className="number-three" />
        <h2>วิธีการติดตั้งใน Metatrader 4</h2>
        <div className="install-steps">
          <div className="install-step">
            <img src={InstallImage1} alt="Install Step 1" />
            <p>1. Copy ไฟล์ Bot.ex4 ไปวางที่ MQL4/Experts</p>
          </div>

          <div className="install-step">
            <img src={InstallImage2} alt="Install Step 2" />
            <p>2. จากนั้นกลับไปที่ Metatrader 4 ดูที่ Navigator ด้านซ้าย Click Experts จะพบว่ามีไฟล์ Bot.ex4 ที่มีจุดสีเทาอยู่</p>
          </div>

          <div className="install-step">
            <img src={InstallImage3} alt="Install Step 3" />
            <p>3. ลากไฟล์ Bot.ex4 ลงมาใน Chart Windows ของคู่เงินที่สอดคล้องกับบอทที่เราดาวน์โหลดมา จะพบว่ามีหน้าต่างของ Bot แสดงขึ้นมา จากนั้นเลือกที่ input คุณจะเห็นปุ่ม Load ให้คุณ click ที่ Load</p>
          </div>

          <div className="install-step">
            <img src={InstallImage4} alt="Install Step 4" />
            <p>4. เลือกไฟล์ .set ที่คุณได้ทำการปรับแต่งพารามิเตอร์และดาาวน์โหลดมา</p>
          </div>

          <div className="install-step">
            <img src={InstallImage5} alt="Install Step 5" />
            <p>5. จะเห็นว่าช่อง Lotsize มีค่าเปลี่ยนไปตามขนาดที่เราได้ตั้งค่าพารามิเตอร์ไว้ (ในที่นี้เราตั้งค่าไว้ 0.5) จากนั้น click ที่ปุ่ม OK</p>
          </div>

          <div className="install-step">
            <img src={InstallImage6} alt="Install Step 6" />
            <p>6. จะเห็นได้ว่าชื่อไฟล์ที่คุณได้ดาวน์โหลดมาจะแสดงอยู่มุมบนด้านขวาของ Chart Windows และเมื่อ click ที่ Expert ใน Terminal ก็จะเห็นว่ามีการรันค่า Predict เกิดขึ้น แสดงว่า Bot ได้เริ่ม run แล้ว เมื่อ Bot run เรียบร้อยคณสามารถเปิดทิ้งไว้ได้เลย! </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallMT4;