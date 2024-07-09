import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo/duby-drive.png';
import earthIcon from "../../assets/icons/planet-earth.png";
import emailIcon from "../../assets/icons/email.png";
import phoneIcon from "../../assets/icons/phone-call.png";
import carIcon from "../../assets/icons/type.png";
import companyIcon from "../../assets/icons/company.png";

import fbIcon from "../../assets/icons/facebook.png";
import instaIcon from "../../assets/icons/instagram.png";
import tiktokIcon from "../../assets/icons/tiktok.png";
import youtubeIcon from "../../assets/icons/youtube.png";

import sportsCarIcon from "../../assets/icons/sports-car.png";

const Header = () => {

    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar bg-body-tertiary p-0">
                <div className="container-fluid header-container">
                    <a className="navbar-brand header-logo-btn" onClick={() => { navigate('/') }}>
                        <img
                            src={logo}
                            alt="logo"
                            width={35}
                            height={35}
                            className="d-inline-block align-text-top header-logo"
                        />
                        Duby Drive
                    </a>

                    <div className='header-links-container'>
                        <a className='header-links links_hover' href="#">
                            <img className='header-links-icons' src={earthIcon} height={17} width={17} alt="earth-icon" />
                            UAE
                        </a>
                        <a className='header-links links_hover' href="#">
                            <img className='header-links-icons' src={emailIcon} height={17} width={17} alt="email-icon" />
                            sales@dubydrive.com
                        </a>
                        <a className='header-links links_hover' href="#">
                            <img className='header-links-icons' src={phoneIcon} height={17} width={17} alt="phone-icon" />
                            +971 505714766
                        </a>
                        <a className='header-links links_hover' onClick={() => { navigate('rental_companies') }}>
                            <img className='header-links-icons' src={companyIcon} height={17} width={17} alt="company-icon" />
                            Rental Companies
                        </a>
                        <a className='header-links links_hover background-orange text-white rounded' onClick={() => { navigate('/add_your_own_vehicle') }}>
                            <img className='header-links-icons' src={sportsCarIcon} height={17} width={17} alt="sports-car-icon" />
                            Register your vehicle
                        </a>
                        <div className="d-flex align-items-center justify-content-center me-3 ms-3">
                            <img src={fbIcon} alt="social-media-icon" className='small-icon' />
                            <img src={instaIcon} alt="social-media-icon" className='large-icon' />
                            <img src={tiktokIcon} alt="social-media-icon" className='large-icon' />
                            <img src={youtubeIcon} alt="social-media-icon" className='small-icon' />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;