import React, { useState } from 'react';

import testimonials from "../../../json/testimonials/testimonials.json";

import starIcon from "../../../assets/icons/star.png";
import right_angle_icon from "../../../assets/icons/angle-right.png";

import HomePageBannerFour from '../../../components/banners/home-page-banner-four';

const SectionSeven = () => {

    const [testimonialsData, setTestimonialsData] = useState(testimonials);

    return (
        <>
            <HomePageBannerFour />

            <div className='home-section-seven'>
                <div className="section-seven-header">
                    <h1 className='section-seven-heading'>Testimonials</h1>
                </div>
                <p className="para text-center text-white">The experiences shared by our distinguished users have always helped us up our game. The DubyDrive Marketplace is often reengineered as we follow a "Listen Understand Improve" cycle</p>

                <div className="testimonials-section text-center">
                    <img src={require(`../../../assets/testimonial_users/${testimonials[0].profileImg}`)} alt="profile-icon" className='profile-icon' />

                    <p className="user-name">{testimonialsData[0].userName}</p>
                    <p className="testimonial-date text-gray">{testimonialsData[0].date}</p>

                    <div className="reviews">
                        <img src={starIcon} alt="star-icon" className='star-icon' height={100} width={100} />
                        <img src={starIcon} alt="star-icon" className='star-icon' height={100} width={100} />
                        <img src={starIcon} alt="star-icon" className='star-icon' height={100} width={100} />
                        <img src={starIcon} alt="star-icon" className='star-icon' height={100} width={100} />
                        <img src={starIcon} alt="star-icon" className='star-icon' height={100} width={100} />
                    </div>

                    <h4 className='text-white'>{testimonialsData[0].heading}</h4>

                    <p className='text-white'>{testimonialsData[0].text}</p>

                    <a href="#top" className="links read-all-reviews-link">Real all reviews <img src={right_angle_icon} alt="right-icon" className='right-angle-icon' /><img src={right_angle_icon} alt="right-icon" className='right-angle-icon' /></a>
                </div>

            </div>

            <div className='reviews-container primary_background_color'>
                <div className='ratings'>
                    <img src={starIcon} alt="rating-icon" className='rating-icon' />
                    <img src={starIcon} alt="rating-icon" className='rating-icon' />
                    <img src={starIcon} alt="rating-icon" className='rating-icon' />
                    <img src={starIcon} alt="rating-icon" className='rating-icon' />
                    <img src={starIcon} alt="rating-icon" className='rating-icon' />
                </div>
                <div className='reviews-details'>
                    <h3 className='mb-0 text-white'>5 out of 5</h3>
                    <p className='mb-0 text-white'>based on 704 ratings</p>
                </div>
            </div>
        </>
    );
};

export default SectionSeven;