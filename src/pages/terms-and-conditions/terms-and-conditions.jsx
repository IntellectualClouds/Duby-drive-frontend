import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './terms-and-conditions-sections/section-one';
import SectionTwo from './terms-and-conditions-sections/section-two';
import SectionThree from './terms-and-conditions-sections/section-three';

const TermsAndConditions = () => {
    return (
        <>
            <PageImageHeader heading='Terms and Conditions' />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
        </>
    );
};

export default TermsAndConditions;