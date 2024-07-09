import React from 'react';

import carCard from "../../../assets/images/car-card/car-card-img.jpeg";

import marketingIcon from "../../../assets/icons/megaphone.png";
import giftIcon from "../../../assets/icons/gift-box.png";
import rankingIcon from "../../../assets/icons/ranking.png";
import commissionIcon from "../../../assets/icons/commission.png";
import bookingIcon from "../../../assets/icons/booking.png";
import calendarIcon from "../../../assets/icons/calendar.png";

const SectionTwo = () => {
    return (
        <>
            <div className="add-your-own-vehicle-section-two">
                <div className="row add-your-own-vehicle-section-two-sub-section">
                    <div className="add-your-own-vehicle-sub-section-one">
                        <div className="add-your-own-vehicle-sub-section-content-container">
                            <div className="add-your-own-vehicle-sub-section-content-header">
                                <img src={marketingIcon} alt="icon" />
                                <h4 className='mb-0 primary_text_color'>Community Platform</h4>
                            </div>
                            <div className="add-your-own-vehicle-sub-section-content-body">
                                <p className="para">
                                    DubyDrive serves as a digital community platform
                                    designed for car rental, transport, luxury yacht and tourism businesses
                                    to highlight and promote their product and services while simultaneously enhancing
                                    their overall business capabilities.
                                </p>
                            </div>
                        </div>
                        <div className="add-your-own-vehicle-sub-section-content-container">
                            <div className="add-your-own-vehicle-sub-section-content-header">
                                <img src={giftIcon} alt="icon" />
                                <h4 className='mb-0 primary_text_color'>CRM Based Portal</h4>
                            </div>
                            <div className="add-your-own-vehicle-sub-section-content-body">
                                <p className="para">
                                    Functioning as a CRM based portal and business platform, it enhances your business potential
                                    by effectively and efficiently reaching out to a larger customer base. Helps
                                    manage, track and store information related to your company's current and
                                    potential clients.
                                </p>
                            </div>
                        </div>
                        <div className="add-your-own-vehicle-sub-section-content-container">
                            <div className="add-your-own-vehicle-sub-section-content-header">
                                <img src={rankingIcon} alt="icon" />
                                <h4 className='mb-0 primary_text_color'>Digital Marketing Tool</h4>
                            </div>
                            <div className="add-your-own-vehicle-sub-section-content-body">
                                <p className="para">
                                    An online portal and business platform  that allows a marketing team
                                    to execute an effect to sell goods or services.this tool will help
                                    companies with social media ads, SEO rating for business brand, email
                                    marketing, website management and keyword track
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="add-your-own-vehicle-sub-section-two">
                        <img src={carCard} alt="car-card" />
                    </div>
                    <div className="add-your-own-vehicle-sub-section-one">
                        <div className="add-your-own-vehicle-sub-section-content-container">
                            <div className="add-your-own-vehicle-sub-section-content-header">
                                <img src={commissionIcon} alt="icon" />
                                <h4 className='mb-0 primary_text_color'>Zero Commission</h4>
                            </div>
                            <div className="add-your-own-vehicle-sub-section-content-body">
                                <p className="para">
                                    DubyDrive doesn't work as a commission agent and charge any marks-up from your booking, your hard earn rental money belongs to you. only minimal amount of subscription is charged as per selected "parking lot" package.
                                </p>
                            </div>
                        </div>
                        <div className="add-your-own-vehicle-sub-section-content-container">
                            <div className="add-your-own-vehicle-sub-section-content-header">
                                <img src={bookingIcon} alt="icon" />
                                <h4 className='mb-0 primary_text_color'>Control on your listing</h4>
                            </div>
                            <div className="add-your-own-vehicle-sub-section-content-body">
                                <p className="para">
                                    Manage your listings whenever you want,
                                    upload and replace vehicles images, price change and all other details with few clicks within no time.
                                </p>
                            </div>
                        </div>
                        <div className="add-your-own-vehicle-sub-section-content-container">
                            <div className="add-your-own-vehicle-sub-section-content-header">
                                <img src={calendarIcon} alt="icon" />
                                <h4 className='mb-0 primary_text_color'>Direct Booking</h4>
                            </div>
                            <div className="add-your-own-vehicle-sub-section-content-body">
                                <p className="para">
                                    Receive calls, WhatsApp messages, SMS and emails directly from customers looking to rent your car. Deal directly with zero commission.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionTwo;