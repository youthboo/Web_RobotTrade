import Navbar from '../components/Navbar'
import AboutImage from '../assets/back1.jpg'
import Hero from '../components/Hero.jsx';
import Footer from '../components/Footer'
import AboutUs from '../components/AboutUs'

function About () {
    return(
        <>
        <Navbar />
        <Hero 
        cName = 'hero-mid'
            heroImg = {AboutImage}
            title = 'Bot AI'
            text = 'Let your bot learn and decide by itself.'
            buttonText = 'Start Trading'
            url = '/trade/botConnect' 
            btnClass = 'show'
        />
        <AboutUs />
        <Footer />
        </>
    )

}

export default About;