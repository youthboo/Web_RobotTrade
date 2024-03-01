import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HeroImage from '../assets/background_home.jpg'
import Destination from '../components/Destination'
import Trip from '../components/Trip'
import Footer from '../components/Footer'

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
            <Trip />
            <Footer />
        </>
    )

}

export default Home;