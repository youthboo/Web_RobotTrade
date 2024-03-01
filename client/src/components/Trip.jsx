import './TripStyles.css'
import TripData from './TripData';
import Trip1 from '../assets/eurusd.png'


function Trip() {
    return(
        <div className='trip'>
            <h1>Backtest Result</h1>
            <p>You can see the backtest result here!</p>
            <div className='tripcard'>
                <TripData 
                image={Trip1}
                heading='EURUDS'
                text='Winrate : Drawdown : '
                />

                <TripData 
                image={Trip1}
                heading='GOLD'
                text="Winrate : Drawdown : "
                />

                <TripData 
                image={Trip1}
                heading='SILVER'
                text='Winrate : Drawdown : '
                />

            </div>
        </div>
    )
}


export default Trip;

