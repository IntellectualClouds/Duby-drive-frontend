import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './company-details-sections/section-one';

const CompanyDetails = () => {
    return (
        <>
            <PageImageHeader heading='Dealer Information' />
            <SectionOne />
        </>
    );
};

export default CompanyDetails;