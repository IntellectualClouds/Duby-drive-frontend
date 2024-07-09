import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';

import SectionOne from './packages-sections/section-one';

const Packages = () => {
    return (
        <>
            <PageImageHeader heading='Our Packages' />
            <SectionOne />
        </>
    );
};

export default Packages;