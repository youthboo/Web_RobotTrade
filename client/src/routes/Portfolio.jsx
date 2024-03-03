import Navbar from '../components/Navbar'
import ServiceImage from '../assets/portpic.jpg'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Trip from '../components/Trip'

function Service () {
    return(
        <>
        <Navbar />
        <Hero 
            cName = 'hero-mid'
            heroImg = {ServiceImage}
            title = 'Portfolio'
            /*text = 'Choose Your Favorite Destination.'
            buttonText = 'Travel Plan'
            url = '/' */
            btnClass = 'hide'
        />
        <Trip />
        <Footer />
        </>
    )

}

export default Service;