import React from "react";

import carIcon from '../../../assets/icons/type.png';
import childIcon from '../../../assets/icons/child.png';
import timeIcon from '../../../assets/icons/time.png';
import bookingIcon from '../../../assets/icons/booked.png';

const SectionTwo = () => {
    return (
        <>
            <div className="quad-bike-section-two desert-safari-section-two-details-page">
                <div className="background-transparent quad-bike-section-two-sub-section">
                    <div className="quad-bike-details-box mb-3 mt-3">
                        <div className="quad-bike-details-box-header">
                            <img src={carIcon} alt="car-icon" />
                        </div>
                        <div className="quad-bike-details-box-body">
                            <h5 className="text-white mb-3 text-center">Select the Tour of Your Choice</h5>
                            <p className="text-white text-center">Select from an extensive array of thrilling desert adventures</p>
                        </div>
                    </div>
                    <div className="quad-bike-details-box mb-3 mt-3">
                        <div className="quad-bike-details-box-header">
                            <img src={childIcon} alt="child-icon" />
                        </div>
                        <div className="quad-bike-details-box-body">
                            <h5 className="text-white mb-3 text-center">Choose the Number of People</h5>
                            <p className="text-white text-center">Tailor your safari to accommodate the exact number of participants</p>
                        </div>
                    </div>
                    <div className="quad-bike-details-box mb-3 mt-3">
                        <div className="quad-bike-details-box-header">
                            <img src={timeIcon} alt="time-icon" />
                        </div>
                        <div className="quad-bike-details-box-body">
                            <h5 className="text-white mb-3 text-center">Choose the Duration and Day</h5>
                            <p className="text-white text-center">Opt for the day and time that aligns seamlessly with your plans</p>
                        </div>
                    </div>
                    <div className="quad-bike-details-box mb-3 mt-3">
                        <div className="quad-bike-details-box-header">
                            <img src={bookingIcon} alt="booking-icon" />
                        </div>
                        <div className="quad-bike-details-box-body">
                            <h5 className="text-white mb-3 text-center">Book Directly</h5>
                            <p className="text-white text-center">Secure your spot with direct hassle-free direct bookings by using Duby Drive</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionTwo;