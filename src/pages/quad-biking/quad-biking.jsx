import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';

import SectionOne from './quad-biking-sections/section-one';
import SectionTwo from './quad-biking-sections/section-two';
import SectionThree from './quad-biking-sections/section-three';
import SectionFour from './quad-biking-sections/section-four';

const QuadBiking = () => {
    return (
        <>
            <PageImageHeader heading='Quad Bike in Desert' />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
        </>
    )
}

export default QuadBiking;