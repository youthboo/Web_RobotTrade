import React, { useState } from 'react'; // Import useState from React
import './TripStyles.css';
import TripData from './TripData';
import symbol1 from '../assets/gold.png';
import symbol2 from '../assets/eurusd.png';
import symbol3 from '../assets/usdjpy.png';
import Axios from 'axios';
import fileDownload from 'js-file-download';


function Backtest() {

  const [isGoldPopupOpen, setIsGoldPopupOpen] = useState(false);
  const [isEurusdPopupOpen, setIsEurusdPopupOpen] = useState(false);
  const [isUsdjpyPopupOpen, setIsUsdjpyPopupOpen] = useState(false);

  const download = (e) => {
    e.preventDefault();
    Axios({
      url: 'http://localhost:5555',
      method: 'GET',
      responseType: 'blob',
    }).then((res) => {
      console.log(res);
      fileDownload(res.data, 'Robot.mq4');
    });
  };

  const openGoldPopup = () => {
    setIsGoldPopupOpen(true);
  };

  const closeGoldPopup = () => {
    setIsGoldPopupOpen(false);
  };

  const openEurusdPopup = () => {
    setIsEurusdPopupOpen(true);
  };

  const closeEurusdPopup = () => {
    setIsEurusdPopupOpen(false);
  };

  const openUsdjpyPopup = () => {
    setIsUsdjpyPopupOpen(true);
  };

  const closeUsdjpyPopup = () => {
    setIsUsdjpyPopupOpen(false);
  };

  return (
    <div className='trip'>
      <h1>Robot Trade</h1>
      <p>You can choose bot!!!</p>
      <div className='tripcard'>
        <TripData
          image={symbol1}
          heading='GOLD'
          text='Winrate : 1% Drawdown : 99%'
        />
        <div className='button-container'>

          <button className='goldview' onClick={openGoldPopup}>view</button>
        </div>
        {isGoldPopupOpen && (
          <div className='popup'>
            <img src={symbol1} alt='GOLD' />
            <button onClick={closeGoldPopup}>Close</button>
          </div>
        )}
  
        <TripData
          image={symbol2}
          heading='EURUSD'
          text="Winrate : 1% Drawdown : 99% "
        />
        <div className='button-container'>

          <button className='eurusdview' onClick={openEurusdPopup}>view</button>
        </div>
        {isEurusdPopupOpen && (
          <div className='popup'>
            <img src={symbol2} alt='EURUSD' />
            <button onClick={closeEurusdPopup}>Close</button>
          </div>
        )}
  
        <TripData
          image={symbol3}
          heading='USDJPY'
          text='Winrate : 1% Drawdown : 99%'
        />
        <div className='button-container'>

          <button className='usdjpyview' onClick={openUsdjpyPopup}>view</button>
        </div>
        {isUsdjpyPopupOpen && (
          <div className='popup'>
            <img src={symbol3} alt='USDJPY' />
            <button onClick={closeUsdjpyPopup}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
  
  
}

export default Backtest;