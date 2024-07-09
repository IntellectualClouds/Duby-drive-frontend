import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './driver-service-sections/section-one';
import SectionTwo from './driver-service-sections/section-two';
import SectionThree from './driver-service-sections/section-three';
import SectionFour from './driver-service-sections/section-four';
import SectionFive from './driver-service-sections/section-five';

const DriverService = () => {
    return (
        <>
            <PageImageHeader heading='Driver Service' />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
        </>
    );
};

export default DriverService;