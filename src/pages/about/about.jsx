import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';

import SectionOne from './about-sections/section-one';
import SectionTwo from './about-sections/section-two';
import SectionThree from './about-sections/section-three';
import SectionFour from './about-sections/section-four';
import SectionFive from './about-sections/section-five';
import SectionSix from './about-sections/section-six';

const About = () => {
    return (
        <>
            <PageImageHeader heading='About Us' />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
        </>
    );;
};

export default About;