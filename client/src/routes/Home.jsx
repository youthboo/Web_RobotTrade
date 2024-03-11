import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HeroImage from '../assets/background_home.jpg'
import Destination from '../components/Destination'
import Footer from '../components/Footer'
import Backtest from '../components/Backtest'

function Home () {
    return(
        <>
            <Navbar />
            <Hero 
                cName = 'hero'
                heroImg = {HeroImage}
                title = 'Welcome, to my Robot Trade'
                text = 'Let our bot assit you!'
                buttonText = 'Try Demo'
                url = '/'
                btnClass = 'show'
            />
            <Destination />
            <Backtest />
            <Footer />
        </>
    )

}

export default Home;