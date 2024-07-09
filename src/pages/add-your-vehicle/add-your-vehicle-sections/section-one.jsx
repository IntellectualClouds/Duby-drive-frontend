import React from 'react';

import tickIcon from "../../../assets/icons/tick.png";

import AddYourOwnVehicleForm from './components/add-your-own-vehicle-form';

const SectionOne = () => {
    return (
        <>
            <div className="add-your-own-vehicle-section-one">
                <div className="row add-your-own-vehicle-section-one-sub-container">
                    <div className="col-md-7 add-your-own-vehicle-info-container">
                        <h4 className="primary_text_color">Let us take the load off your mind!</h4>
                        <h5 className="mt-3">Rev up your online presence. Elevate your car rental, Transport, tourism and yacht rental business with DubyDrive, An online portal and business platform tailored for success, drive direct booking, captivate customer and shift into the fast lane of digital excellence.</h5>

                        <ul>
                            <li>
                                <img src={tickIcon} alt="tick-icon" />
                                <span className='para'>Get direct leads via phone, SMS and emails.</span>
                            </li>
                            <li>
                                <img src={tickIcon} alt="tick-icon" />
                                <span className='para'>Full training provided for your staff to use the CRM</span>
                            </li>
                            <li>
                                <img src={tickIcon} alt="tick-icon" />
                                <span className='para'>Assistance from your dedicated Account Manager.</span>
                            </li>
                            <li>
                                <img src={tickIcon} alt="tick-icon" />
                                <span className='para'>Tools and resources to plan your marketing strategy.</span>
                            </li>
                            <li>
                                <img src={tickIcon} alt="tick-icon" />
                                <span className='para'>Exclusive member benefits.</span>
                            </li>
                        </ul>

                        <h4 className='mt-4 primary_text_color text-decoration-underline mb-3'>Why Join DubyDrive?</h4>

                        <p className="para">
                            Let's link to the world with DubyDrive and grow your traffic with an active blog and resources on our portal/platform and
                            make the path for visitors to your business to convert them into your clients.
                        </p>
                    </div>
                    <div className="col-md-5 add-your-own-vehicle-form-parent-container">
                        <AddYourOwnVehicleForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionOne;