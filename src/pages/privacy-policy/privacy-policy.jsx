import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './privacy-policy-sections/section-one';
import SectionTwo from './privacy-policy-sections/section-two';

const PrivacyPolicy = () => {
    return (
        <>
            <PageImageHeader heading='Privacy Policy' />
            <SectionOne />
            <SectionTwo />
        </>
    );
};

export default PrivacyPolicy;