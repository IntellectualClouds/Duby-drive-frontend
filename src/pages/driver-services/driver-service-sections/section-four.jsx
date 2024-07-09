import React from 'react';

import phoneIcon from "../../../assets/icons/phone-call.png";
import timeIcon from "../../../assets/icons/time.png";
import homeIcon from "../../../assets/icons/home.png";

const SectionFour = () => {

    return (
        <>
            <div className="driver-service-section-four primary_background_color">
                <div className="driver-service-section-four-header">
                    <h1 className="text-white text-center">How It Works</h1>
                    <p className="text-white text-center">We offer highly professional, uniformed drivers for your personal and corporate needs. Hire an outsourced driver on a monthly basis, all overheads included.</p>
                </div>
                <div className="driver-service-section-four-body">
                    <div className="driver-service-section-four-box">
                        <img className='driver-service-section-four-icons' src={phoneIcon} alt="phone-icon" />
                        <h4 className='text-white text-center'>Book Directly</h4>
                        <p className="text-white text-center">Call or Whatsapp us anytime with your requirement for an all-inclusive quote. Confirm to book and pay our exclusive partners directly. Best possible rates, zero commission!</p>
                    </div>
                    <div className="driver-service-section-four-box">
                        <img className='driver-service-section-four-icons' src={timeIcon} alt="time-icon" />
                        <h4 className='text-white text-center'>Professional, Suitable Drivers</h4>
                        <p className="text-white text-center">Upon receiving your requirement, a driver to you suiting your requirements is ascertained. All our drivers are multi-lingual, professional and experienced at driving in UAE.</p>
                    </div>
                    <div className="driver-service-section-four-box">
                        <img className='driver-service-section-four-icons' src={homeIcon} alt="home-icon" />
                        <h4 className='text-white text-center'>Hassle Free Service</h4>
                        <p className="text-white text-center">We provide our drivers with health insurance and UAE visa. We also manage food, accommodation and transportation for our drivers so that you have nothing to worry about.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionFour;