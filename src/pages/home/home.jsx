import React from 'react';

import SectionOne from './home-sections/section-one';
import SectionTwo from './home-sections/section-two';
import SectionThree from './home-sections/section-three';
import SectionFour from './home-sections/section-four';
import SectionFive from './home-sections/section-five';
import SectionSix from './home-sections/section-six';
import SectionSeven from './home-sections/section-seven';
import SectionEight from './home-sections/section-eight';
import SectionNine from './home-sections/section-nine';
import SectionTen from './home-sections/section-ten';
import SectionEleven from './home-sections/section-eleven';
import SectionTwelve from './home-sections/section-twelve';
import SectionThirteen from './home-sections/section-thirteen';

const Home = () => {
    return (
        <>
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix heading='Find exceptional Tour Packages Here' />
            <SectionSeven />
            <SectionEight />
            {/* <SectionNine /> */}
            <SectionTen />
            <SectionEleven />
            <SectionTwelve />
            <SectionThirteen />
        </>
    )
}

export default Home;
