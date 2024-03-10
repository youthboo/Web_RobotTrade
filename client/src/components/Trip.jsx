import React, { useState } from 'react';
import './TripStyles.css';
import TripData from './TripData';
import symbol1 from '../assets/gold.png';
import symbol2 from '../assets/eurusd.png';
import symbol3 from '../assets/usdjpy.png';
import Axios from 'axios';
import fileDownload from 'js-file-download';
import './Trip.css';

function Trip() {
  const [isGoldPopupOpen, setIsGoldPopupOpen] = useState(false);
  const [isEurusdPopupOpen, setIsEurusdPopupOpen] = useState(false);
  const [isUsdjpyPopupOpen, setIsUsdjpyPopupOpen] = useState(false);
  const [lotSize, setLotSize] = useState(0.1);

  const handleLotSizeChange = (newLotSize) => {
    setLotSize(newLotSize);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedLotSize = lotSize.toFixed(8);
    const fileContent = `LotSize=${formattedLotSize}`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    fileDownload(blob, 'Robot.set');
  };

  const download = (symbol) => {
    Axios({
      url: `http://localhost:5555/${symbol}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res) => {
      console.log(res);
      fileDownload(res.data, `Robot_${symbol}.mq4`);
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
      <h1>Robot Trade</h1>
      <p>คุณสามารถปรับแต่ง Lotsize ได้จากด้านล่าง</p>
      <div className="tripcard">
        <TripData image={symbol1} heading="GOLD" text="Winrate : 1% Drawdown : 99%" />
        <div className="button-container">
          <button className="goldButton" onClick={() => download('GOLD')}>
            GOLD
          </button>
          <button className="goldview" onClick={() => openPopup('GOLD')}>
            view
          </button>
        </div>
        {isGoldPopupOpen && (
          <div className="popup">
            <img src={symbol1} alt="GOLD" />
            <button onClick={() => closePopup('GOLD')}>Close</button>
          </div>
        )}

        <TripData image={symbol2} heading="EURUSD" text="Winrate : 1% Drawdown : 99%" />
        <div className="button-container">
          <button className="eurusdButton" onClick={() => download('EURUSD')}>
            EURUSD
          </button>
          <button className="eurusdview" onClick={() => openPopup('EURUSD')}>
            view
          </button>
        </div>
        {isEurusdPopupOpen && (
          <div className="popup">
            <img src={symbol2} alt="EURUSD" />
            <button onClick={() => closePopup('EURUSD')}>Close</button>
          </div>
        )}

        <TripData image={symbol3} heading="USDJPY" text="Winrate : 1% Drawdown : 99%" />
        <div className="button-container">
          <button className="usdjpyButton" onClick={() => download('USDJPY')}>
            USDJPY
          </button>
          <button className="usdjpyview" onClick={() => openPopup('USDJPY')}>
            view
          </button>
        </div>
        {isUsdjpyPopupOpen && (
          <div className="popup">
            <img src={symbol3} alt="USDJPY" />
            <button onClick={() => closePopup('USDJPY')}>Close</button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Lot Size:
          <input
            type="number"
            value={lotSize}
            onChange={(e) => handleLotSizeChange(parseFloat(e.target.value))}
            step="0.01"
          />
        </label>
        
        <button type="submit">Dowload</button>
      </form>
    </div>
  );
}

export default Trip;