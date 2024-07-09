import React from 'react';

import earthIcon from "../../../../assets/icons/planet-earth.png";
import pinIcon from "../../../../assets/icons/pin.png";
import phoneIcon from "../../../../assets/icons/phone-call.png";
import emailIcon from "../../../../assets/icons/email.png";
import fbIcon from "../../../../assets/icons/facebook.png";
import instaIcon from "../../../../assets/icons/instagram.png";
import xIcon from "../../../../assets/icons/x.png";
import youtubeIcon from "../../../../assets/icons/youtube.png";
import tiktokIcon from "../../../../assets/icons/tiktok.png";

const ContactInfoBox = () => {
  return (
    <>
      <div className="contact-info-box">

        <div className="contact-info-social-media-container">
          <h5>Duby Drive</h5>
          <div>
            <img src={fbIcon} alt="fb-icon" className='contact-info-social-btn-icons' />
            <img src={instaIcon} alt="insta-icon" className='contact-info-social-btn-icons' />
            {/* <img src={xIcon} alt="x-icon" className='contact-info-social-btn-icons' /> */}
            <img src={youtubeIcon} alt="youtube-icon" className='contact-info-social-btn-icons' />
            <img src={tiktokIcon} alt="tiktok-icon" className='contact-info-social-btn-icons' />
          </div>
        </div>

        <div className="contact-info-details-container">
          <div className="contact-info-details">
            <img src={earthIcon} alt="earth-icon" className='contact-info-details-icon' />
            <span className="page-links contact-info-details-text text-gray">United Arab Emirates</span>
          </div>
          <div className="contact-info-details d-flex align-items-center mb-2">
            <img src={pinIcon} alt="pin-icon" className='contact-info-details-icon' />
            <span className="page-links contact-info-details-text text-gray">1309 Coffeen Avenue STE 1200 Sheridan, Wyoming 82801</span>
          </div>
          <div className="contact-info-details">
            <img src={phoneIcon} alt="phone-icon" className='contact-info-details-icon' />
            <span className="page-links contact-info-details-text text-gray">+971-50-571-4766</span>
          </div>
          <div className="contact-info-details">
            <img src={emailIcon} alt="email-icon" className='contact-info-details-icon' />
            <span className="page-links contact-info-details-text text-gray">sales@dubydrive.com</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfoBox;