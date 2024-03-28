import React, { useState } from 'react';
import fileDownload from 'js-file-download';
import Num1 from '../../assets/num1.png';
import './LotsizeForm.css';

const LotSizeForm = () => {
  const [lotSize, setLotSize] = useState(0.1);

  const handleLotSizeChange = (e) => {
    setLotSize(parseFloat(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedLotSize = lotSize.toFixed(8);
    const fileContent = `LotSize=${formattedLotSize}`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    fileDownload(blob, 'Lotsize_Bot.set');
  };

  return (
    <form className="lot-size-form" onSubmit={handleSubmit}>
      <img src={Num1} alt="Number one" className="number-one" />
      <h2>ปรับแต่ง Parameters</h2>
      <p>วิธีการติดตั้ง: เลือกขนาด Lot Size ที่คุณต้องการใช้กับ Bot EA ของคุณ จากนั้นกด Download <br/> ไฟล์ Lotsize_Bot.set จะถูกติดตั้งบนเครื่องของคุณ</p>
      <label>
        Lot Size : <br />
        <input
          type="number"
          value={lotSize}
          onChange={handleLotSizeChange}
          step="0.01"
          className="input-field"
        />
      </label>
      <button type="submit">Download</button>
    </form>
  );
};

export default LotSizeForm;
