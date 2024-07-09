import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import CompanyDetailsPageBannerOne from "../../../components/banners/company-details-page-banner-one";
import CarCardSlider from "../../../components/carousels/car_cards";

import daysData from "../../../json/days/days.json";

import callIcon from "../../../assets/icons/call.png";
import sendIcon from "../../../assets/icons/send.png";
import whatsappIcon from "../../../assets/icons/whatsapp.png";
import copyIcon from "../../../assets/icons/copy.png";
import phoneIcon from "../../../assets/icons/phone-call.png";
import emailIcon from "../../../assets/icons/email.png";
import walletIcon from "../../../assets/icons/wallet.png";
import clockIcon from "../../../assets/icons/clock.png";
import downIcon from "../../../assets/icons/down-arrow.png";
import carIcon from "../../../assets/icons/type.png";
import nextIcon from "../../../assets/icons/next-arrow.png";
import homeIcon from "../../../assets/icons/home.png";
import companyIcon from "../../../assets/icons/company.png";
import timeIcon from "../../../assets/icons/time.png";
import infoIcon from "../../../assets/icons/info-button.png";

import fbIcon from "../../../assets/icons/facebook.png";
import instaIcon from "../../../assets/icons/instagram.png";
import xIcon from "../../../assets/icons/x.png";
import youtubeIcon from "../../../assets/icons/youtube.png";
import tiktokIcon from "../../../assets/icons/tiktok.png";
import linkedinColor from "../../../assets/icons/linkedin-color.png";

import axios from 'axios';
import { Tooltip } from 'react-tooltip';

import { Helmet } from 'react-helmet';

const SectionOne = () => {

    const navigate = useNavigate();

    const [copyLink, setCopyLink] = useState("");
    const [dealerContactNumber, setDealerContactNumber] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const [timeBarStatus, setTimeBarStatus] = useState(false);

    const [data, setData] = useState(null);

    const [daysJsonData, setDaysJsonData] = useState(daysData);

    const [faqData, setFaqData] = useState([]);

    const fetchingFaqData = async (vendorId) => {
        try {
            let response = await axios({
                method: 'POST',
                url: `${process.env.React_App_Host_Url}/api/get/data/fAQ/by/vendorId`,
                data: { vendorId }
            });
            // console.log(response);
            if (response.status == 200) {
                setFaqData(response.data.data);
            }
        } catch (error) {
            // console.log('Failed while fetching faq data: ', error);
        }
    };

    const fetchingDealerDataById = async (id) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/venders/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                setData(response.data.data);
                fetchingFaqData(response.data.data.id);
            }
        } catch (error) {
            // console.log('Failed while fetching dealer data by id: ', error);
        }
    };

    const copyUrlHandler = async () => {

        const currentUrl = window.location.href;

        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/post/url`,
                data: { currentUrl }
            });
            // console.log(response);
            if (response.status == 200) {
                let generatedUrl = response.data.redirectingUrl;
                // navigator.clipboard.writeText(generatedUrl);
                // toast.success(`${generatedUrl} coppied to clipboard`);
                setCopyLink(generatedUrl);
            }
        } catch (error) {
            console.log('Failed while calling copy url api: ', error);
            toast.error('Something went wrong');
        }
    };

    const contactOnWhatsapp = async () => {

        const currentUrl = window.location.href;

        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/post/url`,
                data: { currentUrl }
            });
            // console.log(response);
            if (response.status == 200) {
                let generatedUrl = response.data.redirectingUrl;
                window.open(`https://api.whatsapp.com/send/?phone=${data.whatsAppNumber}&text=Hi, I've seen your profile at dubydrive.com ${generatedUrl}v&type=phone_number&app_absent=0`, "_blank")
            }
        } catch (error) {
            console.log('Failed while contacting dealer on whatsapp: ', error);
            toast.error('Failed while contacting to dealer on whatsapp');
        }
    };

    useEffect(() => {
        const searchParamsID = searchParams.get('dealer_id');

        // console.log('Dealer ID: ', searchParamsID);

        if (searchParamsID) {
            fetchingDealerDataById(searchParamsID);
        };
    }, []);

    return (
        <>
            {
                data !== null ?
                    <Helmet>
                        <meta name="description" content={data.metaDescription} />
                        <meta name="keywords" content={data.metaKeywords} />
                        <title>Duby Drive |  {data.companyName}</title>
                    </Helmet>
                    :
                    ''
            }
            <ToastContainer theme="dark" style={{ width: 360 }} />
            <Tooltip id='vender_contact' />
            <Tooltip id='vender_whatsapp' />
            <Tooltip id='vender_email' />

            <div className='company-details-section-one'>
                {data !== null ?
                    <div className="row company-details-section-row">
                        <div className="col-md-9 company-details-row-section-one">
                            <div>
                                <h2>{data.companyName}</h2>
                                <p>{data.description}</p>
                            </div>
                            <div className='company-details-section-one-body'>
                                <div className='company-details-section-one-body-sub-header'>
                                    <h4>Company Details</h4>
                                </div>

                                <div className='row-details row-details-company-details'>
                                    <div className="col-md-4">
                                        <h5 className='row-details-text'><img src={phoneIcon} alt="row-details-icon" className='row-details-icon' /> Phone</h5>
                                    </div>
                                    <div className="col-md-8">
                                        <h6 className='primary_text_color'>{data.contactNumber}</h6>
                                    </div>
                                </div>
                                <div className='row-details row-details-company-details'>
                                    <div className="col-md-4">
                                        <h5 className='row-details-text'><img src={emailIcon} alt="row-details-icon" className='row-details-icon' /> Email</h5>
                                    </div>
                                    <div className="col-md-8">
                                        <h6 className='primary_text_color'>{data.emailAddress}</h6>
                                    </div>
                                </div>
                                <div className='row-details row-details-company-details'>
                                    <div className="col-md-4">
                                        <h5 className='row-details-text'><img src={walletIcon} alt="row-details-icon" className='row-details-icon' /> Payment Mode</h5>
                                    </div>
                                    <div className="col-md-8">
                                        <div className='row-details-items-container'>
                                            <div className='row-details-items row-details-responsive-items'><span className='para'>Credit Card</span></div>
                                            <div className='row-details-items row-details-responsive-items'><span className='para'>Debit Card</span></div>
                                            <div className='row-details-items row-details-responsive-items'><span className='para'>Cash</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row-details row-details-company-details'>
                                    <div className="col-md-4">
                                        <h5 className='row-details-text'><img src={infoIcon} alt="row-details-icon" className='row-details-icon' /> Social Links</h5>
                                    </div>
                                    <div className="col-md-8">
                                        {
                                            data.tiktokUrl !== "" ?
                                                <img onClick={() => { window.open(data.tiktokUrl, "_blank"); }} className='row-details-items-social-links links' src={tiktokIcon} alt="social-media-icon" style={{ height: 20, width: 20 }} />
                                                :
                                                ''
                                        }
                                        {
                                            data.facebookUrl !== "" ?
                                                <img onClick={() => { window.open(data.facebookUrl, "_blank"); }} className='row-details-items-social-links ms-4 links' src={fbIcon} alt="social-media-icon" style={{ height: 25, width: 25 }} />
                                                :
                                                ''
                                        }
                                        {
                                            data.linkedinUrl !== "" ?
                                                <img onClick={() => { window.open(data.linkedinUrl, "_blank"); }} className='row-details-items-social-links ms-4 links' src={linkedinColor} alt="social-media-icon" style={{ height: 20, width: 20 }} />
                                                :
                                                ''
                                        }
                                        {
                                            data.youtubeUrl !== "" ?
                                                <img onClick={() => { window.open(data.youtubeUrl, "_blank"); }} className='row-details-items-social-links ms-4 links' src={youtubeIcon} alt="social-media-icon" style={{ height: 25, width: 22 }} />
                                                :
                                                ''
                                        }
                                        {
                                            data.instagramUrl !== "" ?
                                                <img onClick={() => { window.open(data.instagramUrl, "_blank"); }} className='row-details-items-social-links ms-4 links' src={instaIcon} alt="social-media-icon" style={{ height: 20, width: 20 }} />
                                                :
                                                ''
                                        }
                                        {
                                            data.twitterUrl !== "" ?
                                                <img onClick={() => { window.open(data.twitterUrl, "_blank"); }} className='row-details-items-social-links ms-4 links' src={xIcon} alt="social-media-icon" style={{ height: 20, width: 20 }} />
                                                :
                                                ''
                                        }
                                    </div>
                                </div>

                                <div className='row-details-timings'>
                                    <div className="col-md-4">
                                        <h5 className='row-details-text'><img src={timeIcon} alt="row-details-icon" className='row-details-icon' /> Shop Timings</h5>
                                    </div>
                                    <div className="col-md-12 row-details-timebar" onClick={() => { setTimeBarStatus(!timeBarStatus) }}>
                                        <div>
                                            <img src={clockIcon} alt="time-icon" className='row-details-time-icon' /><span className='timebar-btn-text'>Timings</span>
                                        </div>
                                        <div className='time-bar-btn-icon-container'>
                                            <img src={timeBarStatus == false ? nextIcon : downIcon} alt="timebar-btn-icon" className='timebar-btn-icon' />
                                        </div>
                                    </div>
                                </div>
                                <div className='timebar-content-list col-md-12' style={{ display: timeBarStatus == true ? 'block' : 'none' }}>
                                    {
                                        daysJsonData.length > 0 ?
                                            daysData.map((item, index) => {
                                                return (
                                                    <div key={index} className='timebar-content-row'>
                                                        <div className="col-md-4 timebar-content-details-one">
                                                            <span style={{ fontWeight: new Date().getDay() == index ? '600' : '' }}>{item.day}</span>
                                                        </div>
                                                        <div className="col-md-8 timebar-content-details-two">
                                                            <span style={{ fontWeight: new Date().getDay() == index ? '600' : '' }}>{item.timings}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                            :
                                            ''
                                    }
                                </div>
                            </div>
                            <div className='company-details-section-one-footer'>
                                <div className='company-details-section-one-footer-header'>
                                    <h4 className='company-details-section-one-footer-heading'>Location Details</h4>
                                </div>

                                <div className='company-details-section-one-location-details'>
                                    <div className="col-md-4">
                                        <h5 className='row-details-text'><img src={homeIcon} alt="row-details-icon" className='row-details-icon' /> Address:</h5>
                                    </div>
                                    <div className="col-md-8">
                                        <h6 className="text-gray">{data.address}</h6>
                                    </div>
                                </div>
                                <div>
                                    <iframe
                                        src={data.dealerMapLink}
                                        height={350}
                                        width={'100%'}
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 company-details-row-section-two">
                            <div className='company-details-section-one-dealer-contact-container'>
                                <div>
                                    <h6 className='text-center'>Contact the Company Directly</h6>
                                </div>
                                <div className='company-details-section-one-dealer-contact-btn-box'>
                                    {/* <a data-tooltip-id="vender_contact" data-tooltip-content={data.contactNumber} className="company-details-section-one-dealer-contact-btn primary_background_color"> */}
                                    <a onClick={() => { setDealerContactNumber(data.contactNumber) }} data-tooltip-id="vender_contact" data-tooltip-content={data.contactNumber} className="company-details-section-one-dealer-contact-btn primary_background_color">
                                        <img src={callIcon} alt="contact-icon" className='company-details-section-one-dealer-contact-btn-icon' />
                                    </a>
                                    <a data-tooltip-id="vender_email" data-tooltip-content={data.emailAddress} href={`mailto:${data !== null ? data.emailAddress : ''}?body=Hello can i get more info about Duby Drive`} className="company-details-section-one-dealer-contact-btn background-orange">
                                        <img src={sendIcon} alt="contact-icon" className='company-details-section-one-dealer-contact-btn-icon' />
                                    </a>
                                    <a onClick={contactOnWhatsapp} data-tooltip-id="vender_whatsapp" data-tooltip-content={data.whatsAppNumber} className="company-details-section-one-dealer-contact-btn background-green">
                                        <img src={whatsappIcon} alt="contact-icon" className='company-details-section-one-dealer-contact-btn-icon' />
                                    </a>
                                </div>

                                {
                                    dealerContactNumber == "" ? ''
                                        :
                                        <div className='text-center mt-3'>
                                            <p className='primary_text_color'>{dealerContactNumber}</p>
                                        </div>
                                }

                                <div className='dealer-url-copy-btn-container'>
                                    <b onClick={copyUrlHandler} className="page-links text-center">Copy dealer url to clipboard</b>
                                    {/* <img src={copyIcon} alt="copy-icon" /> */}
                                </div>

                                {
                                    copyLink == "" ? '' :
                                        <div className='text-center mt-4'>
                                            <p className='primary_text_color mb-0'>{copyLink}</p>
                                        </div>
                                }

                            </div>

                            <div className='company-details-section-one-dealer-logo-container'>
                                {/* <img src={require('../../../assets/images/brands/kia.png')} alt="dealer-logo" /> */}
                                <img src={`${process.env.React_App_Host_Url}/images/dealers-logo/${data.companyLogo}`} alt="dealer-logo" />
                            </div>

                            <div className="d-flex justify-content-center mt-5">
                                <CompanyDetailsPageBannerOne />
                            </div>

                        </div>

                        {/* Mobile Responsive */}
                        <div className='company-details-mobile-contact-btn-container'>
                            <div className='company-details-section-one-dealer-contact-btn-box w-100'>
                                {/* <a data-tooltip-id="vender_contact" data-tooltip-content={data.contactNumber} className="company-details-section-one-dealer-contact-btn primary_background_color"> */}
                                <a onClick={() => { setDealerContactNumber(data.contactNumber) }} data-tooltip-id="vender_contact" data-tooltip-content={data.contactNumber} className="company-details-section-one-dealer-contact-btn primary_background_color">
                                    <img src={callIcon} alt="contact-icon" className='company-details-section-one-dealer-contact-btn-icon' />
                                </a>
                                <a data-tooltip-id="vender_email" data-tooltip-content={data.emailAddress} href={`mailto:${data !== null ? data.emailAddress : ''}?body=Hello can i get more info about Duby Drive`} className="company-details-section-one-dealer-contact-btn background-orange">
                                    <img src={sendIcon} alt="contact-icon" className='company-details-section-one-dealer-contact-btn-icon' />
                                </a>
                                <a onClick={contactOnWhatsapp} data-tooltip-id="vender_whatsapp" data-tooltip-content={data.whatsAppNumber} className="company-details-section-one-dealer-contact-btn background-green">
                                    <img src={whatsappIcon} alt="contact-icon" className='company-details-section-one-dealer-contact-btn-icon' />
                                </a>
                            </div>
                        </div>

                    </div>
                    :
                    ""
                }
            </div>

            {
                data !== null ?
                    <>
                        <div className='home-section-four pt-0'>
                            <h3 className="ms-3 mb-0">Explore Dealer Cars:</h3>
                            <div className="car-cards-container mt-0">
                                <CarCardSlider dealerCompanyId={data.id} />
                            </div>
                        </div>
                        <div id="car-details-faq-section" className='home-section-twelve col-md-12 company-details-faq-section' style={{ marginTop: -100 }}>
                            <h2 className='mb-4'>Frequently Asked Questions</h2>
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                {
                                    faqData.length > 0 ?
                                        faqData.map((item, index) => {
                                            return (
                                                <div key={index} className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button
                                                            className="accordion-button collapsed"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target={`#flush-collapse${index}`}
                                                            aria-expanded="false"
                                                            aria-controls={`flush-collapse${index}`}
                                                        >
                                                            {item.faqHeading}
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id={`flush-collapse${index}`}
                                                        className="accordion-collapse collapse"
                                                        data-bs-parent="#accordionFlushExample"
                                                    >
                                                        <div className="accordion-body">
                                                            {item.faqDescription}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                        :
                                        ''
                                }
                            </div>
                            <div className='section-twelve-footer'>
                                <p className='section-twelve-footer-text'>DubyDrive.com is your trusted and reliable resource in the UAE. For more info, check out our complete list of <span onClick={() => { navigate('/frequently_asked_questions') }} className='primary_text_color links'>Dubai Car Rental FAQs.</span></p>
                            </div>
                        </div>
                    </>
                    :
                    ''
            }
        </>
    );
};

export default SectionOne;