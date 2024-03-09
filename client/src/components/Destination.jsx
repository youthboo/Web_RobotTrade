import Pict1 from '../assets/eurusd.png'
import Moutain2 from '../assets/2.jpg'
import Moutain3 from '../assets/5.jpg'
import Moutain4 from '../assets/8.jpg'
import './DestinationStyles.css'
import DestinationData from './DestinationData'

const Destination = () => {
    return(
        <div className="destination">
            <h1>Popular Symbols</h1>
            <p>To see a symbols</p>

            <DestinationData 
            className='first-des'

            heading = 'GOLD : Exploring the Fascinating World of Gold Trading'
            text = "Gold trading remains an intriguing prospect for investors worldwide due to its historical significance, diversification benefits, liquidity, market volatility, innovative trading instruments, and long-term value preservation. Whether you're a seasoned trader or a novice investor, exploring the world of gold trading can be both rewarding and enlightening."
            img1={Pict1}
            img2={Pict1}
            />

            <DestinationData 
            className='first-des-reverse'

            heading = 'EURUSD : Unlocking the Potential of EURUSD Trading'
            text = "EURUSD trading offers a plethora of opportunities for investors seeking exposure to the dynamic world of forex markets. With its high liquidity, market volatility, global economic impact, technical analysis opportunities, diversification potential, and 24-hour accessibility, EURUSD remains a favored choice among traders of all levels of expertise. Whether you're a seasoned professional or a novice investor, exploring the potential of EURUSD trading can lead to exciting possibilities in the realm of forex investing."
            img1={Pict1}
            img2={Pict1}
            />

        
        </div>
    )
}

export default Destination;