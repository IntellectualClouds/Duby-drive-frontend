import React from 'react';

import PageImageHeader from '../../components/pages-img-header/page-img-header';
import SectionOne from './add-your-vehicle-sections/section-one';
import Packages from '../packages/packages-sections/section-one';
import SectionTwo from './add-your-vehicle-sections/section-two';
import SectionThree from './add-your-vehicle-sections/section-three';
import SectionFour from './add-your-vehicle-sections/section-four';

const AddYourOwnVehicle = () => {
    return (
        <>
            <PageImageHeader heading='LIST YOUR RENTAL CARS NOW' />
            <SectionOne />
            <Packages />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
        </>
    );
};

export default AddYourOwnVehicle;