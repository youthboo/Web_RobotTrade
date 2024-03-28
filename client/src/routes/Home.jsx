import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HeroImage from '../assets/background_home.jpg'
import Destination from '../components/HomeComponent/Destination'
import Footer from '../components/Footer'
import Backtest from '../components/HomeComponent/Backtest'
import Why from '../components/HomeComponent/why'
import Who from '../components/HomeComponent/who'
import Platform from '../components/HomeComponent/platform'
import Topic from '../components/HomeComponent/topic'
import Topic2 from '../components/HomeComponent/topic2'

function Home () {
    return(
        <>
            <Navbar />
            <Hero 
                cName = 'hero'
                heroImg = {HeroImage}
                title = 'Welcome, to my Robot Trade'
                text = 'Let our bot assit you!'
                buttonText = 'Start Now'
                url = '/signup'
                btnClass = 'show'
            />
            <Platform />
            <Topic2 />
            <Topic />
            <Why />
            <Who />
            
            
            <Backtest />
            <Footer />
        </>
    )

}

export default Home;