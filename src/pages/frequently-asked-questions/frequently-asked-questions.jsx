import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './frequently-asked-question-sections/section-one';
import SectionTwo from './frequently-asked-question-sections/section-two';
import SectionThree from './frequently-asked-question-sections/section-three';

const FrequentlyAskedQuestions = () => {
    return (
        <>
            <PageImageHeader heading='Frequently Asked Questions' />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
        </>
    );
};

export default FrequentlyAskedQuestions;