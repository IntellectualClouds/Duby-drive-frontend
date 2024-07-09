import React from 'react';

import PageImageHeader from "../../components/pages-img-header/page-img-header";

import SectionOne from './brand-sections/section-one';

const Brands = () => {
    return (
        <>
            <PageImageHeader heading="Browse rental cars by brand" />
            <SectionOne />
        </>
    )
}

export default Brands;