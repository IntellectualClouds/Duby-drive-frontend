import React, { useState, useEffect } from 'react';

import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';

import { Helmet } from 'react-helmet';

import CarDetailsPageBannerOne from "../../../components/banners/car-details-page-banner-one";

import daysData from "../../../json/days/days.json";

import defaultCarImg from "../../../assets/images/on-error/default-car.png";

import typeIcon from "../../../assets/icons/type.png";
import seatIcon from "../../../assets/icons/seat.png";
import doorIcon from "../../../assets/icons/door.png";
import fuelIcon from "../../../assets/icons/fuel.png";
import dropIcon from "../../../assets/icons/drop.png";
import infoIcon from "../../../assets/icons/info-button.png";
import specIcon from "../../../assets/icons/specs.png";
import insuranceIcon from "../../../assets/icons/insurance.png";
import transmissionIcon from "../../../assets/icons/transmission.png";
import luggageIcon from "../../../assets/icons/luggage.png";
import moreIcon from "../../../assets/icons/more.png";

import userIcon from "../../../assets/icons/user.png";

import callIcon from "../../../assets/icons/call.png";
import whatsappIcon from "../../../assets/icons/whatsapp.png";
import sendIcon from "../../../assets/icons/send.png";

import linkIcon from "../../../assets/icons/link.png";
import reportIcon from "../../../assets/icons/report.png";

import nextIcon from "../../../assets/icons/next-angle-arrow.png";
import previousIcon from "../../../assets/icons/previous-angle-arrow.png";

import moneyIcon from "../../../assets/icons/money.png";
import roadIcon from "../../../assets/icons/road.png";

import homeIcon from "../../../assets/icons/home.png";

import phoneIcon from "../../../assets/icons/phone-call.png";
import emailIcon from "../../../assets/icons/email.png";
import walletIcon from "../../../assets/icons/wallet.png";
import clockIcon from "../../../assets/icons/clock.png";
import downIcon from "../../../assets/icons/down-arrow.png";

import closeIcon from "../../../assets/icons/close.png";
import playIcon from "../../../assets/icons/play.png";

import pinIcon from "../../../assets/icons/pin.png";

import nextBtn from "../../../assets/icons/next.png";
import previousBtn from "../../../assets/icons/previous.png";

import tickIcon from "../../../assets/icons/tick.png";

import companyIcon from "../../../assets/icons/company.png";

import docsIcon from "../../../assets/icons/docs.png";

import childIcon from "../../../assets/icons/child.png";

import speakIcon from "../../../assets/icons/speaking.png";

import nextArrowIcon from "../../../assets/icons/next-arrow.png";
import downArrowIcon from "../../../assets/icons/down-arrow.png";

import shareIcon from "../../../assets/icons/share.png";

import whatsappColoredIcon from "../../../assets/icons/whatsapp-color.png";
import instagramColoredIcon from "../../../assets/icons/instagram-color.png";
import linkedinColoredIcon from "../../../assets/icons/linkedin-color.png";
import facebookColoredIcon from "../../../assets/icons/facebook-color.png";
import tiktokColoredIcon from "../../../assets/icons/tiktok-color.png";
import messengerColoredIcon from "../../../assets/icons/messenger-color.png";
import twitterColoredIcon from '../../../assets/icons/twitter-color.png'
import chatColoredIcon from '../../../assets/icons/chat-color.png'
import gmailColoredIcon from '../../../assets/icons/gmail-color.png'
import linkColoredIcon from '../../../assets/icons/link-color.png'

const SectionOne = () => {

    const navigate = useNavigate();

    const [daysJsonData, setDaysJsonData] = useState(daysData);

    const [copyLink, setCopyLink] = useState("");
    const [dealerContactNumber, setDealerContactNumber] = useState("");

    const [modalDataStatus, setModalDataStatus] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const [carData, setCarData] = useState(null);

    const [carTypeData, setCarTypeData] = useState(null);
    const [carBrandData, setCarBrandData] = useState(null);
    const [dealerData, setDealerData] = useState(null);

    const [citiesData, setCitiesData] = useState([]);
    const [fastDeliveryLocationsData, setFastDeliveryLocationsData] = useState([]);

    const [imageNumber, setImageNumber] = useState(0);

    const [priceTab, setPriceTab] = useState(0);

    const [windowStatus, setWindowStatus] = useState('image');

    const [amenitiesBarOneStatus, setAmenitiesBarOneStatus] = useState(true);
    const [amenitiesBarTwoStatus, setAmenitiesBarTwoStatus] = useState(false);

    const [moreDetailsBar, setMoreDetailsBar] = useState(true);

    const [timeBarStatus, setTimeBarStatus] = useState(false);

    const [sharePopupStatus, setSharePopupStatus] = useState(false);

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

    const fetchingCitiesData = async (cities_id_array) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/cities/by/multiple/id`,
                data: { cities_id_array }
            });
            // console.log(response);
            if (response.status == 200) {
                setCitiesData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching cities data: ', error);
        }
    };

    const fetchingAreasData = async (areas_id_array) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/area/by/multiple/id`,
                data: { areas_id_array }
            });
            // console.log(response);
            if (response.status == 200) {
                setFastDeliveryLocationsData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching area data: ', error);
        }
    };

    const fetchingCarTypeData = async (id) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/carTypes/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                setCarTypeData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car type data api by id: ', error);
        }
    };

    const fetchingCarBrandData = async (id) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/carBrands/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                setCarBrandData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car brand data api by id: ', error);
        }
    };

    const fetchingDealerData = async (id) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/venders/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                setDealerData(response.data.data);
                fetchingCitiesData(response.data.data.cities);
                fetchingAreasData(response.data.data.fastDeliveryLocations);
            }
        } catch (error) {
            console.log('Failed while fetching dealer data api by id: ', error);
        }
    };

    const fetchingCarData = async (id) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                setCarData(response.data.data);
                fetchingCarTypeData(response.data.data.carTypeId);
                fetchingDealerData(response.data.data.dealerCompanyId);
                fetchingCarBrandData(response.data.data.carBrandId);
                fetchingFaqData(response.data.data.dealerCompanyId);
            }
        } catch (error) {
            console.log('Failed while fetching car data api by id: ', error);
        }
    };

    const copyUrlHandler = async (e) => {

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
                // setCopyLink(generatedUrl);
                if (e == 'whatsapp') {
                    window.open(`https://wa.me/?text=${generatedUrl}`, "_blank");
                }
                // else if (e = 'facebook') {
                //     window.open(`fb-messenger://share/?link= ${generatedUrl}`, "_blank");
                // }
                // else if (e = 'instagram') {
                //     // window.open(`instagram://library?AssetPath=${generatedUrl}`, "_blank");
                //     window.open(`tiktok://${generatedUrl}`, "_blank");
                // }
                else if (e = 'linkedin') {
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${generatedUrl}`, "_blank");
                }
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
                window.open(`https://api.whatsapp.com/send/?phone=${dealerData.whatsAppNumber}&text=Hi, I've found your (${carData.carModelNo}) at dubydrive.com. and I'd like to rent the listed car ${generatedUrl} let me know if it's still available?...thanks&type=phone_number&app_absent=0`, "_blank")
            }
        } catch (error) {
            console.log('Failed while contacting dealer on whatsapp: ', error);
            toast.error('Failed while contacting to dealer on whatsapp');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const searchParamsID = searchParams.get('car_id');

        if (searchParamsID) {
            fetchingCarData(searchParamsID);
        };
    }, [searchParams]);

    return (
        <>
            {
                carData !== null ?
                    <Helmet>
                        <meta name="description" content={carData.metaDescription} />
                        <meta name="keywords" content={carData.metaKeywords} />
                        <title>Duby Drive | {carData.carModelNo}</title>
                    </Helmet>
                    :
                    ''
            }
            <ToastContainer theme="dark" style={{ width: 360 }} />
            <Tooltip id="vender_contact" />
            <Tooltip id="vender_whatsapp" />
            <Tooltip id="vender_email" />

            {carData !== null ?
                <div id='car-details-section-one' className="car-details-section-one">
                    <div className="car-details-section-one-body">
                        <div id='car-details-section-one-left-container' className="car-details-section-one-left-container col-md-8">
                            <div id='car-details-section-one-header' className="car-details-section-one-header">
                                <h3 className='mb-4'><img height={40} width={50} className='me-2' src={`${process.env.React_App_Host_Url}/images/car-brands-logo/${carData.carBrandId}.png`} alt="brand-logo" /> Rent {carData.carModelNo} in {citiesData.length > 0 ? citiesData.map((item, index) => { return (<span key={index}>{item.cityName}, </span>) }) : ''}</h3>
                            </div>
                            <div className="img-container">
                                <div className='d-flex justify-content-center align-items-center position-relative'>

                                    {
                                        carData.carPhotosArray !== null ?
                                            <>
                                                <img onClick={() => { document.querySelector('.details-popup-window').classList.add('active-window'); setWindowStatus('image'); }} onError={(e) => { e.target.src = defaultCarImg }} src={`${process.env.React_App_Host_Url}/images/cars-images/${carData.carPhotosArray[imageNumber]}`} alt={carData.carPhotosArray[imageNumber]} width={'100%'} />

                                                <button id='car-details-img-previous-btn' disabled={imageNumber == 0 ? true : false} onClick={() => { setImageNumber(imageNumber - 1) }} className='details-img-previous-btn' style={{ display: imageNumber == 0 ? 'none' : 'block' }}>
                                                    <img src={previousBtn} height={40} width={40} className='links' alt="previous-btn" />
                                                </button>
                                                <button id='car-details-img-next-btn' disabled={imageNumber == carData.carPhotosArray.length - 1 ? true : false} onClick={() => { setImageNumber(imageNumber + 1) }} className='details-img-next-btn' style={{ display: imageNumber == carData.carPhotosArray.length - 1 ? 'none' : 'block', }} >
                                                    <img src={nextBtn} height={40} width={40} className='links' alt="next-btn" />
                                                </button>
                                            </>
                                            :
                                            <img src={defaultCarImg} alt={defaultCarImg} width={'100%'} />
                                    }

                                    {carData !== null ?
                                        <div id='car-details-badges-container' className="car-card-badge-container d-none">
                                            {
                                                carData.category.premium == "premium" ?
                                                    <span className="badge text-bg-dark car-card-badge">Premium</span>
                                                    :
                                                    ''
                                            }
                                            {
                                                carData.category.featured == "featured" ?
                                                    <span className="badge text-bg-warning car-card-badge">Featured</span>
                                                    :
                                                    ''
                                            }
                                            {
                                                carData.category.verified == "verified" ?
                                                    <span className="badge text-bg-success car-card-badge">Verified</span>
                                                    :
                                                    ''
                                            }
                                            {
                                                carData.discountOffer == 0 ?
                                                    ''
                                                    :
                                                    <span className="badge text-bg-light car-card-badge">{carData.discountOffer}% Discount</span>
                                            }
                                        </div>
                                        :
                                        ''
                                    }
                                </div>

                                <div className="more-car-images">
                                    {
                                        carData.carPhotosArray !== null ?
                                            carData.carPhotosArray.length > 0 ?
                                                carData.carPhotosArray.map((item, index) => {
                                                    return (
                                                        <img key={index} onError={(e) => { e.target.src = defaultCarImg }} onClick={() => { setImageNumber(index) }} src={`${process.env.React_App_Host_Url}/images/cars-images/${item}`} alt={item} height={70} width={135} />
                                                    );
                                                })
                                                :
                                                ''
                                            :
                                            ''
                                    }

                                    {carData.carVideoName ?
                                        <div className='video-play-btn' onClick={() => { document.querySelector('.details-popup-window').classList.add('active-window'); setWindowStatus('video'); }}>
                                            <img src={playIcon} height={30} width={30} alt="play-icon" />
                                        </div>
                                        :
                                        ''
                                    }

                                </div>
                            </div>

                            <div className="features-and-specs">
                                <h4 className='mb-3'>Features and Specs</h4>

                                <div className='car-specs-container'>
                                    {/* <div>
                                        <img src={typeIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>{carBrandData !== null ? carBrandData.brandName : carData.carBrandId}</span>
                                    </div> */}
                                    <div>
                                        <img src={typeIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>{carTypeData !== null ? carTypeData.carType : carData.carTypeId}</span>
                                    </div>
                                    <div>
                                        <img src={seatIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>{carData.carSeats} Seats</span>
                                    </div>
                                    <div>
                                        <img src={doorIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>{carData.carDoors} Doors</span>
                                    </div>
                                    <div>
                                        <img src={fuelIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>{carData.carFuelType}</span>
                                    </div>
                                    {/* <div>
                                        <img src={insuranceIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>{carData.insuranceType} Insurance</span>
                                    </div> */}
                                    {/* <div>
                                        <img src={transmissionIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>{carData.autoTransmission == 'Yes' ? 'Auto Transmission' : 'Manual Transmission'}</span>
                                    </div> */}
                                    {carData.carLuggage == 'Yes' ?
                                        <div>
                                            <img src={luggageIcon} alt="spec-icon" className='spec-icon' />
                                            <span className='para'>Luggage</span>
                                        </div>
                                        :
                                        ''
                                    }
                                    {
                                        carData.gccSpecs == 'No' ?
                                            <div>
                                                <img src={specIcon} alt="spec-icon" className='spec-icon' />
                                                <span className='para'>GCC Specs</span>
                                            </div>
                                            :
                                            ''
                                    }
                                    {/* <div>
                                        <img src={infoIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>{carData.carLicense}</span>
                                    </div> */}
                                    <div>
                                        <img onClick={() => { setModalDataStatus('specs'); document.querySelector('.car-features-modal').classList.add('active-features-modal') }} src={moreIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>More</span>
                                    </div>
                                </div>
                            </div>

                            <div className='car-details-mobile-view-section d-none'>
                                <div className="car-details-and-info-card mt-4">
                                    <div className="car-details-and-info-card-body mt-3">
                                        <div className="car-price-details-tab-container">
                                            <div style={{ backgroundColor: priceTab == 0 ? 'white' : 'whitesmoke', borderTop: priceTab == 0 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(0) }} className="car-price-details-tab">
                                                <span className='text-center'>Daily <br /> Price</span>
                                            </div>
                                            <div style={{ backgroundColor: priceTab == 1 ? 'white' : 'whitesmoke', borderTop: priceTab == 1 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(1) }} className="car-price-details-tab car-price-details-tab-second">
                                                <span className='text-center'>Weekly Price</span>
                                            </div>
                                            <div style={{ backgroundColor: priceTab == 2 ? 'white' : 'whitesmoke', borderTop: priceTab == 2 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(2) }} className="car-price-details-tab">
                                                <span className='text-center'>Monthly Price</span>
                                            </div>
                                        </div>
                                        <div className="car-details-security-deposit-contanier">
                                            <div>
                                                <span>{priceTab == 0 ? 'Per Day' : priceTab == 1 ? 'Weekly' : priceTab == 2 ? 'Monthly' : ''} rental price</span>
                                                <span>{priceTab == 0 ? carData.perDayRentalCost : priceTab == 1 ? carData.weeklyRentalCost : priceTab == 2 ? carData.monthlyRentalCost : ''} AED</span>
                                            </div>
                                            <div>
                                                <span>{priceTab == 0 ? 'Per Day' : priceTab == 1 ? 'Weekly' : priceTab == 2 ? 'Monthly' : ''} Mileage limit</span>
                                                <span>{priceTab == 0 ? `${carData.perDayMilagelimit} KM` : priceTab == 1 ? `${carData.weeklyMilageLimit} KM` : priceTab == 2 ? `${carData.monthlyMilageLimit} KM` : ''}</span>
                                            </div>
                                            <div>
                                                <span>Additional Mileage Charges</span>
                                                <span>{carData.additionalMilageCharges} AED</span>
                                            </div>
                                            <div>
                                                <span>Salik / Toll Charges</span>
                                                <span>{carData.carToolsCharges} AED</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car-details-and-info-card-footer">
                                        <p className='primary_text_color text-center'>{copyLink}</p>
                                        <span className='page-links' onClick={() => { setModalDataStatus('info'); document.querySelector('.car-features-modal').classList.add('active-features-modal') }}>Supplier Note: + 5% VAT applicable, We have</span>
                                        <span className='page-links' onClick={() => { setModalDataStatus('info'); document.querySelector('.car-features-modal').classList.add('active-features-modal') }}>the latest models for SUV, Sedan...</span>
                                    </div>
                                </div>

                                <div className='buttons-container'>
                                    <button className='btn primary_background_color text-white' style={{ width: 170 }} onClick={copyUrlHandler}>Copy Link <img src={linkIcon} alt="link-icon" height={20} width={20} /></button>
                                    <button className='btn background-dark text-white' style={{ width: 170 }} onClick={() => { navigate('/report_form', { state: carData.id }) }}>Send Report <img src={reportIcon} alt="link-icon" height={20} width={20} /></button>
                                </div>

                                <div className='col-md-10 mt-4'>
                                    <div className="col-md-12 row-details-timebar" onClick={() => { setTimeBarStatus(!timeBarStatus) }}>
                                        <div>
                                            <img src={clockIcon} alt="time-icon" className='row-details-time-icon' /><span className='timebar-btn-text'>Timings</span>
                                        </div>
                                        <div className='time-bar-btn-icon-container'>
                                            <img src={timeBarStatus == false ? nextIcon : downIcon} alt="timebar-btn-icon" className='timebar-btn-icon' />
                                        </div>
                                    </div>
                                    <div className='timebar-content-list col-md-12' style={{ display: timeBarStatus == true ? 'block' : 'none' }}>
                                        {
                                            daysJsonData.length > 0 ?
                                                daysData.map((item, index) => {
                                                    return (
                                                        <div key={index} className='timebar-content-row justify-content-between'>
                                                            <div className="col-md-4 timebar-content-details-one">
                                                                <span style={{ fontWeight: new Date().getDay() == index ? '600' : '' }}>{item.day}</span>
                                                            </div>
                                                            <div className="col-md-8 timebar-content-details-two">
                                                                <span style={{ fontWeight: new Date().getDay() == index ? '600' : '' }}>{item.time}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                                :
                                                ''
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div onClick={() => { setAmenitiesBarOneStatus(!amenitiesBarOneStatus) }} className="amenities-bar">
                                    <span className={amenitiesBarOneStatus == false ? 'para' : 'primary_text_color'}>Car Description and Highlights</span>
                                    <b className='para'>{amenitiesBarOneStatus == true ? '-' : '+'}</b>
                                </div>
                                <div className="amenities-bar-details" style={{ display: amenitiesBarOneStatus == true ? 'flex' : 'none' }}>
                                    <p className='text-justify' dangerouslySetInnerHTML={{ __html: carData.description }}></p>
                                </div>
                            </div>

                            <div className='ms-2 mt-2' onClick={() => { setMoreDetailsBar(!moreDetailsBar) }}><span className='page-links'>See {moreDetailsBar == true ? 'less' : 'more'}...</span></div>

                            {
                                dealerData !== null ?
                                    <div id='car-more-details-section' className='company-details-section-one-body mt-5'>
                                        <div onClick={() => { setMoreDetailsBar(!moreDetailsBar) }} className='company-details-section-one-body-sub-header d-flex justify-content-between align-items-center'>
                                            <h4>More Details</h4>
                                            <img src={moreDetailsBar == false ? nextArrowIcon : downArrowIcon} alt="arrow-icon" height={30} width={30} />
                                        </div>
                                        <div style={{ display: moreDetailsBar == true ? 'block' : 'none' }}>
                                            <div id='car-details-row-details' className='row-details'>
                                                <div className="col-md-4">
                                                    <h5 className='row-details-text mb-0'><img src={typeIcon} alt="row-details-icon" className='row-details-icon' /> <b>AED {carData.perDayRentalCost}/ Day</b></h5>
                                                </div>
                                                <div className="col-md-8 d-flex align-items-center">
                                                    <div className='row-details-items'><img src={tickIcon} alt="tick-icon" className='row-details-icon' /><span className='para'>1 day rental</span></div>
                                                    <div className='row-details-items'><img src={tickIcon} alt="tick-icon" className='row-details-icon' /><span className='para'>Insurance Included</span></div>
                                                </div>
                                            </div>
                                            <div id='car-details-row-details' className='row-details'>
                                                <div className="col-md-4">
                                                    <h5 className='row-details-text mb-0'><img src={homeIcon} alt="row-details-icon" className='row-details-icon' /> Delivery & Pickup</h5>
                                                </div>
                                                <div className="col-md-8 d-flex align-items-center">
                                                    {/* <div className='row-details-items'><img src={childIcon} alt="child-icon" className='row-details-icon' /><span className='para'>Branch Pickup</span></div>
                                                    <div className='row-details-items'><img src={typeIcon} alt="car-icon" className='row-details-icon' /><span className='para'>Delivery to you</span></div> */}
                                                    {dealerData.deliveryAndPickup.length > 0 ?
                                                        dealerData.deliveryAndPickup.map((item, index) => {
                                                            return (
                                                                <div key={index} className='row-details-items' onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: carData.dealerCompanyId })}` }) }}><img src={typeIcon} alt="car-icon" className='row-details-icon' /><span className='para'>{item}</span></div>
                                                            )
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </div>
                                            </div>
                                            <div id='car-details-row-details' className='row-details'>
                                                <div className="col-md-4">
                                                    <h5 className='row-details-text mb-0'><img src={pinIcon} alt="row-details-icon" className='row-details-icon' /> Branch Location</h5>
                                                </div>
                                                <div className="col-md-8">
                                                    <h6 className='page-links' onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: carData.dealerCompanyId })}` }) }}>{dealerData.address}...</h6>
                                                </div>
                                            </div>
                                            <div id='car-details-row-details' className='row-details'>
                                                <div className="col-md-4">
                                                    <h5 className='row-details-text'><img src={speakIcon} alt="row-details-icon" className='row-details-icon' /> Languages Spoken</h5>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className='row-details-items-container'>
                                                        {/* <div className='row-details-items'><span className='para'>English</span></div>
                                                        <div className='row-details-items'><span className='para'>Arabic</span></div>
                                                        <div className='row-details-items'><span className='para'>French</span></div>
                                                        <div className='row-details-items'><span className='para'>Azerbaijan</span></div> */}
                                                        {dealerData.languageSpoken.length > 0 ?
                                                            dealerData.languageSpoken.map((item, index) => {
                                                                return (
                                                                    <div key={index} className='row-details-items'><span className='para'>{item}</span></div>
                                                                )
                                                            })
                                                            :
                                                            ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div id='car-details-row-details' className='row-details'>
                                                <div className="col-md-4">
                                                    <h5 className='row-details-text'><img src={walletIcon} alt="row-details-icon" className='row-details-icon' /> Payment Mode</h5>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className='row-details-items-container'>
                                                        {/* <div className='row-details-items'><span className='para'>Credit Card</span></div>
                                                        <div className='row-details-items'><span className='para'>Debit Card</span></div>
                                                    <div className='row-details-items'><span className='para'>Cash</span></div> */}
                                                        {
                                                            dealerData.paymentModes.length > 0 ?
                                                                dealerData.paymentModes.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className='row-details-items'><span className='para'>{item}</span></div>
                                                                    )
                                                                })
                                                                :
                                                                ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div id='car-details-row-details' className='row-details'>
                                                <div className="col-md-4">
                                                    <h5 className='row-details-text'><img src={roadIcon} alt="row-details-icon" className='row-details-icon' /> Fast Delivery Locations</h5>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className='row-details-items-container'>
                                                        {/* <div className='row-details-items'><span className='para'>Dubai Marina</span></div>
                                                        <div className='row-details-items'><span className='para'>Dubai Media City</span></div>
                                                        <div className='row-details-items'><span className='para'>Jumeirah</span></div>
                                                        <div className='row-details-items'><span className='para'>Airport Terminal 1</span></div>
                                                    <div className='row-details-items'><span className='para'>Airport Terminal 2</span></div> */}

                                                        {fastDeliveryLocationsData.length > 0 ?
                                                            fastDeliveryLocationsData.map((item, index) => {
                                                                return (
                                                                    <div key={index} onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: carData.dealerCompanyId })}` }) }} className='row-details-items'><span className='para'>{item.areaName}</span></div>
                                                                )
                                                            })
                                                            :
                                                            ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-wrap'>
                                                <div className='row-details flex-column col-md-6'>
                                                    <div className="col-md-4">
                                                        <h5 className='row-details-text d-flex'><img src={docsIcon} alt="row-details-icon" className='row-details-icon' /> Documents</h5>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <ul className='row-details-items-container flex-column ps-4 pe-4 pt-3'>
                                                            <li>Passport</li>
                                                            <li>Visit Visa</li>
                                                            <li>Home Country Driving License</li>
                                                            <li>International Driving Permit</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className='row-details flex-column col-md-6'>
                                                    <div className="col-md-4">
                                                        <h5 className='row-details-text d-flex'><img src={userIcon} alt="row-details-icon" className='row-details-icon' /> Requirements</h5>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <ul className='row-details-items-container flex-column ps-4 pe-4 pt-3'>
                                                            <li><b>Security Deposit: {carData.securityDeposit} AED</b></li>
                                                            <li><b>Refunded In: {carData.refundedIn}</b></li>
                                                            <li><b>Minimum Driver Age: {carData.minimumDriverAge}</b></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ''
                            }

                            {
                                dealerData !== null ?
                                    <div className="mt-5">
                                        <div onClick={() => { setAmenitiesBarTwoStatus(!amenitiesBarTwoStatus) }} className="amenities-bar">
                                            <span className={amenitiesBarTwoStatus == false ? 'para' : 'primary_text_color'}>Supplier Description</span>
                                            <b className='para'>{amenitiesBarTwoStatus == true ? '-' : '+'}</b>
                                        </div>
                                        <div className="amenities-bar-details" style={{ display: amenitiesBarTwoStatus == true ? 'flex' : 'none' }}>
                                            <p className='text-justify'>{dealerData.description}</p>
                                        </div>
                                    </div>
                                    :
                                    ''
                            }

                        </div>

                        <div id='car-details-section-one-right-container' className="car-details-section-one-right-container col-md-4">

                            <div className="car-details-and-info-card">
                                <div style={{ display: sharePopupStatus ? 'flex' : 'none' }} className="details-page-share-btn-box">
                                    {/* <img onClick={() => { copyUrlHandler('whatsapp') }} src={whatsappColoredIcon} alt="whatsapp-icon" /> */}
                                    {/* <img onClick={() => { copyUrlHandler('facebook') }} src={facebookColoredIcon} alt="facebook-icon" /> */}
                                    {/* <img onClick={() => { copyUrlHandler('instagram') }} src={instagramColoredIcon} alt="insta-icon" /> */}
                                    {/* <img src={messengerColoredIcon} alt="messenger-icon" /> */}
                                    {/* <img src={twitterColoredIcon} alt="twitter-icon" /> */}
                                    {/* <img src={tiktokColoredIcon} alt="tiktok-icon" /> */}
                                    {/* <img src={gmailColoredIcon} alt="gmail-icon" /> */}
                                    {/* <img onClick={() => { copyUrlHandler('linkedin') }} src={linkedinColoredIcon} alt="linkedin-icon" /> */}
                                    {/* <img src={chatColoredIcon} alt="chat-icon" /> */}
                                    {/* <img src={linkColoredIcon} alt="link-icon" /> */}
                                    {/* <!-- AddToAny BEGIN --> */}
                                    <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                                        <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                                        <a className="a2a_button_facebook"></a>
                                        <a className="a2a_button_whatsapp"></a>
                                        <a className="a2a_button_linkedin"></a>
                                        <a className="a2a_button_facebook_messenger"></a>
                                        <a className="a2a_button_twitter"></a>
                                        <a className="a2a_button_x"></a>
                                        <a className="a2a_button_telegram"></a>
                                    </div>
                                    {/* <script async src="https://static.addtoany.com/menu/page.js"></script> */}
                                    {/* <!-- AddToAny END --> */}
                                </div>
                                {/* <img onClick={() => { setSharePopupStatus(!sharePopupStatus) }} className='details-page-share-btn' src={shareIcon} alt="share-icon" /> */}
                                {carData !== null ?
                                    <div className="car-card-badge-container">
                                        {
                                            carData.category.premium == "premium" ?
                                                <span className="badge text-bg-dark car-card-badge">Premium</span>
                                                :
                                                ''
                                        }
                                        {
                                            carData.category.featured == "featured" ?
                                                <span className="badge text-bg-warning car-card-badge">Featured</span>
                                                :
                                                ''
                                        }
                                        {
                                            carData.category.verified == "verified" ?
                                                <span className="badge text-bg-success car-card-badge">Verified</span>
                                                :
                                                ''
                                        }
                                        {
                                            carData.discountOffer == 0 ?
                                                ''
                                                :
                                                <span className="badge text-bg-light car-card-badge">{carData.discountOffer}% Discount</span>
                                        }
                                    </div>
                                    :
                                    ''
                                }
                                <div className="car-details-and-info-card-header mt-4">
                                    <div className="car-details-dealer-logo">
                                        {
                                            dealerData !== null ?
                                                <img onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: carData.dealerCompanyId })}` }) }} src={`${process.env.React_App_Host_Url}/images/dealers-logo/${dealerData.companyLogo}`} alt="dealer-logo" height={100} />
                                                :
                                                ''
                                        }
                                    </div>

                                    <div className="car-details-dealer-contact">
                                        <p>BOOK DIRECTLY FROM <b className="page-links" onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: carData.dealerCompanyId })}` }) }}>{dealerData !== null ? dealerData.companyName.toUpperCase() : `#${carData.dealerCompanyId}`}</b></p>
                                        <div className="card-buttons">
                                            {/* <a onClick={() => { navigator.clipboard.writeText(dealerData !== null ? dealerData.contactNumber : ''); toast.success(dealerData !== null ? dealerData.contactNumber + ' coppied to clipboard' : '') }} data-tooltip-id="vender_contact" data-tooltip-content={dealerData !== null ? dealerData.contactNumber : ''} className="card-btn primary_background_color phone-btn"> */}
                                            <a onClick={() => { dealerData !== null ? setDealerContactNumber(dealerData.contactNumber) : setDealerContactNumber("") }} data-tooltip-id="vender_contact" data-tooltip-content='Phone' className="card-btn primary_background_color phone-btn rounded-start">
                                                <img src={callIcon} alt="call-icon" className="card-btn-icons" />
                                            </a>
                                            <a onClick={contactOnWhatsapp} data-tooltip-id="vender_whatsapp" data-tooltip-content='Whatsapp' className="card-btn background-green">
                                                <img src={whatsappIcon} alt="whatsapp-icon" className="card-btn-icons" />
                                            </a>
                                            <a href={`mailto:${dealerData !== null ? dealerData.emailAddress : ''}?body=Hello can i get more info about Duby Drive`} className="card-btn background-orange send-btn rounded-end" data-tooltip-id="vender_email" data-tooltip-content='Email'>
                                                <img src={sendIcon} alt="send-icon" className="card-btn-icons" />
                                            </a>
                                        </div>

                                        <div className='text-center mt-3'>
                                            <p className='primary_text_color'>{dealerContactNumber}</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="car-details-and-info-card-body">
                                    <div className="car-price-details-tab-container">
                                        <div style={{ backgroundColor: priceTab == 0 ? 'white' : 'whitesmoke', borderTop: priceTab == 0 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(0) }} className="car-price-details-tab">
                                            <span className='text-center'>Daily <br /> Price</span>
                                        </div>
                                        <div style={{ backgroundColor: priceTab == 1 ? 'white' : 'whitesmoke', borderTop: priceTab == 1 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(1) }} className="car-price-details-tab car-price-details-tab-second">
                                            <span className='text-center'>Weekly Price</span>
                                        </div>
                                        <div style={{ backgroundColor: priceTab == 2 ? 'white' : 'whitesmoke', borderTop: priceTab == 2 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(2) }} className="car-price-details-tab">
                                            <span className='text-center'>Monthly Price</span>
                                        </div>
                                    </div>
                                    <div className="car-details-security-deposit-contanier">
                                        <div>
                                            <span>{priceTab == 0 ? 'Per Day' : priceTab == 1 ? 'Weekly' : priceTab == 2 ? 'Monthly' : ''} rental price</span>
                                            <span>{priceTab == 0 ? carData.perDayRentalCost : priceTab == 1 ? carData.weeklyRentalCost : priceTab == 2 ? carData.monthlyRentalCost : ''} AED</span>
                                        </div>
                                        <div>
                                            <span>{priceTab == 0 ? 'Per Day' : priceTab == 1 ? 'Weekly' : priceTab == 2 ? 'Monthly' : ''} Mileage limit</span>
                                            <span>{priceTab == 0 ? `${carData.perDayMilagelimit} KM` : priceTab == 1 ? `${carData.weeklyMilageLimit} KM` : priceTab == 2 ? `${carData.monthlyMilageLimit} KM` : ''}</span>
                                        </div>
                                        <div>
                                            <span>Additional Mileage Charges</span>
                                            <span>{carData.additionalMilageCharges} AED</span>
                                        </div>
                                        <div>
                                            <span>Salik / Toll Charges</span>
                                            <span>{carData.carToolsCharges} AED</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="car-details-and-info-card-footer">
                                    <p className='primary_text_color text-center'>{copyLink}</p>
                                    <span className='page-links' onClick={() => { setModalDataStatus('info'); document.querySelector('.car-features-modal').classList.add('active-features-modal') }}>Supplier Note: + 5% VAT applicable. For The</span>
                                    <span className='page-links' onClick={() => { setModalDataStatus('info'); document.querySelector('.car-features-modal').classList.add('active-features-modal') }}>tourist, deposit upto {carData.securityDeposit} AED...</span>
                                </div>
                            </div>

                            <div className='buttons-container'>
                                <button className='btn primary_background_color text-white' style={{ width: 170 }} onClick={copyUrlHandler}>Copy Link <img src={linkIcon} alt="link-icon" height={20} width={20} /></button>
                                <button className='btn background-dark text-white' style={{ width: 170 }} onClick={() => { navigate('/report_form', { state: carData.id }) }}>Send Report <img src={reportIcon} alt="link-icon" height={20} width={20} /></button>
                            </div>

                            <div className='col-md-10 mt-4'>
                                <div className="col-md-12 row-details-timebar" onClick={() => { setTimeBarStatus(!timeBarStatus) }}>
                                    <div>
                                        <img src={clockIcon} alt="time-icon" className='row-details-time-icon' /><span className='timebar-btn-text'>Timings</span>
                                    </div>
                                    <div className='time-bar-btn-icon-container'>
                                        <img src={timeBarStatus == false ? nextIcon : downIcon} alt="timebar-btn-icon" className='timebar-btn-icon' />
                                    </div>
                                </div>
                                <div className='timebar-content-list col-md-12' style={{ display: timeBarStatus == true ? 'block' : 'none' }}>
                                    {
                                        daysJsonData.length > 0 ?
                                            daysData.map((item, index) => {
                                                return (
                                                    <div key={index} className='timebar-content-row justify-content-between'>
                                                        <div className="col-md-4 timebar-content-details-one">
                                                            <span style={{ fontWeight: new Date().getDay() == index ? '600' : '' }}>{item.day}</span>
                                                        </div>
                                                        <div className="col-md-8 timebar-content-details-two">
                                                            <span style={{ fontWeight: new Date().getDay() == index ? '600' : '' }}>{item.time}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                            :
                                            ''
                                    }
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mt-5">
                                <CarDetailsPageBannerOne />
                            </div>

                        </div>
                    </div>

                    <div className="details-popup-window background-transparent">

                        <div className='details-popup-window-close-btn'>
                            <img onClick={() => { document.querySelector('.details-popup-window').classList.remove('active-window') }} src={closeIcon} height={30} width={30} className='links' alt="close-icon" />
                        </div>

                        <div id='car-details-popup-window' className="window">
                            {
                                windowStatus == 'image' ?
                                    <>
                                        {
                                            carData.carPhotosArray !== null ?
                                                <>
                                                    <button id='window-img-previous-btn' disabled={imageNumber == 0 ? true : false} onClick={() => { setImageNumber(imageNumber - 1) }} className='details-img-previous-btn' style={{ display: imageNumber == 0 ? 'none' : 'block' }}>
                                                        <img id='window-img-previous-btn-img' src={previousBtn} height={50} width={50} className='links' alt="previous-btn" />
                                                    </button>
                                                    <img onError={(e) => { e.target.src = defaultCarImg }} className='details-popup-window-img' src={`${process.env.React_App_Host_Url}/images/cars-images/${carData.carPhotosArray[imageNumber]}`} alt={carData.carPhotosArray[imageNumber]} />
                                                    <button id='window-img-next-btn' disabled={imageNumber == carData.carPhotosArray.length - 1 ? true : false} onClick={() => { setImageNumber(imageNumber + 1) }} className='details-img-next-btn' style={{ display: imageNumber == carData.carPhotosArray.length - 1 ? 'none' : 'block', }} >
                                                        <img id='window-img-next-btn-img' src={nextBtn} height={50} width={50} className='links' alt="next-btn" />
                                                    </button>
                                                </>
                                                :
                                                ''
                                        }
                                    </>
                                    :
                                    <video controls src={`${process.env.React_App_Host_Url}/videos/car-videos/${carData.carVideoName}`}></video>
                            }
                        </div>
                    </div>

                    <div className="car-features-modal background-transparent">
                        <div id='car-details-features-window' className="car-features-window">
                            <div className="car-features-modal-header">
                                <h4 className="mb-0">{modalDataStatus == 'specs' ? 'Car Specs and Features' : modalDataStatus == 'info' ? 'Note' : ''}</h4>
                                <span className='links' onClick={() => { setModalDataStatus(""); document.querySelector('.car-features-modal').classList.remove('active-features-modal') }}>
                                    &times;
                                </span>
                            </div>
                            {modalDataStatus == 'specs' ?
                                <div className="car-features-modal-body">
                                    <div className='car-features-modal-body-heading-container'>
                                        <h2>Specs:</h2>
                                    </div>
                                    <div className='car-features-modal-body-features-container'>
                                        <div className='features-container'>
                                            <img className='me-2' src={infoIcon} alt="icons" height={20} width={20} />
                                            <span>Car : {carData.carModelNo}</span>
                                        </div>
                                        {
                                            carTypeData !== null ?
                                                <div className='features-container'>
                                                    <img className='me-2' src={typeIcon} alt="icons" height={20} width={20} />
                                                    <span>Type : {carTypeData.carType}</span>
                                                </div>
                                                :
                                                ''
                                        }
                                        {
                                            carBrandData !== null ?
                                                <div className='features-container'>
                                                    <img className='me-2' src={typeIcon} alt="icons" height={20} width={20} />
                                                    <span>Brand : {carBrandData.brandName}</span>
                                                </div>
                                                :
                                                ''
                                        }
                                        <div className='features-container'>
                                            <img className='me-2' src={fuelIcon} alt="icons" height={20} width={20} />
                                            <span>Fuel Type : {carData.carFuelType}</span>
                                        </div>
                                        <div className='features-container'>
                                            <img className='me-2' src={luggageIcon} alt="icons" height={20} width={20} />
                                            <span> {carData.carLuggage == 'Yes' ? 'Luggage Space' : 'No Luggage Space'}</span>
                                        </div>
                                        <div className='features-container'>
                                            <img className='me-2' src={doorIcon} alt="icons" height={20} width={20} />
                                            <span>Doors : {carData.carDoors}</span>
                                        </div>
                                        <div className='features-container'>
                                            <img className='me-2' src={seatIcon} alt="icons" height={20} width={20} />
                                            <span>Seats : {carData.carSeats}</span>
                                        </div>
                                        {/* <div className='features-container'>
                                            <img className='me-2' src={infoIcon} alt="icons" height={20} width={20} />
                                            <span>Number : {carData.carLicense}</span>
                                        </div> */}
                                        <div className='features-container'>
                                            <img className='me-2' src={transmissionIcon} alt="icons" height={20} width={20} />
                                            <span>Transmission : {carData.autoTransmission == 'Yes' ? 'Auto' : 'No'}</span>
                                        </div>
                                        <div className='features-container'>
                                            <img className='me-2' src={specIcon} alt="icons" height={20} width={20} />
                                            <span>GCC Specs : {carData.gccSpecs}</span>
                                        </div>
                                        <div className='features-container'>
                                            <img className='me-2' src={userIcon} alt="icons" height={20} width={20} />
                                            <span>Driver Insurance : {carData.additionalDriverInsurance}</span>
                                        </div>
                                        <div className='features-container'>
                                            <img className='me-2' src={insuranceIcon} alt="icons" height={20} width={20} />
                                            <span>Type : {carData.insuranceType}</span>
                                        </div>
                                        {/* <div className='features-container'>
                                            <img className='me-2' src={dropIcon} alt="icons" height={20} width={20} />
                                            <span>Exterior Color : {carData.carExteriorColor}</span>
                                        </div> */}
                                        {/* <div className='features-container'>
                                            <img className='me-2' src={dropIcon} alt="icons" height={20} width={20} />
                                            <span>Interior Color : {carData.carInteriorColor}</span>
                                        </div> */}
                                    </div>
                                    <div className='car-features-modal-body-heading-container'>
                                        <h2>Features:</h2>
                                    </div>
                                    <div className='car-features-modal-body-features-container'>
                                        {
                                            carData.carFeatures !== null ?
                                                carData.carFeatures.length > 0 ?
                                                    carData.carFeatures.map((item, index) => {
                                                        return (
                                                            <div key={index} className='features-container'>
                                                                <img className='me-2' src={tickIcon} alt="tick-icon" height={20} width={20} />
                                                                <span>{item}</span>
                                                            </div>
                                                        );
                                                    })
                                                    :
                                                    ''
                                                :
                                                ''
                                        }
                                    </div>
                                </div>
                                :
                                modalDataStatus == 'info' ?
                                    <div className="car-features-modal-body">
                                        <div className='car-features-modal-body-heading-container'>
                                            <h2 className='primary_text_color'>Supplier Note:</h2>
                                        </div>
                                        <div className='car-features-modal-body-features-container'>
                                            <p className="ps-3 pe-3">
                                                For the tourist, deposit is up to {carData.securityDeposit} AED, Minimum 2 Days booking, +5% VAT is applicable on the rental amount as per UAE law. <br/> Over-limit Mileage <b>@ AED {carData.additionalMilageCharges} / km</b> Advance payments may be required for confirmed future bookings.
                                            </p>
                                        </div>
                                        <div className='car-features-modal-body-heading-container'>
                                            <h2 className='primary_text_color'>DubyDrive Note:</h2>
                                        </div>
                                        <div className='car-features-modal-body-features-container'>
                                            <p className="ps-3 pe-3">
                                                The listing above (including It's pricing, features and other details) is advertised by Zero Max Rent a Car. Please get in touch with the supplier directly by contacting on the listed phone number, WhatsApp no. or simply Request a Call to rent this car.
                                                <b> Incase the car is not available at the price mentioned, <span onClick={() => { navigate('/report_form', { state: carData.id }) }} className="primary_text_color links">please report this listing</span>. Happy renting!</b>
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    ''
                            }
                            <div className="car-features-modal-footer">
                                <button onClick={() => { setModalDataStatus(""); document.querySelector('.car-features-modal').classList.remove('active-features-modal') }} className='btn primary_background_color text-white'>Close</button>
                            </div>
                        </div>
                    </div>

                    <div id='car-details-contact-buttons' className="car-details-dealer-contact d-none">
                        <div className="card-buttons">
                            <a onClick={() => { dealerData !== null ? setDealerContactNumber(dealerData.contactNumber) : setDealerContactNumber("") }} data-tooltip-id="vender_contact" data-tooltip-content='Phone' className="card-btn primary_background_color phone-btn rounded-start">
                                <img src={callIcon} alt="call-icon" className="card-btn-icons" />
                            </a>
                            <a onClick={contactOnWhatsapp} data-tooltip-id="vender_whatsapp" data-tooltip-content='Whatsapp' className="card-btn background-green">
                                <img src={whatsappIcon} alt="whatsapp-icon" className="card-btn-icons" />
                            </a>
                            <a href={`mailto:${dealerData !== null ? dealerData.emailAddress : ''}?body=Hello can i get more info about Duby Drive`} className="card-btn background-orange send-btn rounded-end" data-tooltip-id="vender_email" data-tooltip-content='Email'>
                                <img src={sendIcon} alt="send-icon" className="card-btn-icons" />
                            </a>
                        </div>
                    </div>
                </div>
                :
                ''
            }

            <div id="car-details-faq-section" className='home-section-twelve ps-5 pe-5 col-md-8 pt-0'>
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
    );
};

export default SectionOne;



