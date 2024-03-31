import React from 'react';
import './PaymentCondition.css'
import Icon1 from '../../assets/electronic-ticket.png'
import Icon2 from '../../assets/online-payment.png'
import Icon3 from '../../assets/cashless-payment.png'

const PaymentCondition = () => {
  return (
    <div className="condition-container">
      <h1 className="title">เงื่อนไขการชำระเงิน</h1>
      <p className="description">
        ทางเราจะมีการเรียกเก็บค่า Commission fee จากผู้ใช้บริการทุกวันที่ 1 ของทุกเดือน โดยอัตราการคิดค่าบริการของเราอยู่ที่ 10% ของกำไรทั้งหมดในเดือนนั้นของผู้ใช้ เช่น ในเดือนมกราคม ผู้ใช้ได้กำไรจากการใช้ Bot EA ของเราทั้งสิ้น 100 บาท ผู้ใช้ก็จะต้องจ่ายค่า commission ให้เราเป็นจำนวน 10 บาท และหากในเดือนนั้นผู้ใช้ไม่ได้กำไร ทางเราก็จะไม่มีการคิดค่าบริการในเดือนนั้น <br /> **หมายเหตุ: ผู้ใช้บริการจะต้องชำระเงินภายใน 2 สัปดาห์ของทุกต้นเดือนใหม่ หากผู้ใช้บริการไม่ยอมชำระเงิน <br />ทางเราขอสงวนวิทธิ์การใช้ Bot EA ทุกบอทในเว็บของเรา
      </p>
      <div className="list">
        <div className="list-item">
          <img src={Icon1} alt="Credit Card Icon" className="icon-pay" />
          <h2 className="title">วิธีเช็คจำนวนค่า commission</h2>
          <p className="description">
            ผู้ใช้บริการสามารถเช็คค่า commission ได้ทุกวันที่ 1 ของเดือนใหม่ ในหน้า Payment โดยเมื่อผู้ใช้กรอกเลข Port Number ไป จะมีการแจ้งเตือนค่า commission ที่ต้องจ่ายของเดือนที่แล้วขึ้นมาก
          </p>
        </div>
        <div className="list-item">
          <img src={Icon2} alt="Credit Card Icon" className="icon-pay" />
          <h2 className="title">ขั้นตอนการชำระเงิน</h2>
          <p className="description">
            ผู้ใช้บริการสามารถชำระเงินง่ายๆด้วยการไปที่หน้า Payment จากนั้นกรอก Email ที่ท่านได้สมัครไว้กับ Website ของเราเพื่อดำเนินการชำระเงิน โดยเมื่อกรอก Email เสร็จให้กดปุ่ม Pay จากนั้นระบบจะพาท่านไปสู่หน้าชำระเงินด้วย Promtpay
          </p>
        </div>
        <div className="list-item">
          <img src={Icon3} alt="Credit Card Icon" className="icon-pay" />
          <h2 className="title">ชำระเงินผ่าน Promptpay</h2>
          <p className="description">
            การชำระเงินอย่างง่ายดายด้วย Promtpay ผู้ใช้บริการสามารถสแกนจ่ายเงินผ่าน QR Promtpay ได้เลย จากนั้นยอดท่านต้องจ่ายจะแสดงในแอปธนาคารของท่านทันที
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCondition;
