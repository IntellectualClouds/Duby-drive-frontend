import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './rental-companies-sections/section-one';

const RentalCompanies = () => {
    return (
        <>
            <PageImageHeader heading='Rental Companies Directory' />
            <SectionOne />
        </>
    );
};

export default RentalCompanies;