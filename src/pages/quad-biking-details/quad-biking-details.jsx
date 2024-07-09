import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './quad-biking-details-sections/section-one';
import SectionTwo from './quad-biking-details-sections/section-two';

const QuadBikingDetails = () => {
    return (
        <>
            <PageImageHeader heading='Quad Bike Details' />
            <SectionOne />
            <SectionTwo />
        </>
    );
};

export default QuadBikingDetails;