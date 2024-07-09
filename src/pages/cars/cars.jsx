import React from "react";

import PageImageHeader from "../../components/pages-img-header/page-img-header";

import SectionOne from "./car-sections/section-one";
import SectionTwo from "./car-sections/section-two";

const Cars = () => {
    return (
        <>
            <PageImageHeader heading='Rent a Car in Dubai' />
            <SectionOne />
            <SectionTwo />
        </>
    );
};

export default Cars;