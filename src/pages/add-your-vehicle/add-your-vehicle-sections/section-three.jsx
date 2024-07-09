import React from 'react';

import carIcon from "../../../assets/icons/type.png";
import companyIcon from "../../../assets/icons/company.png";
import musicIcon from "../../../assets/icons/music.png";

const SectionThree = () => {
    return (
        <>
            <div className="driver-service-section-four background-dark">
                <div className="driver-service-section-four-body">
                    <div className="driver-service-section-four-box">
                        <img className='mb-4 mt-3' src={carIcon} alt="car-icon" height={50} width={50} />
                        <h4 className='text-white text-center'>List your cars</h4>
                        <p className="text-white text-center">Market your car rental fleet on the DubyDrive website and mobile app. Join one of the biggest car rental marketplaces in the world.</p>
                    </div>
                    <div className="driver-service-section-four-box">
                        <img className='mb-4 mt-3' src={companyIcon} alt="company-icon" height={50} width={50} />
                        <h4 className='text-white text-center'>Higher ROI</h4>
                        <p className="text-white text-center">A majority of our clients have reported at least 10x ROI with DubyDrive The highest – when compared across all their marketing channels and spends.</p>
                    </div>
                    <div className="driver-service-section-four-box">
                        <img className='mb-4 mt-3' src={musicIcon} alt="music-icon" height={50} width={50} />
                        <h4 className='text-white text-center'>Stand Tall in your industry</h4>
                        <p className="text-white text-center">Showcase your cars among the top list of car rental companies in your city. Increase your brand recognition, forge partnerships and reinforce your business.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionThree;