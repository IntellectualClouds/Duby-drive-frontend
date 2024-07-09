import React from 'react'
import { useNavigate } from 'react-router-dom';

import graphIcon from "../../../assets/icons/graph.png";
import bookingIcon from "../../../assets/icons/booking.png";
import speedIcon from "../../../assets/icons/speed-test.png";
import dashboardIcon from "../../../assets/icons/dashboard.png";

const SectionSix = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="about-page-section-six">
                <h2 className='mb-4'>The <span className="primary_text_color">DubyDrive</span> Experience</h2>
                <div className='w-100 about-page-section-six-sub-section'>
                    <div className="about-page-section-six-content-container p-3">
                        <h3 className="primary_text_color">For Users</h3>
                        <ul>
                            <li className='para mb-1'>Explore our portal and book the car of your choice at all-inclusive prices in just a few clicks</li>
                            <li className='para mb-1'>Book directly from our verified car rental partners and be assured of expert service</li>
                            <li className='para mb-1'>Compare using various filters like car brand, model, location, budget and other features to find a car as per your requirements</li>
                            <li className='para mb-1'>Book <span onClick={() => { navigate('/cars') }} className="primary_text_color links">chauffeur-driven</span> cars and driver-on-demand with ease from reputed service providers</li>
                            <li className='para mb-1'>Contact our rental partners instantly through phone, email, and WhatsApp</li>
                            <li className='para mb-1'>Compare live car rental offers from multiple companies at a glance</li>
                            <li className='para mb-1'>We follow a stringent onboarding process of our rental partners, assuring the best service and quality</li>
                            <li className='para mb-1'>Each car is verified with real photos before being listed on our portal so you can book confidently</li>
                            <li className='para mb-1'>Reverse the search by submitting a ‘Find Me A Car’ request to get rental quotes from multiple companies</li>
                        </ul>
                        <button onClick={() => { navigate('/cars') }} className="btn primary_background_color text-white w-100 links">Start Renting</button>
                    </div>
                    <div className="about-page-section-six-content-container p-3">
                        <div className="about-page-large-card">
                            <h3 className="primary_text_color">For Partners</h3>
                            <p>Car Rental Companies</p>

                            <div className="large-card-list-container">
                                <div className="list-item-details">
                                    <div>
                                        <img src={graphIcon} alt="graph-icon" />
                                    </div>
                                    <div>
                                        <p className="para mb-0">Grow your business and increase your visibility by partnering with DubyDrive</p>
                                    </div>
                                </div>
                                <div className="list-item-details">
                                    <div>
                                        <img src={bookingIcon} alt="graph-icon" />
                                    </div>
                                    <div>
                                        <p className="para mb-0">Get inquiries and genuine bookings without paying a commission</p>
                                    </div>
                                </div>
                                <div className="list-item-details">
                                    <div>
                                        <img src={speedIcon} alt="graph-icon" />
                                    </div>
                                    <div>
                                        <p className="para mb-0">Add and manage your fleet information in real-time</p>
                                    </div>
                                </div>
                                <div className="list-item-details">
                                    <div>
                                        <img src={dashboardIcon} alt="graph-icon" />
                                    </div>
                                    <div>
                                        <p className="para mb-0">Access your business dashboard and learn from insights based on your account performance</p>
                                    </div>
                                </div>
                            </div>

                            <button className="btn primary_background_color w-100 text-white" onClick={() => { navigate('/add_your_own_vehicle') }}>List Your Car</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );;
};

export default SectionSix;