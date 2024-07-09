import React from "react";

import CarCardSlider from "../../../components/carousels/car_cards";

const SectionThree = () => {
    return (
        <>
            <div className='home-section-four pt-0'>
                <h4 className="ms-3 mb-0">Similar Car Rentals Offers</h4>
                <div className="car-cards-container mt-0">
                    <CarCardSlider fetchBy='allCategory' />
                </div>
            </div >
        </>
    );
};

export default SectionThree;