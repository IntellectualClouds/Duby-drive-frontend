import React, { useState, useEffect } from 'react';

import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import BikeDetailsPageBannerOne from '../../../components/banners/bike-details-page-banner-one';

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

import contactusIcon from "../../../assets/icons/contact-us.png";
import linkIcon from "../../../assets/icons/link.png";

import nextIcon from "../../../assets/icons/next-angle-arrow.png";
import previousIcon from "../../../assets/icons/previous-angle-arrow.png";
import rightIcon from "../../../assets/icons/right.png";

import nextBtn from "../../../assets/icons/next.png";
import previousBtn from "../../../assets/icons/previous.png";

import closeIcon from "../../../assets/icons/close.png";
import playIcon from "../../../assets/icons/play.png";

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

import { Tooltip } from 'react-tooltip';

import { Helmet } from 'react-helmet';

const SectionOne = () => {

    const navigate = useNavigate();

    const [copyLink, setCopyLink] = useState("");
    const [dealerContactNumber, setDealerContactNumber] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const [bikeData, setBikeData] = useState(null);
    const [dealerData, setDealerData] = useState(null);

    const [imageNumber, setImageNumber] = useState(0);

    const [amenitiesBarOneStatus, setAmenitiesBarOneStatus] = useState(true);
    const [amenitiesBarTwoStatus, setAmenitiesBarTwoStatus] = useState(true);
    const [amenitiesBarThreeStatus, setAmenitiesBarThreeStatus] = useState(true);
    const [amenitiesBarFourStatus, setAmenitiesBarFourStatus] = useState(false);

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

    const fetchingBikeData = async (id) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/quadBiking/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                setBikeData(response.data.data);
                fetchingDealerData(response.data.data.dealerId);
            }
        } catch (error) {
            console.log('Failed while fetching bike data api by id: ', error);
        }
    };

    useEffect(() => {
        const searchParamsID = searchParams.get('quad_bike_id');

        if (searchParamsID) {
            fetchingBikeData(searchParamsID);
        };
    }, []);

    return (
        <>
            {
                bikeData !== null ?
                    <Helmet>
                        <meta name="description" content={bikeData.metaDescription} />
                        <meta name="keywords" content={bikeData.metaKeywords} />
                        <title>Duby Drive | {bikeData.bikeName}</title>
                    </Helmet>
                    :
                    ''
            }
            <ToastContainer theme="dark" style={{ width: 360 }} />
            <Tooltip id='vender_contact' style={{ zIndex: 1 }} />
            <Tooltip id='vender_whatsapp' style={{ zIndex: 1 }} />
            <Tooltip id='vender_email' style={{ zIndex: 1 }} />

            {
                bikeData !== null ?
                    <div className="car-details-section-one">
                        <div className="car-details-section-one-header">
                            <h3 className='mb-4'>{bikeData.bikeName} ({bikeData.bikeType})</h3>
                        </div>

                        <div className="car-details-section-one-body">
                            <div className="car-details-section-one-left-container col-md-8">
                                <div className="img-container">
                                    <div className='d-flex justify-content-center align-items-center position-relative'>
                                        {
                                            bikeData.quadBikePhotosArray !== null ?
                                                <>
                                                    <img onClick={() => { document.querySelector('.details-popup-window').classList.add('active-window'); setWindowStatus('image'); }} src={`${process.env.React_App_Host_Url}/images/quad-bike-images/${bikeData.quadBikePhotosArray[imageNumber]}`} alt={bikeData.quadBikePhotosArray[imageNumber]} height={500} width={'100%'} />

                                                    <button disabled={imageNumber == 0 ? true : false} onClick={() => { setImageNumber(imageNumber - 1) }} className='details-img-previous-btn' style={{ display: imageNumber == 0 ? 'none' : 'block' }}>
                                                        <img src={previousBtn} height={40} width={40} className='links' alt="previous-btn" />
                                                    </button>
                                                    <button disabled={imageNumber == bikeData.quadBikePhotosArray.length - 1 ? true : false} onClick={() => { setImageNumber(imageNumber + 1) }} className='details-img-next-btn' style={{ display: imageNumber == bikeData.quadBikePhotosArray.length - 1 ? 'none' : 'block', }} >
                                                        <img src={nextBtn} height={40} width={40} className='links' alt="next-btn" />
                                                    </button>
                                                </>
                                                :
                                                ''
                                        }
                                    </div>

                                    <div className="more-car-images">
                                        {
                                            bikeData.quadBikePhotosArray !== null ?
                                                bikeData.quadBikePhotosArray.length > 0 ?
                                                    bikeData.quadBikePhotosArray.map((item, index) => {
                                                        return (
                                                            <img key={index} onClick={() => { setImageNumber(index) }} src={`${process.env.React_App_Host_Url}/images/quad-bike-images/${item}`} alt={item} height={70} width={135} />
                                                        );
                                                    })
                                                    :
                                                    ''
                                                :
                                                ''
                                        }

                                        {bikeData.bikeVideoName ?
                                            <div className='video-play-btn' onClick={() => { document.querySelector('.details-popup-window').classList.add('active-window'); setWindowStatus('video'); }}>
                                                <img src={playIcon} height={30} width={30} alt="play-icon" />
                                            </div>
                                            :
                                            ''
                                        }
                                    </div>
                                </div>

                                <div className="features-and-specs ps-4 mb-2">
                                    <h4 className='mb-3'>Specifications</h4>

                                    <div className='car-specs-container'>
                                        <div>
                                            <img src={seatIcon} alt="spec-icon" className='spec-icon' />
                                            <span className='para'>{bikeData.seats} Seats</span>
                                        </div>
                                        <div>
                                            <img src={doorIcon} alt="spec-icon" className='spec-icon' />
                                            <span className='para'>{bikeData.doors} Doors</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="about-car-rental">
                                    <div className="amenities-bar-container">
                                        <div onClick={() => { setAmenitiesBarOneStatus(!amenitiesBarOneStatus) }} className="amenities-bar">
                                            <span className='primary_text_color'>Activities and Snacks</span>
                                            <b className='para'>{amenitiesBarOneStatus == true ? '-' : '+'}</b>
                                        </div>
                                        <div className="amenities-bar-details" style={{ display: amenitiesBarOneStatus == true ? 'flex' : 'none' }}>
                                            {bikeData.funDesertActivities == 'Yes' ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Fun Desert Activities</span>
                                                :
                                                ''
                                            }
                                            {bikeData.safetyGearAndTraining == 'Yes' ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Safety Gear</span>
                                                :
                                                ''
                                            }
                                            {bikeData.funDesertActivities == 'Yes' ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Training</span>
                                                :
                                                ''
                                            }
                                            {bikeData.foodAndBeverages == 'Yes' ?
                                                <span className='para mb-3'><img src={rightIcon} alt="right-icon" className='amenities-bar-right-icon' />Food And Beverages</span>
                                                :
                                                ''
                                            }
                                        </div>

                                        <div onClick={() => { setAmenitiesBarTwoStatus(!amenitiesBarTwoStatus) }} className="amenities-bar">
                                            <span className='primary_text_color'>Snacks Description</span>
                                            <b className='para'>{amenitiesBarTwoStatus == true ? '-' : '+'}</b>
                                        </div>
                                        <div className="amenities-bar-details" style={{ display: amenitiesBarTwoStatus == true ? 'flex' : 'none' }}>
                                            <span className='para' dangerouslySetInnerHTML={{ __html: bikeData.snacksDescription }}></span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="car-details-section-one-right-container col-md-4">

                                {
                                    dealerData !== null ?
                                        <div className="col-md-10 car-details-and-info-card">
                                            <div className="car-details-and-info-card-header">
                                                <div className="car-details-dealer-logo">
                                                    <img onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: bikeData.dealerId })}` }) }} src={`${process.env.React_App_Host_Url}/images/dealers-logo/${dealerData.companyLogo}`} alt={dealerData.companyLogo} height={100} />
                                                </div>
                                                <div className="car-details-dealer-contact">
                                                    <p>BOOK DIRECTLY FROM <b className='page-links' onClick={() => { navigate({ pathname: '/company_details', search: `?${createSearchParams({ dealer_id: bikeData.dealerId })}` }) }}>{dealerData.companyName.toUpperCase()}</b></p>
                                                    <div className="card-buttons">
                                                        {/* <a data-tooltip-id="vender_contact" data-tooltip-content={dealerData.contactNumber} onClick={() => { navigator.clipboard.writeText(dealerData.contactNumber); toast.success(dealerData.contactNumber + ' coppied to clipboard') }} className="card-btn primary_background_color phone-btn"> */}
                                                        <a data-tooltip-id="vender_contact" data-tooltip-content="Phone" onClick={() => { setDealerContactNumber(dealerData.contactNumber) }} className="card-btn primary_background_color phone-btn rounded-start">
                                                            <img src={callIcon} alt="call-icon" className="card-btn-icons" />
                                                        </a>
                                                        <a data-tooltip-id="vender_whatsapp" data-tooltip-content="Whatsapp" onClick={() => { window.open(`https://api.whatsapp.com/send/?phone=${dealerData.whatsAppNumber}&text=Hello+Can+i+get+more+info+?&type=phone_number&app_absent=0`, "_blank") }} className="card-btn background-green">
                                                            <img src={whatsappIcon} alt="whatsapp-icon" className="card-btn-icons" />
                                                        </a>
                                                        <a data-tooltip-id="vender_email" data-tooltip-content="Email" href={`mailto:${dealerData !== null ? dealerData.emailAddress : ''}?body=Hello can i get more info about Duby Drive`} className="card-btn background-orange send-btn rounded-end">
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
                                                        <span>Per hour rental price</span>
                                                        <span>{bikeData.pricePerHour} AED</span>
                                                    </div>
                                                    <div>
                                                        <span>Two hour rental price</span>
                                                        <span>{bikeData.priceTwoHour} AED</span>
                                                    </div>
                                                    <div>
                                                        <span>Snacks Price</span>
                                                        <span>{bikeData.snacksPrice} AED</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='buttons-container'>
                                                <button className='btn background-dark text-white' style={{ width: 170 }} onClick={copyUrlHandler}>Copy Link <img src={linkIcon} alt="link-icon" height={20} width={20} /></button>
                                            </div>
                                            <div className="car-details-and-info-card-footer">
                                                <p className='primary_text_color text-center'>{copyLink}</p>
                                                <b>{bikeData.vatPercentage}% VAT is applicable</b>
                                            </div>
                                        </div>
                                        :
                                        ''
                                }

                                <div className="d-flex justify-content-end mt-5">
                                    <BikeDetailsPageBannerOne />
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
                                                bikeData.quadBikePhotosArray !== null ?
                                                    <>
                                                        <button disabled={imageNumber == 0 ? true : false} onClick={() => { setImageNumber(imageNumber - 1) }} className='details-img-previous-btn' style={{ display: imageNumber == 0 ? 'none' : 'block' }}>
                                                            <img src={previousBtn} height={50} width={50} className='links' alt="previous-btn" />
                                                        </button>
                                                        <img className='details-popup-window-img' src={`${process.env.React_App_Host_Url}/images/quad-bike-images/${bikeData.quadBikePhotosArray[imageNumber]}`} alt={bikeData.quadBikePhotosArray[imageNumber]} />
                                                        <button disabled={imageNumber == bikeData.quadBikePhotosArray.length - 1 ? true : false} onClick={() => { setImageNumber(imageNumber + 1) }} className='details-img-next-btn' style={{ display: imageNumber == bikeData.quadBikePhotosArray.length - 1 ? 'none' : 'block', }} >
                                                            <img src={nextBtn} height={50} width={50} className='links' alt="next-btn" />
                                                        </button>
                                                    </>
                                                    :
                                                    ''
                                            }
                                        </>
                                        :
                                        <video controls src={`${process.env.React_App_Host_Url}/videos/quad-bike-videos/${bikeData.bikeVideoName}`}></video>
                                }
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