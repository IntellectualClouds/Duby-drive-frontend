import React, { useState, useEffect } from 'react';

import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import callIcon from "../../../assets/icons/call.png";
import whatsappIcon from "../../../assets/icons/whatsapp.png";
import sendIcon from "../../../assets/icons/send.png";

import pinIcon from "../../../assets/icons/pin.png";

import airConditionerIcon from "../../../assets/icons/air-conditioner.png";
import arabicIcon from "../../../assets/icons/arabic.png";
import bbqIcon from "../../../assets/icons/bbq.png";
import camelIcon from "../../../assets/icons/desert-camel.png";
import cameraIcon from "../../../assets/icons/camera.png";
import campIcon from "../../../assets/icons/camp.png";
import danceIcon from "../../../assets/icons/dance.png";
import falconIcon from "../../../assets/icons/falcon.png";
import hookahIcon from "../../../assets/icons/hookah.png";
import jeepIcon from "../../../assets/icons/jeep.png";
import novVegIcon from "../../../assets/icons/non-veg.png";
import refreshmentIcon from "../../../assets/icons/refreshment.png";
import showIcon from "../../../assets/icons/show.png";
import suvIcon from "../../../assets/icons/suv.png";
import thrillingIcon from "../../../assets/icons/thrilling.png";
import washroomIcon from "../../../assets/icons/washroom.png";

import accommodation from "../../../assets/icons/accommodation.png";
import welcomeDrink from "../../../assets/icons/welcome-drink.png";
import tickets from "../../../assets/icons/tickets.png";

import contactusIcon from "../../../assets/icons/contact-us.png";
import linkIcon from "../../../assets/icons/link.png";

import nextIcon from "../../../assets/icons/next-angle-arrow.png";
import previousIcon from "../../../assets/icons/previous-angle-arrow.png";

import nextBtn from "../../../assets/icons/next.png";
import previousBtn from "../../../assets/icons/previous.png";

import closeIcon from "../../../assets/icons/close.png";
import playIcon from "../../../assets/icons/play.png";

import { Tooltip } from 'react-tooltip';
import { Helmet } from 'react-helmet';

const SectionOne = () => {

    const navigate = useNavigate();

    const [transferType, setTransferType] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [adult, setAdult] = useState("");
    const [child, setChild] = useState("");
    const [infant, setInfant] = useState("");

    const [btnDisable, setBtnDisable] = useState(false);

    const [copyLink, setCopyLink] = useState("");
    const [dealerContactNumber, setDealerContactNumber] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const [desertSafariData, setDesertSafariData] = useState(null);
    const [dealerData, setDealerData] = useState(null);

    const [imageNumber, setImageNumber] = useState(0);

    const [amenitiesBarOneStatus, setAmenitiesBarOneStatus] = useState(true);
    const [amenitiesBarTwoStatus, setAmenitiesBarTwoStatus] = useState(true);
    const [amenitiesBarThreeStatus, setAmenitiesBarThreeStatus] = useState(true);
    const [amenitiesBarFourStatus, setAmenitiesBarFourStatus] = useState(false);

    const [pickupPointsData, setPickupPointsData] = useState([]);

    const [windowStatus, setWindowStatus] = useState('image');

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

    const fetchingAreasData = async (areas_id_array) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/area/by/multiple/id`,
                data: { areas_id_array }
            });
            // console.log(response);
            if (response.status == 200) {
                setPickupPointsData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching area data: ', error);
        }
    };

    const fetchingDesertSafariData = async (id) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/desertSafari/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                setDesertSafariData(response.data.data);
                fetchingDealerData(response.data.data.dealerId);
                fetchingAreasData(response.data.data.pickupPoints);
                setTransferType(response.data.data.transferType);
            }
        } catch (error) {
            console.log('Failed while fetching desert safari data api by id: ', error);
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
                window.open(`https://api.whatsapp.com/send/?phone=${dealerData.whatsAppNumber}&text=Hi, I've found your (${desertSafariData.carModelNo}) at dubydrive.com. and I'd like to rent the listed car ${generatedUrl} let me know if it's still available?...thanks&type=phone_number&app_absent=0`, "_blank")
            }
        } catch (error) {
            console.log('Failed while contacting dealer on whatsapp: ', error);
            toast.error('Failed while contacting to dealer on whatsapp');
        }
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const getYear = currentDate.getFullYear();
        const getMonth = currentDate.getMonth();
        const getDate = currentDate.getDate();

        const today = `${getYear}-${getMonth.toString().length == 1 ? '0' : ''}${getMonth + 1}-${getDate}`;
        // console.log(today);
        setPickupDate(today);
    };

    const callingBookTourApi = async (transferType, pickupDate, adult, child, infant, totalAmount, discountOffer, afterDiscount, tourId) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/post/data/bookTour`,
                data: { transferType, pickupDate, adult, child, infant, totalAmount, discountOffer, afterDiscount, tourId }
            });
            // console.log(response);
            if (response.status == 200) {
                toast.success('Submit successfully');
                setTimeout(() => {
                    toast.info('We will contact you soon');
                }, 2000);
                setBtnDisable(false);
            }
        } catch (error) {
            console.log('Failed while calling book tour post api: ', error);
            toast.error('Something went wrong please try again later');
            setBtnDisable(false);
        }
    };

    const bookNow = (totalAmount, discountOffer, afterDiscount, tourId) => {
        if (transferType.trim() == "") {
            toast.info("Please select transfer type");
        }
        else if (pickupDate.trim() == "") {
            toast.info("Please select pickup date");
        }
        else if (adult.trim() == "") {
            toast.info("Please select at least one adult");
        }
        else if (child.trim() == "") {
            toast.info("Please select at least one option");
        }
        else if (infant.trim() == "") {
            toast.info("Please select at least one option");
        }
        else {
            setBtnDisable(true);
            callingBookTourApi(transferType.trim(), pickupDate.trim(), adult.trim(), child.trim(), infant.trim(), totalAmount, discountOffer, afterDiscount, tourId);
            window.open(
                `https://web.whatsapp.com/send?phone=${dealerData.whatsAppNumber}&text=Hi I'm intrested in booking the ${desertSafariData.desertSafariName} Package with ${transferType} transfer for ${adult} adult, ${child} child and ${infant} infant on ${pickupDate}.`,
                '_blank'
            );
        }
    };

    useEffect(() => {
        setAdult("1");
        setChild("0");
        setInfant("0");

        getCurrentDate();

        const searchParamsID = searchParams.get('desert_safari_id');

        if (searchParamsID) {
            fetchingDesertSafariData(searchParamsID);
        };
    }, []);

    return (
        <>
            {
                desertSafariData !== null ?
                    <Helmet>
                        <meta name="description" content={desertSafariData.metaDescription} />
                        <meta name="keywords" content={desertSafariData.metaKeywords} />
                        <title>Duby Drive | {desertSafariData.desertSafariName}</title>
                    </Helmet>
                    :
                    ''
            }
            <ToastContainer theme="colored" style={{ width: 360 }} />
            <Tooltip id='vender_contact' />
            <Tooltip id='vender_whatsapp' />
            <Tooltip id='vender_email' />

            {
                desertSafariData !== null ?
                    <div className="car-details-section-one" id="car-details-section-one">
                        <div className="car-details-section-one-header">
                            <h3 className='mb-4'>{desertSafariData.desertSafariName} ({desertSafariData.transferType} Transfer)</h3>
                        </div>
                        <div className="car-details-section-one-body">
                            <div className="car-details-section-one-left-container col-md-8" id="car-details-section-one-left-container">

                                <div className="img-container">
                                    <div className='d-flex justify-content-center align-items-center position-relative'>
                                        {
                                            desertSafariData.desertPhotosArray !== null ?
                                                <>
                                                    <img onClick={() => { document.querySelector('.details-popup-window').classList.add('active-window'); setWindowStatus('image'); }} src={`${process.env.React_App_Host_Url}/images/desert-images/${desertSafariData.desertPhotosArray[imageNumber]}`} alt={desertSafariData.desertPhotosArray[imageNumber]} width={'100%'} />

                                                    <button disabled={imageNumber == 0 ? true : false} onClick={() => { setImageNumber(imageNumber - 1) }} className='details-img-previous-btn' style={{ display: imageNumber == 0 ? 'none' : 'block' }}>
                                                        <img src={previousBtn} height={40} width={40} className='links' alt="previous-btn" />
                                                    </button>
                                                    <button disabled={imageNumber == desertSafariData.desertPhotosArray.length - 1 ? true : false} onClick={() => { setImageNumber(imageNumber + 1) }} className='details-img-next-btn' style={{ display: imageNumber == desertSafariData.desertPhotosArray.length - 1 ? 'none' : 'block', }} >
                                                        <img src={nextBtn} height={40} width={40} className='links' alt="next-btn" />
                                                    </button>
                                                </>
                                                :
                                                ''
                                        }
                                    </div>

                                    <div className="more-car-images">
                                        {
                                            desertSafariData.desertPhotosArray !== null ?
                                                desertSafariData.desertPhotosArray.length > 0 ?
                                                    desertSafariData.desertPhotosArray.map((item, index) => {
                                                        return (
                                                            <img key={index} onClick={() => { setImageNumber(index) }} src={`${process.env.React_App_Host_Url}/images/desert-images/${item}`} alt={item} height={70} width={135} />
                                                        );
                                                    })
                                                    :
                                                    ''
                                                :
                                                ''
                                        }

                                        {desertSafariData.desertVideoName ?
                                            <div className='video-play-btn' onClick={() => { document.querySelector('.details-popup-window').classList.add('active-window'); setWindowStatus('video'); }}>
                                                <img src={playIcon} height={30} width={30} alt="play-icon" />
                                            </div>
                                            :
                                            ''
                                        }
                                    </div>
                                </div>

                                <div className="car-details-mobile-view-section d-none">
                                    {
                                        dealerData !== null ?
                                            <div className="car-details-and-info-card">
                                                <div className="car-details-and-info-card-header">
                                                    <div className="car-details-dealer-logo">
                                                        <img onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: desertSafariData.dealerId })}` }) }} src={`${process.env.React_App_Host_Url}/images/dealers-logo/${dealerData.companyLogo}`} alt={dealerData.companyLogo} height={100} />
                                                    </div>
                                                    <div className="car-details-dealer-contact">
                                                        <p>BOOK DIRECTLY FROM <b className="page-links" onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: desertSafariData.dealerId })}` }) }}>{dealerData !== null ? dealerData.companyName.toUpperCase() : `#${desertSafariData.dealerId}`}</b></p>
                                                        <div className='text-center mt-3'>
                                                            <p className='primary_text_color'>{dealerContactNumber}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="car-details-and-info-card-body">
                                                    <div className="car-details-security-deposit-contanier">
                                                        <div>
                                                            <span>Price Per Adult</span>
                                                            <span>{desertSafariData.adultPrice} AED</span>
                                                        </div>
                                                        <div>
                                                            <span>Price Per Child</span>
                                                            <span>{desertSafariData.childPrice} AED</span>
                                                        </div>
                                                        <div>
                                                            <span>Price Per Infant</span>
                                                            <span>{desertSafariData.infantPrice} AED</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='buttons-container'>
                                                    <button className='btn background-dark text-white' style={{ width: 170 }} onClick={copyUrlHandler}>Copy Link <img src={linkIcon} alt="link-icon" height={20} width={20} /></button>
                                                </div>
                                                <div className="car-details-and-info-card-footer">
                                                    <p className='primary_text_color text-center'>{copyLink}</p>
                                                    <span>Transfer Type: {desertSafariData.transferType}</span>
                                                </div>
                                            </div>
                                            :
                                            ''
                                    }

                                    <div className="col-md-10 yacht-details-section-one-timings-locations-details-container">
                                        <h6>Timing & Pick-up Location</h6>

                                        <div className="col-md-12 row-details-timebar mb-3">
                                            <div>
                                                <span className='timebar-btn-text'>Timings : {desertSafariData.startTime} - {desertSafariData.endTime}</span>
                                            </div>
                                        </div>

                                        <h6>Meething Point</h6>

                                        <div className='meeting-point-details-container'>
                                            <img src={pinIcon} alt="pin-icon" height={20} width={20} />
                                            {pickupPointsData.length > 0 ?
                                                pickupPointsData.map((item, index) => {
                                                    return (
                                                        <span key={index} className='para me-2'>{item.areaName},</span>
                                                    )
                                                })
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="desert-safari-features border-0 mb-4">
                                    {
                                        desertSafariData.hotelPickAndDrop ?
                                            <img src={jeepIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.camelRiding ?
                                            <img src={camelIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.sandBoarding ?
                                            <img src={thrillingIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.bbqDinner ?
                                            <img src={bbqIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.nonVegDishes ?
                                            <img src={novVegIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.duneBashing ?
                                            <img src={suvIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.photography ?
                                            <img src={cameraIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.sheesha ?
                                            <img src={hookahIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.unlimitedRefreshments ?
                                            <img src={refreshmentIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.separateWashrooms ?
                                            <img src={washroomIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.tanuraShow ?
                                            <img src={showIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {
                                        desertSafariData.bellyDance ?
                                            <img src={danceIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    }
                                    {/* {
                                        desertSafariData.falcon ?
                                        <img src={falconIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                        :
                                        ''
                                    } */}
                                    {/* {
                                        desertSafariData.camp ?
                                            <img src={campIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    } */}
                                    {/* {
                                        desertSafariData.camp ?
                                            <img src={arabicIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    } */}
                                    {/* {
                                        desertSafariData.camp ?
                                             <img src={airConditionerIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            :
                                            ''
                                    } */}
                                </div>

                                <div className="desert-safari-key-features desert-safari-details-page-key-features">
                                    <h5 className='primary_text_color mb-3'>Key Features</h5>
                                    <div className='key-features-details'>
                                        <img src={tickets} alt="key-feature-icon" className='me-2' height={18} width={18} />
                                        <span className="key-feature-text">Free Tickets</span>
                                    </div>
                                    <div className='key-features-details'>
                                        <img src={accommodation} alt="key-feature-icon" className='me-2' height={18} width={18} />
                                        <span className="key-feature-text">Accommodation</span>
                                    </div>
                                    <div className='key-features-details'>
                                        <img src={welcomeDrink} alt="key-feature-icon" className='me-2' height={18} width={18} />
                                        <span className="key-feature-text">Welcome Drink</span>
                                    </div>
                                </div>

                                <div className="about-car-rental">
                                    <div>
                                        <h5 className='mb-0'>More Details</h5>
                                    </div>
                                    <div className="amenities-bar-container">
                                        <div onClick={() => { setAmenitiesBarOneStatus(!amenitiesBarOneStatus) }} className="amenities-bar">
                                            <span className='primary_text_color'>About Tour</span>
                                            <b className='para'>{amenitiesBarOneStatus == true ? '-' : '+'}</b>
                                        </div>
                                        <div className="amenities-bar-details" style={{ display: amenitiesBarOneStatus == true ? 'flex' : 'none' }}>
                                            <span className='para' dangerouslySetInnerHTML={{ __html: desertSafariData.aboutTour }}></span>
                                        </div>

                                        <div onClick={() => { setAmenitiesBarTwoStatus(!amenitiesBarTwoStatus) }} className="amenities-bar">
                                            <span className='primary_text_color'>Highlights or Packages Details</span>
                                            <b className='para'>{amenitiesBarTwoStatus == true ? '-' : '+'}</b>
                                        </div>
                                        <div className="amenities-bar-details" style={{ display: amenitiesBarTwoStatus == true ? 'flex' : 'none' }}>
                                            <span className='para' dangerouslySetInnerHTML={{ __html: desertSafariData.highlightsOrPackagesDetails }}></span>
                                        </div>

                                        <div onClick={() => { setAmenitiesBarThreeStatus(!amenitiesBarThreeStatus) }} className="amenities-bar">
                                            <span className='primary_text_color'>Inclusions</span>
                                            <b className='para'>{amenitiesBarThreeStatus == true ? '-' : '+'}</b>
                                        </div>
                                        <div className="amenities-bar-details" style={{ display: amenitiesBarThreeStatus == true ? 'flex' : 'none' }}>
                                            <span className='para' dangerouslySetInnerHTML={{ __html: desertSafariData.inclusions }}></span>
                                        </div>

                                        <div onClick={() => { setAmenitiesBarFourStatus(!amenitiesBarFourStatus) }} className="amenities-bar">
                                            <span className='primary_text_color'>Don't Forget</span>
                                            <b className='para'>{amenitiesBarFourStatus == true ? '-' : '+'}</b>
                                        </div>
                                        <div className="amenities-bar-details" style={{ display: amenitiesBarFourStatus == true ? 'flex' : 'none' }}>
                                            <span className='para' dangerouslySetInnerHTML={{ __html: desertSafariData.impPoints }}></span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="car-details-section-one-right-container col-md-4" id='car-details-section-one-right-container'>

                                <div className="col-md-10 yacht-details-section-one-timings-locations-details-container mt-0 mb-5">
                                    <h4>Book your tour adventure!</h4>

                                    <div className='tour-package-booking-card-info'>
                                        <div className='tour-package-booking-card-info-header'>
                                            <img src={require('../../../assets/images/cars/crossover.webp')} alt="car" height={20} width={40} />
                                        </div>
                                        <div className='tour-package-booking-card-info-body'>
                                            <h5>4x4 Land Cruiser</h5>
                                            <span>Maximum 6 Passengers</span>
                                            <span>Sharing Transfer</span>
                                        </div>
                                    </div>

                                    <div className="col-md-12 form-container mt-4">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <label className='mb-2'>Transfer Option</label>
                                                <select className="form-select background-whitesmoke p-2" value={transferType} onChange={(e) => { setTransferType(e.target.value) }}>
                                                    <option disabled>
                                                        Choose...
                                                    </option>
                                                    <option>{desertSafariData.transferType}</option>
                                                    {/* <option>Sharing Transfer</option>
                                                    <option>Private Transfer</option>
                                                    <option>None</option> */}
                                                </select>
                                            </div>

                                            <div className="col-md-12">
                                                <label className='mb-2'>Pickup Date and Time</label>
                                                <input
                                                    type="date"
                                                    className="form-control p-2 background-whitesmoke"
                                                    value={pickupDate}
                                                    onChange={(e) => { setPickupDate(e.target.value); console.log(pickupDate); }}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className='mb-2'>Adult</label>
                                                <select className="form-select background-whitesmoke p-2" value={adult} onChange={(e) => { setAdult(e.target.value) }}>
                                                    <option disabled>
                                                        Choose...
                                                    </option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label className='mb-2'>Child</label>
                                                <select className="form-select background-whitesmoke p-2" value={child} onChange={(e) => { setChild(e.target.value) }}>
                                                    <option disabled>
                                                        Choose...
                                                    </option>
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label className='mb-2'>Infant</label>
                                                <select className="form-select background-whitesmoke p-2" value={infant} onChange={(e) => { setInfant(e.target.value) }}>
                                                    <option disabled>
                                                        Choose...
                                                    </option>
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='tour-package-booking-card-price-container'>
                                        <div className='d-flex justify-content-between'>
                                            <span>Total amount</span>
                                            <span>AED {desertSafariData.adultPrice * adult + desertSafariData.childPrice * child + desertSafariData.infantPrice * infant}</span>
                                        </div>
                                        {/* <div className='d-flex justify-content-between'>
                                            <span className='mb-0'>Discount Offer</span>
                                            <span className='mb-0'>{desertSafariData.discountOffer}%</span>
                                        </div> */}
                                        {/* <div className='d-flex justify-content-between'>
                                            <h5 className='mb-0 mt-2'>After Discount</h5>
                                            <h5 className='mb-0 mt-2'>AED {Number(desertSafariData.adultPrice * adult + desertSafariData.childPrice * child + desertSafariData.infantPrice * infant) - Number(desertSafariData.adultPrice * adult + desertSafariData.childPrice * child + desertSafariData.infantPrice * infant) / 100 * Number(desertSafariData.discountOffer)}</h5>
                                        </div> */}
                                    </div>

                                    <button disabled={btnDisable} onClick={() => { bookNow(desertSafariData.adultPrice * adult + desertSafariData.childPrice * child + desertSafariData.infantPrice * infant, `${desertSafariData.discountOffer}%`, Number(desertSafariData.adultPrice * adult + desertSafariData.childPrice * child + desertSafariData.infantPrice * infant) - Number(desertSafariData.adultPrice * adult + desertSafariData.childPrice * child + desertSafariData.infantPrice * infant) / 100 * Number(desertSafariData.discountOffer), desertSafariData.id) }} className="primary_background_color text-white btn col-md-12 mt-3"><img src={whatsappIcon} alt="icon" height={20} width={20} /> Book now</button>
                                </div>

                                {
                                    dealerData !== null ?
                                        <div className="col-md-10 car-details-and-info-card mb-4">
                                            <div className="car-details-and-info-card-header">
                                                <div className="car-details-dealer-logo">
                                                    <img onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: desertSafariData.dealerId })}` }) }} src={`${process.env.React_App_Host_Url}/images/dealers-logo/${dealerData.companyLogo}`} alt={dealerData.companyLogo} height={100} />
                                                </div>
                                                <div className="car-details-dealer-contact">
                                                    <p>BOOK DIRECTLY FROM <b className="page-links" onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: desertSafariData.dealerId })}` }) }}>{dealerData !== null ? dealerData.companyName.toUpperCase() : `#${desertSafariData.dealerId}`}</b></p>

                                                    <div className="card-buttons">
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
                                                <div className="car-details-security-deposit-contanier">
                                                    <div>
                                                        <span>Price Per Adult</span>
                                                        <span>{desertSafariData.adultPrice} AED</span>
                                                    </div>
                                                    <div>
                                                        <span>Price Per Child</span>
                                                        <span>{desertSafariData.childPrice} AED</span>
                                                    </div>
                                                    <div>
                                                        <span>Price Per Infant</span>
                                                        <span>{desertSafariData.infantPrice} AED</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='buttons-container'>
                                                <button className='btn background-dark text-white' style={{ width: 170 }} onClick={copyUrlHandler}>Copy Link <img src={linkIcon} alt="link-icon" height={20} width={20} /></button>
                                            </div>
                                            <div className="car-details-and-info-card-footer">
                                                <p className='primary_text_color text-center'>{copyLink}</p>
                                                <span>Transfer Type: {desertSafariData.transferType}</span>
                                            </div>
                                        </div>
                                        :
                                        ''
                                }

                                <div className="col-md-10 yacht-details-section-one-timings-locations-details-container">
                                    <h6>Timing & Pick-up Location</h6>

                                    <div className="col-md-12 row-details-timebar mb-3">
                                        <div>
                                            <span className='timebar-btn-text'>Timings : {desertSafariData.startTime} - {desertSafariData.endTime}</span>
                                        </div>
                                    </div>

                                    <h6>Meething Points</h6>

                                    <div className='meeting-point-details-container'>
                                        <img src={pinIcon} alt="pin-icon" height={20} width={20} />
                                        {pickupPointsData.length > 0 ?
                                            pickupPointsData.map((item, index) => {
                                                return (
                                                    <span key={index} className='para me-2'>{item.areaName},</span>
                                                )
                                            })
                                            :
                                            ''
                                        }
                                    </div>
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
                                                desertSafariData.desertPhotosArray !== null ?
                                                    <>
                                                        <button disabled={imageNumber == 0 ? true : false} onClick={() => { setImageNumber(imageNumber - 1) }} className='details-img-previous-btn' style={{ display: imageNumber == 0 ? 'none' : 'block' }}>
                                                            <img src={previousBtn} height={50} width={50} className='links' alt="previous-btn" />
                                                        </button>
                                                        <img className='details-popup-window-img' src={`${process.env.React_App_Host_Url}/images/desert-images/${desertSafariData.desertPhotosArray[imageNumber]}`} alt={desertSafariData.desertPhotosArray[imageNumber]} />
                                                        <button disabled={imageNumber == desertSafariData.desertPhotosArray.length - 1 ? true : false} onClick={() => { setImageNumber(imageNumber + 1) }} className='details-img-next-btn' style={{ display: imageNumber == desertSafariData.desertPhotosArray.length - 1 ? 'none' : 'block', }} >
                                                            <img src={nextBtn} height={50} width={50} className='links' alt="next-btn" />
                                                        </button>
                                                    </>
                                                    :
                                                    ''
                                            }
                                        </>
                                        :
                                        <video controls src={`${process.env.React_App_Host_Url}/videos/desert-videos/${desertSafariData.desertVideoName}`}></video>
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