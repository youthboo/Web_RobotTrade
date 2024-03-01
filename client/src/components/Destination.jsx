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

            heading = 'GOLD'
            text = "One of the most iconic views in Luzon, Mt. Taal boasts a volcano inside a lake inside an island. If you fancy a closer look, the hikeup to the crater is a mere 45 minutes, and is easy enough for beginners. Guides will assit you most of the way, and you'll see the peculiar environment found on an active volcano, including volcanic rocks and stream vents. The hike can be dusty and hot, so plan for an early morning trip, and then unwind with some bulalo before heading back home!"
            img1={Pict1}
            img2={Pict1}
            />

            <DestinationData 
            className='first-des-reverse'

            heading = 'EURUSD'
            text = "If you're looking for a hike that's a little more challenging but still good for a beginner mountaineer, check out Mt. Daguldul in San Juan, Batangas. You'll start your hike from the beach and pass through tropical forest, different rock formations, and small streams. There's a small store halfway up the trail where you can take a break and drink buko juice, and though the summit itself may not have the best view, the breeze is fantastic. Once you've made it back down, head straight to the beach for a refreshing, well-deserved swim."
            img1={Pict1}
            img2={Pict1}
            />

        
        </div>
    )
}

export default Destination;