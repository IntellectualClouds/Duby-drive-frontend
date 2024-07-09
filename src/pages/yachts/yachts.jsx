import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';

import SectionOne from './yacht-sections/section-one';

const Yachts = () => {
    return (
        <>
            <PageImageHeader heading='Dubai Yacht Rentals' />
            <SectionOne />
        </>
    )
}

export default Yachts;