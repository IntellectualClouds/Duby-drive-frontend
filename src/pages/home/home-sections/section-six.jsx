import React from 'react';
import { useNavigate } from 'react-router-dom';

const SectionSix = ({ heading }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className='home-section-six'>
                <div className="section-six-header">
                    <h3 className='primary_text_color'>{heading || 'Beyond Car Rental Services'}</h3>
                </div>
                <p className="para">Experience the best affordable holiday tour packages of Dubai UAE to create memories that are timeless treasure of your heart.</p>

                <div className="services-cards-container">
                    <div onClick={()=>{navigate('/cars')}} className="service-card">
                        <div className='service-card-img sci-one'>
                            <p className='service-name'>Car Rentals available across UAE</p>
                        </div>
                    </div>
                    <div onClick={()=>{navigate('/desert_safari')}} className="service-card">
                        <div className='service-card-img sci-two'>
                            <p className='service-name'>Book Desert Safari Tour</p>
                        </div>
                    </div>
                    <div onClick={()=>{navigate('/quad_biking')}} className="service-card">
                        <div className='service-card-img sci-three'>
                            <p className='service-name'>Find your Desert Safari Tour</p>
                        </div>
                    </div>
                    <div onClick={()=>{navigate('/yachts')}} className="service-card">
                        <div className='service-card-img sci-four'>
                            <p className='service-name'>Yacht Rentals in UAE</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionSix;