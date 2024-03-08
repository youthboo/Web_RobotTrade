import Navbar from '../components/Navbar'
import ContactImage from '../assets/night.jpg'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'

function Payment () {
    return(
        <>
            <Navbar />
            <Hero 
                cName = 'hero-mid'
                heroImg = {ContactImage}
                title= 'Payment'
                buttonText= "Let go Payment"
                url = '/payment/userPayment' 
                btnClass = 'show'
            />
            <ContactForm />
            <Footer />
        </>
    )

}

export default Payment;
