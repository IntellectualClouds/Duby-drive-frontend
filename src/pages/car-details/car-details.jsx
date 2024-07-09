import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';

import SectionOne from './car-details-sections/section-one';
import SectionTwo from './car-details-sections/section-two';
import SectionThree from './car-details-sections/section-three';

const CarDetails = () => {
    return (
        <>
            <PageImageHeader heading='Car Details' />
            <SectionOne />
            {/* <SectionTwo /> */}
            <SectionThree />
        </>
    );
};

export default CarDetails;