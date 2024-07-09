import React from 'react';

import carIcon from "../../../assets/icons/car-wash.png";
import bookingIcon from "../../../assets/icons/booking.png";
import coinIcon from "../../../assets/icons/coin.png";

const SectionFour = () => {
    return (
        <>
            <div className="about-page-section-four">
                <h2 className='mb-4'>What <span className="primary_text_color">sets us</span> a part</h2>
                <div className="about-page-cards-container">
                    <div className="about-page-card">
                        <div className="about-page-card-header">
                            <img src={carIcon} alt="car-icon" />
                        </div>
                        <div className="about-page-card-body">
                            <h3>Exclusive Cars</h3>
                        </div>
                        <div className="about-page-card-footer">
                            <p className="para">Whether you’re looking for budget-friendly cars or exclusive luxury and sports cars, we have it here.</p>
                        </div>
                    </div>
                    <div className="about-page-card">
                        <div className="about-page-card-header">
                            <img src={bookingIcon} alt="booking-icon" />
                        </div>
                        <div className="about-page-card-body">
                            <h3>Direct Booking</h3>
                        </div>
                        <div className="about-page-card-footer">
                            <p className="para">Book directly from our car rental partners at the best-in-market rates guaranteed.</p>
                        </div>
                    </div>
                    <div className="about-page-card">
                        <div className="about-page-card-header">
                            <img src={coinIcon} alt="coin-icon" />
                        </div>
                        <div className="about-page-card-body">
                            <h3>Pay Zero Commission</h3>
                        </div>
                        <div className="about-page-card-footer">
                            <p className="para">You pay zero commission, zero mark-ups, and zero booking fees.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );;
};

export default SectionFour;