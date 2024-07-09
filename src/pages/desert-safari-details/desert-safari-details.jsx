import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './desert-safari-details-sections/section-one';
import SectionTwo from './desert-safari-details-sections/section-two';

const DesertSafariDetails = () => {
    return (
        <>
            <PageImageHeader heading='Desert Safari Details' />
            <SectionOne />
            <SectionTwo />
        </>
    );
};

export default DesertSafariDetails;