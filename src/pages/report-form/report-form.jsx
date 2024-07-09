import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './report-form-sections/section-one';
import SectionTwo from './report-form-sections/section-two';

const ReportForm = () => {
    return (
        <>
            <PageImageHeader heading='Report a problem' />
            <SectionOne />
            <SectionTwo />
        </>
    );
};

export default ReportForm;