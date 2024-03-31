import React, { useState } from 'react';
import './TripStyles.css';
import TripData from './TripData';
import Goldpic2 from '../../assets/backpqy.jpg'
import Back1 from '../../assets/goldback.jpg'
import Back2 from '../../assets/eurusdback.jpg'
import Back3 from '../../assets/usdjpyback.jpg'
import symbol2 from '../../assets/eurusd.png';
import symbol3 from '../../assets/usdjpy.png';
import Num2 from '../../assets/num2.png';
import Axios from 'axios';
import fileDownload from 'js-file-download';
import './Trip.css';

function Trip() {
  const [isGoldPopupOpen, setIsGoldPopupOpen] = useState(false);
  const [isEurusdPopupOpen, setIsEurusdPopupOpen] = useState(false);
  const [isUsdjpyPopupOpen, setIsUsdjpyPopupOpen] = useState(false);

  const downloadFile = (currencyPair) => {
    Axios({
      url: `http://localhost:5555/api/download/${currencyPair}`,
      method: 'GET',
      responseType: 'blob'
    }).then((res) => {
      console.log(res);
      fileDownload(res.data, `Bot_${currencyPair}.ex4`);
    }).catch((error) => {
      console.error('Error downloading file:', error);
    });
  };

  const openPopup = (symbol) => {
    switch (symbol) {
      case 'GOLD':
        setIsGoldPopupOpen(true);
        break;
      case 'EURUSD':
        setIsEurusdPopupOpen(true);
        break;
      case 'USDJPY':
        setIsUsdjpyPopupOpen(true);
        break;
      default:
        break;
    }
  };

  const closePopup = (symbol) => {
    switch (symbol) {
      case 'GOLD':
        setIsGoldPopupOpen(false);
        break;
      case 'EURUSD':
        setIsEurusdPopupOpen(false);
        break;
      case 'USDJPY':
        setIsUsdjpyPopupOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="trip">
      <img src={Num2} alt="Number two" className="number-two" />
      <h2>Download Bot EA ของคู่เงินที่คุณต้องการ</h2>
      <p>วิธีการติดตั้ง: เลือกคู่เงินที่คุณต้องการ จากนั้น click ที่ชื่อคู่เงิน ไฟล์ bot.ex4 จะถูก download และติดตั้งบนเครื่องของคุณ  <br /> *หมายเหตุ: คุณสามารถ download กี่คู่เงินก็ได้ตามที่คุณต้องการ</p>
      <div className="tripcard">
      <TripData
        image={Goldpic2}
        heading='GOLD'
        text={(
          <>
            Winrate: 87.45% <br />
            Drawdown: 18.41% <br />
            Period: 1 Years
          </>
        )}
      />
        <div className="button-container">
        <button className="goldButton" onClick={() => downloadFile('GOLD')}>
          GOLD
        </button>
          <button className="goldview" onClick={() => openPopup('GOLD')}>
            view
          </button>
        </div>
        {isGoldPopupOpen && (
          <div className="popup">
            <img src={Back1} alt="GOLD" />
            <button onClick={() => closePopup('GOLD')}>Close</button>
          </div>
        )}

      <TripData
        image={symbol2}
        heading='EURUSD'
        text={(
          <>
            Winrate: 74.03% <br />
            Drawdown: 31.11% <br />
            Period: 3 Years
          </>
        )}
      />
        <div className="button-container">
        <button className="eurusdButton" onClick={() => downloadFile('EURUSD')}>
          EURUSD
        </button>
          <button className="eurusdview" onClick={() => openPopup('EURUSD')}>
            view
          </button>
        </div>
        {isEurusdPopupOpen && (
          <div className="popup">
            <img src={Back3} alt="EURUSD" />
            <button onClick={() => closePopup('EURUSD')}>Close</button>
          </div>
        )}

      <TripData
        image={symbol3}
        heading='USDJPY'
        text={(
          <>
            Winrate : 76.24% <br />
            Drawdown : 49.04% <br />
            Period: 4 Years
          </>
        )}
      />
        <div className="button-container">
          <button className="usdjpyButton" onClick={() => downloadFile('USDJPY')}>
          USDJPY
          </button>
          <button className="usdjpyview" onClick={() => openPopup('USDJPY')}>
            view
          </button>
        </div>
        {isUsdjpyPopupOpen && (
          <div className="popup">
            <img src={Back3} alt="USDJPY" />
            <button onClick={() => closePopup('USDJPY')}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Trip;