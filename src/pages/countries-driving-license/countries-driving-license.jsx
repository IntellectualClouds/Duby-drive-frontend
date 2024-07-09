import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './countries-driving-license-sections/section-one';
import SectionTwo from './countries-driving-license-sections/section-two';
import SectionThree from './countries-driving-license-sections/section-three';
import HomeSectionTwo from "../home/home-sections/section-two";
import HomeSectionTwelve from "../home/home-sections/section-twelve";
import HomeSectionThirteen from "../home/home-sections/section-thirteen";

const CountriesDrivingLicense = () => {
    return (
        <>
            <PageImageHeader heading='Driving Licenses From Countries' />
            <SectionOne />
            <SectionTwo />
            <HomeSectionTwo />
            <HomeSectionTwelve />
            <SectionThree />
            <HomeSectionThirteen />
        </>
    );
};

export default CountriesDrivingLicense;