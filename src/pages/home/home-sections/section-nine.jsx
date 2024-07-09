import React from 'react';

import carIcon from "../../../assets/icons/type.png";
import luxuryIcon from "../../../assets/icons/luxury.png";
import filterIcon from "../../../assets/icons/filter.png";

const SectionNine = () => {

    return (
        <>
            <div className='home-section-nine'>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="wevbg wv2">
                    <path style={{ fill: "#3f71b9" }} d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>

                <div className="middle-section primary_background_color text-white">
                    <div className="section-nine-header">
                        <h3>Find Cheap Car Rental Deals and Discounts - Updated Daily!</h3>
                    </div>
                    <p className="para text-white">You are sure to find the cheapest rent a car in Dubai only through DubyDrive Compare offers from multiple suppliers and select among a range of budget car rentals. Browse cars for rent including the most exotic luxury cars and sports cars. Rent any of the cars directly with our listed suppliers at the best rates guaranteed! No mark-ups, no booking fees and no commission.</p>

                    <div className="box-container">
                        <div className="box">
                            <div className="box-header">
                                <div className="icon-container">
                                    <img src={carIcon} alt="car-icon" className='box-icon' />
                                </div>
                                <h5 className='mb-0'>Rent a Car across the UAE</h5>
                            </div>
                            <div className="box-body">
                                <p className='text-center'>
                                    Combining all our suppliers' rental fleet, you can choose from car types, brands, models available in the UAE. You can rent a small car such as a Kia Picanto starting at AED 90 / day and even the Lamborghini Urus for AED 3000 / day or a Rolls Royce Cullinan for AED 3800 / day.
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-header">
                                <div className="icon-container">
                                    <img src={luxuryIcon} alt="luxury-icon" className='box-icon' />
                                </div>
                                <h5 className='mb-0'>Luxury and Sports Car Rentals</h5>
                            </div>
                            <div className="box-body">
                                <p className='text-center'>
                                    Self-drive the car of your dreams today! Choose among a range of renowned brands: Ferrari, Rolls Royce, Mercedes Benz, Bentley, Range Rover, Porsche, McLaren, Maserati, Tesla, BMW, Audi, and more. Our most in-demand sports cars include Audi R8, Lamborghini Aventador, Ferrari F8, Chevrolet Corvette and BMW X6.
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-header">
                                <div className="icon-container">
                                    <img src={filterIcon} alt="filter-icon" className='box-icon' />
                                </div>
                                <h5 className='mb-0'>Chauffeur Service Dubai</h5>
                            </div>
                            <div className="box-body">
                                <p className='text-center'>
                                    Travel the UAE in comfort with our range of executive and luxury cars, driven by professional chauffeurs. Our English-speaking drivers are professional, uniformed and always punctual. A service fit for the kings!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="wevbg">
                    <path style={{ fill: '#3f71b9' }} d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </>
    );
};

export default SectionNine;