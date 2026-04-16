import React from 'react';
import HeroSection from '../_components/HeroSection';
import ContactHeader from './_components/ContactHeader';
import ContactMainSection from './_components/ContactMainSection';

const ContactUsPage = () => {
    return (
        <div>
            <HeroSection title="Contact Us" subtitle="Contact Us" />
            <ContactHeader/>
            <ContactMainSection/>
        </div>
    );
};

export default ContactUsPage;