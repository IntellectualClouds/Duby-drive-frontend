import React from 'react';
import BrandCardSlider from '../../../components/carousels/brand_card';
import { useNavigate } from 'react-router-dom';

import rightAngleIcon from '../../../assets/icons/next-angle-arrow.png';

const SectionThree = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='home-section-three'>
                <div className="section-three-header">
                    <h3 className='section-three-main-heading'>
                        Find a Car by Top Brands and Logos
                        <img className='view-all-brands-icon-btn invisible ms-1' onClick={() => { navigate('/car_brands') }} src={rightAngleIcon} alt="next-arrow" height={15} width={15} />
                    </h3>
                    <button onClick={() => { navigate('/car_brands') }} className="btn home_btn primary_background_color links_hover view-all-brands-btn">All Brands<div className="btn-icon"></div></button>
                </div>
                <p className="para">Drive your dream car to represent the ultimate expression of your personality and style.</p>

                <div className="brands-cards-container">
                    <BrandCardSlider />
                </div>
            </div>
        </>
    );
};

export default SectionThree;