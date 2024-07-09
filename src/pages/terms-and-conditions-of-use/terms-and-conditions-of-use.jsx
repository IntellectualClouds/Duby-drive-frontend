import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './terms-and-conditions-of-use-sections/section-one';
import SectionTwo from './terms-and-conditions-of-use-sections/section-two';

const TermsAndConditionsOfUse = () => {
    return (
        <>
            <PageImageHeader heading='Terms and Conditions of Use' />
            <SectionOne />
            <SectionTwo />
        </>
    );
};

export default TermsAndConditionsOfUse;