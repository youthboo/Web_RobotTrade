import React, { useState } from 'react'; 
import TripData from '../Page/TripData';
import Goldpic2 from '../../assets/backpqy.jpg'
import Back1 from '../../assets/goldback.jpg'
import Back2 from '../../assets/eurusdback.jpg'
import Back3 from '../../assets/usdjpyback.jpg'
import symbol2 from '../../assets/eurusd.png';
import symbol3 from '../../assets/usdjpy.png';
import Axios from 'axios';
import fileDownload from 'js-file-download';
import './Backtest.css';

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
      <h1>Resualt of Backtest</h1>
      <p>You can see result of backtest!!!</p>
      <div className='tripcard'>
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
        <div className='button-container'>
          <button className='goldview' onClick={openGoldPopup}>view</button>
        </div>
        {isGoldPopupOpen && (
          <div className='popup'>
            <img src={Back1} alt='GOLD' />
            <button onClick={closeGoldPopup}>Close</button>
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
        <div className='button-container'>
          <button className='eurusdview' onClick={openEurusdPopup}>view</button>
        </div>
        {isEurusdPopupOpen && (
          <div className='popup'>
            <img src={Back2} alt='EURUSD' />
            <button onClick={closeEurusdPopup}>Close</button>
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
        <div className='button-container'>
          <button className='usdjpyview' onClick={openUsdjpyPopup}>view</button>
        </div>
        {isUsdjpyPopupOpen && (
          <div className='popup'>
            <img src={Back3} alt='USDJPY' />
            <button onClick={closeUsdjpyPopup}>Close</button>
          </div>
        )}
      </div>
    </div>
  ); 
}

export default Backtest;