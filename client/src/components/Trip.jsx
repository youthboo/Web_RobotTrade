import React, { useState } from 'react'; // Import useState from React
import './TripStyles.css';
import TripData from './TripData';
import symbol1 from '../assets/gold.png';
import symbol2 from '../assets/eurusd.png';
import symbol3 from '../assets/usdjpy.png';
import Axios from 'axios';
import fileDownload from 'js-file-download';

function Trip() {

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
          text='Winrate : Drawdown : '
        />
        <button className='goldview' onClick={openGoldPopup}>view</button>
        {isGoldPopupOpen && (
          <div className='popup'>
            <img src={symbol1} alt='GOLD' />
            <button onClick={closeGoldPopup}>Close</button>
          </div>
        )}
        <button className='goldButton' onClick={(e) => download(e, 'Robot_GOLD')}>
          GOLD
        </button>
        <TripData
          image={symbol2}
          heading='EURUSD'
          text="Winrate : Drawdown : "
        />
        <button className='eurusdview' onClick={openEurusdPopup}>view</button>
        {isEurusdPopupOpen && (
          <div className='popup'>
            <img src={symbol2} alt='EURUSD' />
            <button onClick={closeEurusdPopup}>Close</button>
          </div>
        )}
        <button className='eurusdButton' onClick={(e) => download(e, 'Robot_EURUSD')}>
          EURUSD
        </button>
        <TripData
          image={symbol3}
          heading='USDJPY'
          text='Winrate : Drawdown : '
        />
        <button className='usdjpyview' onClick={openUsdjpyPopup}>view</button>
        {isUsdjpyPopupOpen && (
          <div className='popup'>
            <img src={symbol3} alt='USDJPY' />
            <button onClick={closeUsdjpyPopup}>Close</button>
          </div>
        )}
        <button className='usdjpyButton' onClick={(e) => download(e, 'Robot_USDJPY')}>
          USDJPY
        </button>
      </div>
    </div>
  );
}

export default Trip;