import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ServiceImage from '../assets/portpic.jpg';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';

function Portfolio() {

    return (
        <>
            <Navbar />
            <Hero
                cName='hero-mid'
                heroImg={ServiceImage}
                title='Portfolio'
                buttonText="Let's your Portfolio"
                url = '/portfolio/userPort'
                /*text = 'Choose Your Favorite Destination.'*/
                btnClass='show'
            />
            <AboutUs />
            <Footer />
        </>
    );
}

export default Portfolio;
