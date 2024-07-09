import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import logo from "../../assets/logo/duby-drive.png";
import carImg from "../../assets/images/footer-card-img/suv.jpg";

import playStoreBtn from "../../assets/download-btn/google-btn.png";
import appStoreBtn from "../../assets/download-btn/apple-btn.png";

import phoneIcon from "../../assets/icons/phone-call.png";
import emailIcon from "../../assets/icons/email.png";
import pinIcon from "../../assets/icons/pin.png";

import masterCard from '../../assets/cards/master-card.png';
import visaCard from '../../assets/cards/visa-card.png';
import expressCard from '../../assets/cards/express-card.png';

import fbIcon from "../../assets/icons/facebook.png";
import instaIcon from "../../assets/icons/instagram.png";
import xIcon from "../../assets/icons/x.png";
import youtubeIcon from "../../assets/icons/youtube.png";
import tiktokIcon from "../../assets/icons/tiktok.png";

const Footer = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="footer-container background-dark-solid p-3">
                <div className="footer-row-one">
                    <div className='col-md-3 mb-3'>
                        <div className="footer-company-details-container">
                            <div className='footer-company-logo-container'>
                                <img src={logo} alt="logo" />
                                <h3 className='text-white'>DubyDrive</h3>
                            </div>
                            <div className='footer-company-details'>
                                <p className='text-white'>
                                    Find and book our budget-friendly and affordable car rentals, Chauffeur service, Tour Packages and Luxury Yacht Rentals Deals & Services. We are  Located in Dubai, and Providing our services in all major cities in United Arab Emirates (UAE).
                                </p>
                            </div>
                            {/* <div className='footer-app-download-btn-container'>
                                <img src={playStoreBtn} alt="play-store-btn" onClick={() => { toast.warn('Currently we are working on our app') }} />
                                <img src={appStoreBtn} alt="app-store-btn" onClick={() => { toast.warn('Currently we are working on our app') }} />
                            </div> */}
                        </div>
                    </div>
                    <div className='col-md-4 mb-3'>
                        <div className="footer-links-container text-white">
                            <div className="footer-links-container-one">
                                <p onClick={() => { navigate('/frequently_asked_questions') }} className="page-links footer-page-links">Dubai Car Rental FAQs</p>
                                <p onClick={() => { navigate('/car_brands') }} className="page-links footer-page-links">Rent by Brands</p>
                                <p onClick={() => { navigate('/yachts') }} className="page-links footer-page-links">Yacht Rental</p>
                                <p onClick={() => { navigate('/desert_safari') }} className="page-links footer-page-links">Desert Safari Dubai</p>
                                <p onClick={() => { navigate('/cars') }} className="page-links footer-page-links">Car with Driver</p>
                                <p onClick={() => { navigate('/rental_companies') }} className="page-links footer-page-links">Car Rental Directory</p>
                                <p onClick={() => { navigate('/countries_driving_license') }} className="page-links footer-page-links">Country Driving License</p>
                            </div>
                            <div className="footer-links-container-two">
                                <p onClick={() => { navigate('quad_biking') }} className="page-links footer-page-links">Dune Bashing</p>
                                <p onClick={() => { navigate('/about') }} className="page-links footer-page-links">About US</p>
                                {/* <p onClick={() => { navigate('/') }} className="page-links footer-page-links">DubyDrive App</p> */}
                                <p onClick={() => { navigate('/terms_and_conditions') }} className="page-links footer-page-links">Terms and Conditions</p>
                                <p onClick={() => { navigate('/terms_and_conditions_of_use') }} className="page-links footer-page-links">Terms and Conditions of use</p>
                                <p onClick={() => { navigate('/privacy_policy') }} className="page-links footer-page-links">Privacy Policy</p>
                                <p onClick={() => { navigate('/contact') }} className="page-links footer-page-links">Contact US</p>
                                <p onClick={() => { navigate('/add_your_own_vehicle') }} className="page-links footer-page-links">Add Your Own Vehicle</p>
                            </div>
                        </div>
                        {/* <div className="footer-car-list-card-container">
                            <div onClick={() => { navigate('/add_your_own_vehicle') }} className="footer-car-list-card background-whitesmoke">
                                <div className="footer-car-list-card-img-container">
                                    <img src={carImg} alt="car-list-card" className='footer-car-list-card-img' />
                                </div>
                                <div className="footer-car-list-card-details-container">
                                    <div className="footer-car-list-card-details">
                                        <h6 className='page-links'>Are you a car rental company?</h6>
                                        <h6 className='page-links'>Join us.</h6>
                                    </div>
                                    <div className="footer-car-list-btn-container">
                                        <button className='btn primary_background_color text-white'>LIST YOUR CAR</button>
                                    </div>
                                </div>
                                <div className="footer-card-add-circle primary_background_color text-white">+</div>
                            </div>
                        </div> */}
                    </div>
                    <div className='col-md-2 mb-3'>
                        <div className="footer-contact-details-container">
                            <div className="footer-contact-details">
                                <h6 className='text-gray'>For Inquiries & Support</h6>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={phoneIcon} alt="phone-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>+971 50 571 4766</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={emailIcon} alt="email-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>sales@dubydrive.com</span>
                                </div>
                            </div>
                            <div className="footer-contact-details">
                                <h6 className='text-gray'>For Car with Driver</h6>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={phoneIcon} alt="phone-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>+971 50 571 4766</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={emailIcon} alt="email-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>sales@dubydrive.com</span>
                                </div>
                            </div>
                            <div className="footer-contact-details">
                                <h6 className='text-gray'>Advertise with Us</h6>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={phoneIcon} alt="phone-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>+971 50 571 4766</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={emailIcon} alt="email-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>sales@dubydrive.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-3'>
                        <div className="footer-location-details-container">
                            <div className="footer-contact-details">
                                <h6 className='text-gray'>Address</h6>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={pinIcon} alt="pin-icon" className='footer-links-icons mb-4' />
                                    <span className='text-white page-links'>1309 Coffeen Avenue STE 1200 Sheridan, Wyoming 82801</span>
                                </div>
                            </div>
                            <div className="footer-map-container">
                                <iframe
                                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.8348090681534!2d-106.9435319239115!3d44.784172978553904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335f009b7255555%3A0x7037fbf770c90986!2s1309%20Coffeen%20Ave%20ST%201200%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2s!4v1709545896309!5m2!1sen!2s'
                                    height={200}
                                    width={'100%'}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-row-one mobile-footer-one">
                    <div className='col-md-2 mb-3 footer-contact-details-container-parent'>
                        <div className="footer-contact-details-container">
                            <div className="footer-contact-details">
                                <h6 className='text-gray'>For Inquiries & Support</h6>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={phoneIcon} alt="phone-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>+971 50 571 4766</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={emailIcon} alt="email-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>sales@dubydrive.com</span>
                                </div>
                            </div>
                            <div className="footer-contact-details">
                                <h6 className='text-gray'>For Car with Driver</h6>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={phoneIcon} alt="phone-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>+971 50 571 4766</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={emailIcon} alt="email-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>sales@dubydrive.com</span>
                                </div>
                            </div>
                            <div className="footer-contact-details">
                                <h6 className='text-gray'>Advertise with Us</h6>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={phoneIcon} alt="phone-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>+971 50 571 4766</span>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={emailIcon} alt="email-icon" className='footer-links-icons' />
                                    <span className='text-white page-links'>sales@dubydrive.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-3 footer-location-details-container-parent'>
                        <div className="footer-location-details-container">
                            <div className="footer-contact-details">
                                <h6 className='text-gray'>Address</h6>
                                <div className='d-flex align-items-center mb-2'>
                                    <img src={pinIcon} alt="pin-icon" className='footer-links-icons mb-4' />
                                    <span className='text-white page-links'>1309 Coffeen Avenue STE 1200 Sheridan, Wyoming 82801</span>
                                </div>
                            </div>
                            <div className="footer-map-container">
                                <iframe
                                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.8348090681534!2d-106.9435319239115!3d44.784172978553904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335f009b7255555%3A0x7037fbf770c90986!2s1309%20Coffeen%20Ave%20ST%201200%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2s!4v1709545896309!5m2!1sen!2s'
                                    height={200}
                                    width={'100%'}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 mb-3 footer-links-container-parent'>
                        <div className="footer-links-container text-white">
                            <div className="footer-links-container-one">
                                <p onClick={() => { navigate('/frequently_asked_questions') }} className="page-links footer-page-links">Dubai Car Rental FAQs</p>
                                <p onClick={() => { navigate('/car_brands') }} className="page-links footer-page-links">Rent by Brands</p>
                                <p onClick={() => { navigate('/yachts') }} className="page-links footer-page-links">Yacht Rental</p>
                                <p onClick={() => { navigate('/desert_safari') }} className="page-links footer-page-links">Desert Safari Dubai</p>
                                <p onClick={() => { navigate('/cars') }} className="page-links footer-page-links">Car with Driver</p>
                                <p onClick={() => { navigate('/rental_companies') }} className="page-links footer-page-links">Car Rental Directory</p>
                                <p onClick={() => { navigate('/countries_driving_license') }} className="page-links footer-page-links">Country Driving License</p>
                            </div>
                            <div className="footer-links-container-two">
                                <p onClick={() => { navigate('quad_biking') }} className="page-links footer-page-links">Dune Bashing</p>
                                <p onClick={() => { navigate('/about') }} className="page-links footer-page-links">About US</p>
                                {/* <p onClick={() => { navigate('/') }} className="page-links footer-page-links">DubyDrive App</p> */}
                                <p onClick={() => { navigate('/terms_and_conditions') }} className="page-links footer-page-links">Terms and Conditions</p>
                                <p onClick={() => { navigate('/terms_and_conditions_of_use') }} className="page-links footer-page-links">Terms and Conditions of use</p>
                                <p onClick={() => { navigate('/privacy_policy') }} className="page-links footer-page-links">Privacy Policy</p>
                                <p onClick={() => { navigate('/contact') }} className="page-links footer-page-links">Contact US</p>
                                <p onClick={() => { navigate('/add_your_own_vehicle') }} className="page-links footer-page-links">Add Your Own Vehicle</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-3 footer-company-details-container-parent'>
                        <div className="footer-company-details-container">
                            <div className='footer-company-logo-container'>
                                <img src={logo} alt="logo" />
                                <h3 className='text-white'>DubyDrive</h3>
                            </div>
                            <div className='footer-company-details'>
                                <p className='text-white'>
                                    Find and book our budget-friendly and affordable car rentals, Chauffeur service, Tour Packages and Luxury Yacht Rentals Deals & Services. We are  Located in Dubai, and Providing our services in all major cities in United Arab Emirates (UAE).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-row-two'>
                    <div className="footer-payment-cards-container">

                        <div className="footer-payment-cards">
                            <img src={visaCard} alt="visa-card" className='footer-payment-card-img' />
                        </div>
                        <div className="footer-payment-cards">
                            <img src={expressCard} alt="express-card" className='footer-payment-card-img' />
                        </div>
                        <div className="footer-payment-cards">
                            <img src={masterCard} alt="master-card" className='footer-payment-card-img' />
                        </div>

                    </div>
                    {/* <div className="footer-language-links-container text-white">
                        <p className='page-links'>English</p>
                        <p className='page-links'>العربية</p>
                        <p className='page-links'>Français</p>
                        <p className='page-links'>Dutch</p>
                        <p className='page-links'>русский</p>
                        <p className='page-links'>Türkçe</p>
                        <p className='page-links'>Español</p>
                        <p className='page-links'>Chinese</p>
                        <p className='page-links'>Italian</p>
                        <p className='page-links'>German</p>
                    </div> */}
                    <p className="footer-bottom-text text-white text-center">
                        Dubydrive.com – a part of <span onClick={() => { window.open(`https://intellectualclouds.com/`, "_blank") }} className='page-links'>Intellectual Clouds LLC</span>
                    </p>
                    <div className='footer-social-media-icons-container'>
                        <img src={fbIcon} alt="social-media-icon" />
                        <img src={instaIcon} alt="social-media-icon" />
                        {/* <img src={xIcon} alt="social-media-icon" /> */}
                        <img src={tiktokIcon} alt="social-media-icon" />
                        <img src={youtubeIcon} alt="social-media-icon" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;