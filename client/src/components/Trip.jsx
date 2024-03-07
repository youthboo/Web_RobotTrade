import './TripStyles.css'
import TripData from './TripData';
import symbol1 from '../assets/gold.png'
import symbol2 from '../assets/eurusd.png'
import symbol3 from '../assets/usdjpy.png'
import Axios from "axios";
import fileDowload from "js-file-download";


function Trip() {

    const download=(e)=>{
        e.preventDefault()
        Axios({url:"http://localhost:5555",
        method:"GET",
        responseType:"blob"
    }).then((res)=>{
        console.log(res);
        fileDowload(res.data,"Robot.mq4")
    })
    }
    return(
        <div className='trip'>
            <h1>Robot Trade</h1>
            <p>You can choose bot!!!</p>
            <div className='tripcard'>
                <TripData 
                image={symbol1}
                heading='GOLD'
                text='Winrate : Drawdown : '
                
                />
                <button className="goldButton" onClick={(e) => download(e, "Robot_GOLD")}>GOLD</button>
                <TripData 
                image={symbol2}
                heading='EURUSD'
                text="Winrate : Drawdown : "
                />
                <button className="eurusdButton" onClick={(e) => download(e, "Robot_EURUSD")}>EURUSD</button>
                <TripData 
                image={symbol3}
                heading='USDJPY'
                text='Winrate : Drawdown : '
                />
                <button className="usdjpyButton" onClick={(e) => download(e, "Robot_USDJPY")}>USDJPY</button>

            </div>
        </div>
    )
}


export default Trip;

