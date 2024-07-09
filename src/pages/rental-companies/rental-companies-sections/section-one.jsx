import React, { useEffect, useState } from 'react';

import { useNavigate, createSearchParams } from 'react-router-dom';

import emailIcon from "../../../assets/icons/email.png";
import homeIcon from "../../../assets/icons/home.png";
import phoneIcon from "../../../assets/icons/phone-call.png";

import fbIcon from "../../../assets/icons/facebook.png";
import instaIcon from "../../../assets/icons/instagram.png";
import xIcon from "../../../assets/icons/x.png";
import youtubeIcon from "../../../assets/icons/youtube.png";
import tiktokIcon from "../../../assets/icons/tiktok.png";
import linkedinColor from "../../../assets/icons/linkedin-color.png";
import axios from 'axios';

import RentalDirectoryPageBannerOne from "../../../components/banners/rental-directory-page-banner-one";

const SectionOne = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const fetchingRentalCompaniesApi = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `${process.env.React_App_Host_Url}/api/get/data/venders`
            });
            // console.log(response);
            if (response.status == 200) {
                setData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching rental companies api: ', error);
        }
    };

    useEffect(() => {
        fetchingRentalCompaniesApi();
    }, []);

    return (
        <>
            <div className="rental-companies-section-one">
                <div className="rental-companies-section-one-sub-section">
                    <div className="rental-companies-section-one-header">
                        <h3>Car Rental Companies Directory in Dubai</h3>
                    </div>

                    <div className="rental-companies-section-one-body">
                        <div className="rental-companies-section-one-list-container col-md-8">
                            {data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <div onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: item.id })}` }) }} key={index} className='rental-companies-section-one-list-item'>
                                            <div className='rental-companies-section-one-list-item-header flex-wrap'>
                                                <div>
                                                    <img src={`${process.env.React_App_Host_Url}/images/dealers-logo/${item.companyLogo}`} className='rental-companies-section-one-list-item-dealer-logo' alt="dealer-logo" />
                                                    <h3 className='mb-0'>{item.companyName}</h3>
                                                </div>
                                                <div className='social-links-container-rental-companies'>
                                                    {
                                                        item.tiktokUrl !== "" ?
                                                            <img onClick={() => { window.open(item.tiktokUrl, "_blank"); }} className='links' src={tiktokIcon} alt="social-media-icon" style={{ height: 20, width: 20 }} />
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.facebookUrl !== "" ?
                                                            <img onClick={() => { window.open(item.facebookUrl, "_blank"); }} className='ms-3 links' src={fbIcon} alt="social-media-icon" style={{ height: 25, width: 25 }} />
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.linkedinUrl !== "" ?
                                                            <img onClick={() => { window.open(item.linkedinUrl, "_blank"); }} className='ms-3 links' src={linkedinColor} alt="social-media-icon" style={{ height: 20, width: 20 }} />
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.youtubeUrl !== "" ?
                                                            <img onClick={() => { window.open(item.youtubeUrl, "_blank"); }} className='ms-3 links' src={youtubeIcon} alt="social-media-icon" style={{ height: 25, width: 22 }} />
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.instagramUrl !== "" ?
                                                            <img onClick={() => { window.open(item.instagramUrl, "_blank"); }} className='ms-3 links' src={instaIcon} alt="social-media-icon" style={{ height: 20, width: 20 }} />
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.twitterUrl !== "" ?
                                                            <img onClick={() => { window.open(item.twitterUrl, "_blank"); }} className='ms-3 links' src={xIcon} alt="social-media-icon" style={{ height: 20, width: 20 }} />
                                                            :
                                                            ''
                                                    }
                                                </div>
                                            </div>
                                            <div className='rental-companies-section-one-list-item-body'>
                                                <div className='rental-companies-section-one-list-item-details'>
                                                    <img src={homeIcon} alt="home-icon" />
                                                    <span className="para">{item.address}</span>
                                                </div>
                                                <div className='rental-companies-section-one-list-item-details'>
                                                    <img src={emailIcon} alt="email-icon" />
                                                    <span className="para">{item.emailAddress}</span>
                                                </div>
                                                <div className='rental-companies-section-one-list-item-details'>
                                                    <img src={phoneIcon} alt="phone-icon" />
                                                    <span className="para">{item.contactNumber}</span>
                                                </div>
                                            </div>
                                            <div className='rental-companies-section-one-list-item-footer'>
                                                <a onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: item.id })}` }) }} className='links primary_text_color'>More info...</a>
                                            </div>
                                        </div>
                                    );
                                })
                                :
                                ''
                            }
                        </div>
                        <div className="rental-companies-section-one-banner-portion-container col-md-4">
                            <div className="d-flex justify-content-end mt-4">
                                <RentalDirectoryPageBannerOne />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionOne;

