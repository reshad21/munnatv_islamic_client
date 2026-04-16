import React from 'react';
import HeroSection from '../_components/HeroSection';
import AboutUs from './_components/AboutUs';
import OtherAboutUs from './_components/OtherAboutUs';
import FIvePillarOfIslam from './_components/FIvePillarOfIslam';

const AbouUspage = () => {
    return (
        <div>
            <HeroSection title="About Us" subtitle="About Us" />
            <AboutUs/>
            <OtherAboutUs/>
            <FIvePillarOfIslam/>
        </div>
    );
};

export default AbouUspage;