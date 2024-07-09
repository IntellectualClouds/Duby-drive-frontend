import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';

import SectionOne from './desert-safari-sections/section-one';
import SectionTwo from './desert-safari-sections/section-two';
import SectionThree from './desert-safari-sections/section-three';
import SectionFour from './desert-safari-sections/section-four';
import SectionFive from './desert-safari-sections/section-five';

const DesertSafari = () => {
    return (
        <>
            <PageImageHeader heading='Tour Packages' />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
        </>
    );
};

export default DesertSafari;