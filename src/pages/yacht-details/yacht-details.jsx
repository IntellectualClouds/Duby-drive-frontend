import React from 'react';

import SectionOne from "../yacht-details/yacht-details-sections/section-one";
import PageImageHeader from '../../components/pages-img-header/page-img-header';

const YachtDetails = () => {
    return (
        <>
            <PageImageHeader heading='Yacht Details' />
            <SectionOne />
        </>
    );
};

export default YachtDetails;