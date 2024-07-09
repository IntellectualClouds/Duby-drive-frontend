import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import HomePageBannerOne from '../../../components/banners/home-page-banner-one';
import HomePageBannerTwo from '../../../components/banners/home-page-banner-two';
import HomePageBannerThree from '../../../components/banners/home-page-banner-three';

import nextIcon from "../../../assets/icons/next.png";

import CarCardSlider from '../../../components/carousels/car_cards';

const SectionFour = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='home-section-four'>
                <div className="section-four-header">
                    <h3>Find all exclusive car rental services near you</h3>
                    <button onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ category: 'allCategory' })}` }) }} className="btn primary_background_color text-white ">View all <img src={nextIcon} className='ms-1' alt="next-icon" height={15} width={15} /></button>
                </div>
                <p className="para mb-0">
                    Compare price with all other car rental businesses near you to find the best rental deals available.
                </p>
                <div className="car-cards-container mt-0">
                    <CarCardSlider fetchBy='allCategory' />
                </div>
                <HomePageBannerOne />

                <div className="section-four-header mt-5">
                    <h3 className='primary_text_color'>Find all feature and verified car rental services near you</h3>
                    <button onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ category: 'featuredAndVerified' })}` }) }} className="btn primary_background_color text-white ">View all <img src={nextIcon} className='ms-1' alt="next-icon" height={15} width={15} /></button>
                </div>
                <p className="para mb-0">
                    Compare price with all other car rental businesses near you to find the best rental deals available.
                </p>
                <div className="car-cards-container mt-0">
                    <CarCardSlider fetchBy='featuredAndVerified' />
                </div>
                <HomePageBannerTwo />

                <div className="section-four-header mt-5">
                    <h3 className='primary_text_color'>Find all verified car rental services near you</h3>
                    <button onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ category: 'verified' })}` }) }} className="btn primary_background_color text-white ">View all <img src={nextIcon} className='ms-1' alt="next-icon" height={15} width={15} /></button>
                </div>
                <p className="para mb-0">
                    Compare price with all other car rental businesses near you to find the best rental deals available.
                </p>
                <div className="car-cards-container mt-0">
                    <CarCardSlider fetchBy='verified' />
                </div>
                <HomePageBannerThree />
            </div>
        </>
    );
};

export default SectionFour;