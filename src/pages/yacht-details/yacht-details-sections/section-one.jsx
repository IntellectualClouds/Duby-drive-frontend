import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import daysData from "../../../json/days/days.json";

import defaultCarImg from "../../../assets/images/on-error/default-car.png";
import YachtDetailsPageBannerOne from '../../../components/banners/yacht-details-page-banner-one';

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

import rightIcon from "../../../assets/icons/right.png";
import reportIcon from "../../../assets/icons/report.png";
import clockIcon from "../../../assets/icons/clock.png";
import downIcon from "../../../assets/icons/down-arrow.png";

import callIcon from "../../../assets/icons/call.png";
import whatsappIcon from "../../../assets/icons/whatsapp.png";
import sendIcon from "../../../assets/icons/send.png";

import pinIcon from "../../../assets/icons/pin.png";
import linkIcon from "../../../assets/icons/link.png";

import nextBtn from "../../../assets/icons/next.png";
import previousBtn from "../../../assets/icons/previous.png";

import nextIcon from "../../../assets/icons/next-angle-arrow.png";
import previousIcon from "../../../assets/icons/previous-angle-arrow.png";

import closeIcon from "../../../assets/icons/close.png";
import playIcon from "../../../assets/icons/play.png";
import { Tooltip } from 'react-tooltip';

import { Helmet } from 'react-helmet';

const SectionOne = () => {

    const navigate = useNavigate();

    const [copyLink, setCopyLink] = useState("");
    const [dealerContactNumber, setDealerContactNumber] = useState("");

    const [daysJsonData, setDaysJsonData] = useState(daysData);

    const [modalDataStatus, setModalDataStatus] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const [amenitiesBarOneStatus, setAmenitiesBarOneStatus] = useState(true);
    const [amenitiesBarTwoStatus, setAmenitiesBarTwoStatus] = useState(true);
    const [amenitiesBarThreeStatus, setAmenitiesBarThreeStatus] = useState(true);

    const [timeBarStatus, setTimeBarStatus] = useState(false);

    const [yachtData, setYachtData] = useState(null);
    const [dealerData, setDealerData] = useState(null);

    const [imageNumber, setImageNumber] = useState(0);

    const [priceTab, setPriceTab] = useState(0);

    const [windowStatus, setWindowStatus] = useState('image');

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
            }
        } catch (error) {
            console.log('Failed while fetching dealer data api by id: ', error);
        }
    };

    const fetchingYachtData = async (id) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/yachtDetails/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                setYachtData(response.data.data);
                fetchingDealerData(response.data.data.dealerCompanyId);
            }
        } catch (error) {
            console.log('Failed while fetching yacht data by id: ', error);
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
                window.open(`https://api.whatsapp.com/send/?phone=${dealerData.whatsAppNumber}&text=Hi, I've found your (${yachtData.carModelNo}) at dubydrive.com. and I'd like to rent the listed car ${generatedUrl} let me know if it's still available?...thanks&type=phone_number&app_absent=0`, "_blank")
            }
        } catch (error) {
            console.log('Failed while contacting dealer on whatsapp: ', error);
            toast.error('Failed while contacting to dealer on whatsapp');
        }
    };

    useEffect(() => {
        const searchParamsID = searchParams.get('yacht_id');

        if (searchParamsID) {
            fetchingYachtData(searchParamsID);
        };
    }, []);

    return (
        <>
            {
                yachtData !== null ?
                    <Helmet>
                        <meta name="description" content={yachtData.metaDescription} />
                        <meta name="keywords" content={yachtData.metaKeywords} />
                        <title>Duby Drive | {yachtData.yachtName}</title>
                    </Helmet>
                    :
                    ''
            }
            <ToastContainer theme="dark" style={{ width: 360 }} />
            <Tooltip id='vender_contact' />
            <Tooltip id='vender_whatsapp' />
            <Tooltip id='vender_email' />

            {yachtData !== null ?
                <div id='car-details-section-one' className="car-details-section-one">
                    <div className="car-details-section-one-header">
                        <h3 className='mb-4'>Rent {yachtData.yachtName} ({yachtData.yachtType}) in United Arab Emirates</h3>
                    </div>

                    <div className="car-details-section-one-body">
                        <div id='car-details-section-one-left-container' className="car-details-section-one-left-container col-md-8">
                            <div className="img-container">
                                <div className='d-flex justify-content-center align-items-center position-relative'>

                                    {
                                        yachtData.yachtPhotosArray !== null ?
                                            <>
                                                <img onClick={() => { document.querySelector('.details-popup-window').classList.add('active-window'); setWindowStatus('image'); }} src={`${process.env.React_App_Host_Url}/images/yacht-images/${yachtData.yachtPhotosArray[imageNumber]}`} alt={yachtData.yachtPhotosArray[imageNumber]} width={'100%'} />

                                                <button id='car-details-img-previous-btn' disabled={imageNumber == 0 ? true : false} onClick={() => { setImageNumber(imageNumber - 1) }} className='details-img-previous-btn' style={{ display: imageNumber == 0 ? 'none' : 'block' }}>
                                                    <img src={previousBtn} height={40} width={40} className='links' alt="previous-btn" />
                                                </button>
                                                <button id='car-details-img-next-btn' disabled={imageNumber == yachtData.yachtPhotosArray.length - 1 ? true : false} onClick={() => { setImageNumber(imageNumber + 1) }} className='details-img-next-btn' style={{ display: imageNumber == yachtData.yachtPhotosArray.length - 1 ? 'none' : 'block', }} >
                                                    <img src={nextBtn} height={40} width={40} className='links' alt="next-btn" />
                                                </button>
                                            </>
                                            :
                                            ''
                                    }

                                </div>

                                <div className="more-car-images mb-4">
                                    {
                                        yachtData.yachtPhotosArray !== null ?
                                            yachtData.yachtPhotosArray.length > 0 ?
                                                yachtData.yachtPhotosArray.map((item, index) => {
                                                    return (
                                                        <img key={index} onClick={() => { setImageNumber(index) }} src={`${process.env.React_App_Host_Url}/images/yacht-images/${item}`} alt={item} height={70} width={135} />
                                                    );
                                                })
                                                :
                                                ''
                                            :
                                            ''
                                    }

                                    {yachtData.yachtVideoName ?
                                        <div className='video-play-btn' onClick={() => { document.querySelector('.details-popup-window').classList.add('active-window'); setWindowStatus('video'); }}>
                                            <img src={playIcon} height={30} width={30} alt="play-icon" />
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                            </div>

                            {/* <div className="features-and-specs">
                                <h4>Features and Specs</h4>

                                <div className='car-specs-container'>
                                    <div>
                                        <img src={typeIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>Car Type</span>
                                    </div>
                                    <div>
                                        <img src={seatIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>4 Seats</span>
                                    </div>
                                    <div>
                                        <img src={doorIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>4 Doors</span>
                                    </div>
                                    <div>
                                        <img src={fuelIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>Petrol</span>
                                    </div>
                                    <div>
                                        <img src={insuranceIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>Insurance Type</span>
                                    </div>
                                    <div>
                                        <img src={transmissionIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>Auto Transmission</span>
                                    </div>
                                    <div>
                                        <img src={luggageIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>Luggage Space</span>
                                    </div>
                                    <div>
                                        <img src={specIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>GCC Specs</span>
                                    </div>
                                    <div>
                                        <img src={infoIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>HDC-420</span>
                                    </div>
                                    <div>
                                        <img src={moreIcon} alt="spec-icon" className='spec-icon' />
                                        <span className='para'>More</span>
                                    </div>
                                </div>
                            </div> */}

                            <div className='car-details-mobile-view-section d-none'>

                                <div className="car-details-and-info-card-body">
                                    <div className="car-price-details-tab-container">
                                        <div style={{ backgroundColor: priceTab == 0 ? 'white' : 'whitesmoke', borderTop: priceTab == 0 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(0) }} className="car-price-details-tab yacht-price-details-tab p-3">
                                            <span className='text-center'>Hourly Price</span>
                                        </div>
                                        {/* <div style={{ backgroundColor: priceTab == 1 ? 'white' : 'whitesmoke', borderTop: priceTab == 1 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(1) }} className="car-price-details-tab p-3 car-price-details-tab-second">
                                                    <span className='text-center'>Per day Price</span>
                                                </div>
                                                <div style={{ backgroundColor: priceTab == 2 ? 'white' : 'whitesmoke', borderTop: priceTab == 2 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(2) }} className="car-price-details-tab p-3">
                                                    <span className='text-center'>Weekly Price</span>
                                                </div> */}
                                    </div>
                                    <div className="car-details-security-deposit-contanier">
                                        <div>
                                            <span>{priceTab == 0 ? 'Hourly' : priceTab == 1 ? 'Per Day' : priceTab == 2 ? 'Weekly' : ''} rental price</span>
                                            <span>{priceTab == 0 ? yachtData.perHourRentalCost : priceTab == 1 ? yachtData.perDayRentalCost : priceTab == 2 ? yachtData.weeklyRentalCost : ''} AED</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='buttons-container'>
                                    <button className='btn background-dark text-white' style={{ width: 170 }} onClick={copyUrlHandler}>Copy Link <img src={linkIcon} alt="link-icon" height={20} width={20} /></button>
                                </div>
                                <div className="car-details-and-info-card-footer">
                                    <p className='primary_text_color text-center'>{copyLink}</p>
                                    <span>Supplier Note: To confirm your booking, an advance partial payment is required</span>
                                </div>
                            </div>

                            <div className="about-car-rental mb-3">
                                <div>
                                    <h5 className='mb-0'>Yacht Overview</h5>
                                </div>
                                <p className="para" dangerouslySetInnerHTML={{ __html: yachtData.yachtOverview }}></p>
                            </div>

                            <div className="about-car-rental">
                                <div>
                                    <h5 className='mb-0'>AMENITIES</h5>
                                </div>
                                <div className="amenities-bar-container">
                                    <div onClick={() => { setAmenitiesBarOneStatus(!amenitiesBarOneStatus) }} className="amenities-bar">
                                        <span className={amenitiesBarOneStatus == false ? 'para' : 'primary_text_color'}>Connectivity</span>
                                        <b className='para'>{amenitiesBarOneStatus == true ? '-' : '+'}</b>
                                    </div>
                                    <div className="amenities-bar-details" style={{ display: amenitiesBarOneStatus == true ? 'flex' : 'none' }}>
                                        {yachtData.bluetooth == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Bluetooth</span>
                                            :
                                            ''
                                        }
                                        {yachtData.usbPort == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />USB Port</span>
                                            :
                                            ''
                                        }
                                        {yachtData.auxCable == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />AUX Cable</span>
                                            :
                                            ''
                                        }
                                        {yachtData.microwave == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Microwave</span>
                                            :
                                            ''
                                        }
                                        {yachtData.airConditioner == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Air Conditioner</span>
                                            :
                                            ''
                                        }
                                        {yachtData.cooler == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Cooler</span>
                                            :
                                            ''
                                        }
                                        {yachtData.insideSpeakers == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Inside Speakers</span>
                                            :
                                            ''
                                        }
                                        {yachtData.outsideSpeakers == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Outside Speakers</span>
                                            :
                                            ''
                                        }
                                        {yachtData.audioSystem == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Audio System</span>
                                            :
                                            ''
                                        }
                                    </div>

                                    <div onClick={() => { setAmenitiesBarTwoStatus(!amenitiesBarTwoStatus) }} className="amenities-bar">
                                        <span className={amenitiesBarTwoStatus == false ? 'para' : 'primary_text_color'}>Saloon & Cabin Facilities</span>
                                        <b className='para'>{amenitiesBarTwoStatus == true ? '-' : '+'}</b>
                                    </div>
                                    <div className="amenities-bar-details" style={{ display: amenitiesBarTwoStatus == true ? 'flex' : 'none' }}>
                                        {
                                            yachtData.iceAndBeverages == true ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Ice and Beverages</span>
                                                :
                                                ''
                                        }
                                        {
                                            yachtData.bbqEquipmentAndService == true ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />BBQ Equipment and Service</span>
                                                :
                                                ''
                                        }
                                        {
                                            yachtData.freeRefreshment == true ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Free Refreshment</span>
                                                :
                                                ''
                                        }
                                        {
                                            yachtData.towels == true ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Towels</span>
                                                :
                                                ''
                                        }
                                        {
                                            yachtData.safetyEquipment == true ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Safety Equipment</span>
                                                :
                                                ''
                                        }
                                        {
                                            yachtData.pillowsAndBlankets == true ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Pillows and Blankets</span>
                                                :
                                                ''
                                        }
                                    </div>

                                    <div onClick={() => { setAmenitiesBarThreeStatus(!amenitiesBarThreeStatus) }} className="amenities-bar">
                                        <span className={amenitiesBarThreeStatus == false ? 'para' : 'primary_text_color'}>Entertainment</span>
                                        <b className='para'>{amenitiesBarThreeStatus == true ? '-' : '+'}</b>
                                    </div>
                                    <div className="amenities-bar-details" style={{ display: amenitiesBarThreeStatus == true ? 'flex' : 'none' }}>
                                        {yachtData.fishingEquipment == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Fishing Equipment</span>
                                            :
                                            ''
                                        }
                                        {yachtData.musicSystem == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Music System</span>
                                            :
                                            ''
                                        }
                                        {yachtData.freeRefreshment == true ?
                                            <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Free Refreshment</span>
                                            :
                                            ''
                                        }
                                    </div>
                                </div>
                            </div>

                            <div id="car-details-faq-section" className='yacht-pay-cancel home-section-twelve ps-5 pe-5 col-md-8 pt-0'>
                                <h2 className='mb-4'>Payment Mode</h2>
                                <div className='payment-mode-aminities'>
                                    <span className="para">Visa</span>
                                    <span className="para">Master Card</span>
                                    <span className="para">Cash</span>
                                    <span className="para">Bitcoin/Crypto</span>
                                </div>
                                <h4>Pre-Payment</h4>
                                <ul>
                                    <li className='para mb-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad officia nesciunt corrupti cumque nisi enim libero illo, aperiam consequatur praesentium?</li>
                                    <li className='para mb-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad officia nesciunt corrupti cumque nisi enim libero illo, aperiam consequatur praesentium?</li>
                                </ul>
                                <h2 className='mb-4'>Cancellation Policy</h2>
                                <ul>
                                    <li className='para mb-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad officia nesciunt corrupti cumque nisi enim libero illo, aperiam consequatur praesentium?</li>
                                    <li className='para mb-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad officia nesciunt corrupti cumque nisi enim libero illo, aperiam consequatur praesentium?</li>
                                </ul>
                            </div>
                        </div>
                        {/******************** Right Container ***********************/}
                        <div className="car-details-section-one-right-container col-md-4" id='car-details-section-one-right-container'>
                            {
                                dealerData !== null ?
                                    <div className="col-md-10 car-details-and-info-card">
                                        <div className="car-details-and-info-card-header">
                                            <div className="car-details-dealer-logo">
                                                <img onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: yachtData.dealerCompanyId })}` }) }} src={`${process.env.React_App_Host_Url}/images/dealers-logo/${dealerData.companyLogo}`} alt={dealerData.companyLogo} height={100} />
                                            </div>
                                            <div className="car-details-dealer-contact">
                                                <p>BOOK DIRECTLY FROM {dealerData.companyName.toUpperCase()}</p>
                                                <div className="card-buttons">
                                                    {/* <a data-tooltip-id="vender_contact" data-tooltip-content={dealerData.contactNumber} onClick={() => { navigator.clipboard.writeText(dealerData.contactNumber); toast.success(dealerData.contactNumber + ' coppied to clipboard') }} className="card-btn primary_background_color phone-btn"> */}
                                                    <a data-tooltip-id="vender_contact" data-tooltip-content={dealerData.contactNumber} onClick={() => { setDealerContactNumber(dealerData.contactNumber) }} className="card-btn primary_background_color phone-btn rounded-start">
                                                        <img src={callIcon} alt="call-icon" className="card-btn-icons" />
                                                    </a>
                                                    <a data-tooltip-id="vender_whatsapp" data-tooltip-content={dealerData.whatsAppNumber} onClick={() => { window.open(`https://api.whatsapp.com/send/?phone=${dealerData.whatsAppNumber}&text=Hello+Can+i+get+more+info+?&type=phone_number&app_absent=0`, "_blank") }} className="card-btn background-green">
                                                        <img src={whatsappIcon} alt="whatsapp-icon" className="card-btn-icons" />
                                                    </a>
                                                    <a data-tooltip-id="vender_email" data-tooltip-content={dealerData.emailAddress} href={`mailto:${dealerData !== null ? dealerData.emailAddress : ''}?body=Hello can i get more info about Duby Drive`} className="card-btn background-orange send-btn rounded-end">
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
                                                <div style={{ backgroundColor: priceTab == 0 ? 'white' : 'whitesmoke', borderTop: priceTab == 0 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(0) }} className="car-price-details-tab yacht-price-details-tab p-3">
                                                    <span className='text-center'>Hourly Price</span>
                                                </div>
                                                {/* <div style={{ backgroundColor: priceTab == 1 ? 'white' : 'whitesmoke', borderTop: priceTab == 1 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(1) }} className="car-price-details-tab p-3 car-price-details-tab-second">
                                                    <span className='text-center'>Per day Price</span>
                                                </div>
                                                <div style={{ backgroundColor: priceTab == 2 ? 'white' : 'whitesmoke', borderTop: priceTab == 2 ? '2px solid #3f71b9' : '' }} onClick={() => { setPriceTab(2) }} className="car-price-details-tab p-3">
                                                    <span className='text-center'>Weekly Price</span>
                                                </div> */}
                                            </div>
                                            <div className="car-details-security-deposit-contanier">
                                                <div>
                                                    <span>{priceTab == 0 ? 'Hourly' : priceTab == 1 ? 'Per Day' : priceTab == 2 ? 'Weekly' : ''} rental price</span>
                                                    <span>{priceTab == 0 ? yachtData.perHourRentalCost : priceTab == 1 ? yachtData.perDayRentalCost : priceTab == 2 ? yachtData.weeklyRentalCost : ''} AED</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='buttons-container'>
                                            <button className='btn background-dark text-white' style={{ width: 170 }} onClick={copyUrlHandler}>Copy Link <img src={linkIcon} alt="link-icon" height={20} width={20} /></button>
                                        </div>
                                        <div className="car-details-and-info-card-footer">
                                            <p className='primary_text_color text-center'>{copyLink}</p>
                                            <span>Supplier Note: To confirm your booking, an advance partial payment is required</span>
                                        </div>
                                    </div>
                                    :
                                    ''
                            }

                            <div className="d-flex justify-content-end mt-5">
                                <YachtDetailsPageBannerOne />
                            </div>
                        </div>
                    </div>

                    <div className="details-popup-window background-transparent">

                        <div className='details-popup-window-close-btn'>
                            <img onClick={() => { document.querySelector('.details-popup-window').classList.remove('active-window') }} src={closeIcon} height={30} width={30} className='links' alt="close-icon" />
                        </div>

                        <div className="window">
                            {
                                windowStatus == 'image' ?
                                    <>
                                        {
                                            yachtData.yachtPhotosArray !== null ?
                                                <>
                                                    <button disabled={imageNumber == 0 ? true : false} onClick={() => { setImageNumber(imageNumber - 1) }} className='details-img-previous-btn' style={{ display: imageNumber == 0 ? 'none' : 'block' }}>
                                                        <img src={previousBtn} height={50} width={50} className='links' alt="previous-btn" />
                                                    </button>
                                                    <img className='details-popup-window-img' src={`${process.env.React_App_Host_Url}/images/yacht-images/${yachtData.yachtPhotosArray[imageNumber]}`} alt={yachtData.yachtPhotosArray[imageNumber]} />
                                                    <button disabled={imageNumber == yachtData.yachtPhotosArray.length - 1 ? true : false} onClick={() => { setImageNumber(imageNumber + 1) }} className='details-img-next-btn' style={{ display: imageNumber == yachtData.yachtPhotosArray.length - 1 ? 'none' : 'block', }} >
                                                        <img src={nextBtn} height={50} width={50} className='links' alt="next-btn" />
                                                    </button>
                                                </>
                                                :
                                                ''
                                        }
                                    </>
                                    :
                                    <video controls src={`${process.env.React_App_Host_Url}/videos/yacht-videos/${yachtData.yachtVideoName}`}></video>
                            }
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
        </>
    );
};

export default SectionOne;