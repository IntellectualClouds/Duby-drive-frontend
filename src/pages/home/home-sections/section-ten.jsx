import React from 'react';
import { useNavigate } from 'react-router-dom';

import tickIcon from "../../../assets/icons/tick.png";

import suv from "../../../assets/images/cars/suv.webp";
import sedean from '../../../assets/images/cars/sedan.webp';

const SectionTen = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='home-section-ten'>
                <div className="section-ten-header">
                    <h3>Required Documents for Renting a Car in UAE.</h3>
                </div>
                <p className="para">
                    When planning to visit and discover the beauty of landscapes and mesmerizing cities of the united arab emirates(UAE), renting a car can be a smart way to explore the city at your own comfort. Before you prepare for your trip to UAE it is important for you to be aware of all required documents you need to make sure a easy and hassle-free rental experience. You are eligible to rent a car anywhere in UAE if you are 23+ years of age and having all valid documents handy as mentioned hereunder.
                </p>

                <div className="section-ten-mid-section">
                    <div className="card-table">
                        <div className="card-table-header">
                            <h4 className='mb-0 text-center para'>For UAE Residents</h4>
                        </div>
                        <div className="card-table-body">
                            <div className="col-md-4 card-table-img-container">
                                <img src={suv} alt="suv-car" className='card-table-car-img' />
                            </div>
                            <div className="col-md-8 card-table-details-container">
                                <div className='card-table-detail'>
                                    <img src={tickIcon} alt="tick-icon" className='card-table-icon' />
                                    <span>UAE Driving License</span>
                                </div>
                                <div className='card-table-detail'>
                                    <img src={tickIcon} alt="tick-icon" className='card-table-icon' />
                                    <span>Emirates ID</span>
                                </div>
                                <div className='card-table-detail'>
                                    <span>(Residential Visa may be acceptable)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-table">
                        <div className="card-table-header">
                            <h4 className='mb-0 text-center para'>For Tourists visiting the UAE</h4>
                        </div>
                        <div className="card-table-body p-0">
                            <div className="col-md-4 card-table-img-container">
                                <img src={sedean} alt="suv-car" className='card-table-car-img' />
                            </div>
                            <div className="col-md-8 card-table-details-container p-3">
                                <div className='card-table-detail'>
                                    <img src={tickIcon} alt="tick-icon" className='card-table-icon' />
                                    <span>Valid Driving License</span>
                                </div>
                                <div className='card-table-detail'>
                                    <img src={tickIcon} alt="tick-icon" className='card-table-icon' />
                                    <span>International Driving Permit (IDP)</span>
                                </div>
                                <div className='card-table-detail'>
                                    <img src={tickIcon} alt="tick-icon" className='card-table-icon' />
                                    <span>Passport, Visa or Entry Stamp</span>
                                </div>
                                <div className='card-table-detail'>
                                    <img src={tickIcon} alt="tick-icon" className='card-table-icon' />
                                    <span>Credit Card, Proof of Insurance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-ten-footer">
                    <p className="para">
                        Visitors from the GCC, US, UK, Canada, Europe and certain other countries can drive with their home country driving license,without the need of an IDP.
                    </p>
                </div>
                <p className="para primary_text_color links" onClick={() => { navigate('/countries_driving_license') }}>
                    Find out if your country's driving license is valid in the UAE...
                </p>

            </div>
        </>
    );
};

export default SectionTen;