import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";

import axios from "axios";
import { createSearchParams, useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import userIcon from "../../assets/icons/user.png";
import typeIcon from "../../assets/icons/type.png";
import doorIcon from "../../assets/icons/door.png";
import seatIcon from "../../assets/icons/seat.png";
import fuelIcon from "../../assets/icons/fuel.png";
import infoIcon from "../../assets/icons/info.png";
import checkIcon from "../../assets/icons/check.png";
import callIcon from "../../assets/icons/call.png";
import whatsappIcon from "../../assets/icons/whatsapp.png";
import sendIcon from "../../assets/icons/send.png";

import transmissionIcon from "../../assets/icons/transmission.png";
import roadIcon from "../../assets/icons/road.png";

import { Tooltip } from "react-tooltip";

import defaultCarImg from "../../assets/images/on-error/default-car.png";

const CarCardSlider = ({ fetchBy, dealerCompanyId }) => {

    const navigate = useNavigate();

    function NextCard(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ display: "flex", background: "whitesmoke", borderRadius: '50%', padding: 20, justifyContent: 'center', alignItems: 'center' }}
                onClick={onClick}
            />
        );
    }

    function PreviousCard(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ display: "flex", background: "whitesmoke", borderRadius: '50%', padding: 20, justifyContent: 'center', alignItems: 'center' }}
                onClick={onClick}
            />
        );
    }

    let sliderRef = useRef(null);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        // nextArrow: <NextCard />,
        // prevArrow: <PreviousCard />,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.1,
                }
            },
        ],

    };

    const [carsData, setCarData] = useState([]);
    const [carTypesData, setCarTypesData] = useState([]);

    const fetchingCarDataApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/by/${fetchBy}`,
            });
            // console.log(response);
            if (response.status == 200) {
                setCarData(response.data.data.slice(0, 10));
            }
        } catch (error) {
            console.log('Failed while fetching car data api: ', error);
        }
    };

    const fetchingCarDataApiByDealer = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/by/dealerId`,
                data: { dealerCompanyId }
            });
            // console.log(response);
            if (response.status == 200) {
                setCarData(response.data.data);
            }
        } catch (error) {
            // console.log('Failed while fetching car data api by dealer id: ', error);
        }
    };

    const fetchingCarTypesData = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `${process.env.React_App_Host_Url}/api/get/data/carTypes/by/category`
            });
            // console.log(response);
            if (response.status == 200) {
                setCarTypesData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car types data: ', error);
        }
    };

    useEffect(() => {
        fetchingCarTypesData();
        if (fetchBy) {
            fetchingCarDataApi();
        }
        else {
            if (dealerCompanyId) {
                fetchingCarDataApiByDealer();
            }
        }
    }, []);

    return (
        <>
            <Tooltip id='vender_contact' style={{ zIndex: 1 }} />
            <Tooltip id='vender_whatsapp' style={{ zIndex: 1 }} />
            <Tooltip id='vender_email' style={{ zIndex: 1 }} />

            {carsData.length > 4 ?
                <Slider {...settings}>
                    {
                        carsData.map((item, index) => {
                            return (
                                <div key={index} onClick={() => { navigate({ pathname: '/car_details', search: `?${createSearchParams({ car_id: item.id })}` }) }}>
                                    <div className="car-cards car-cards-slider">
                                        <div className="card-header">
                                            {item.carPhotosArray !== null ?
                                                <img src={`${process.env.React_App_Host_Url}/images/cars-images/${item.featuredImg}`} alt={item.carPhotosArray[0]} onError={(e) => { e.target.src = defaultCarImg }} className='card-header-img' />
                                                :
                                                <img src={defaultCarImg} alt={defaultCarImg} className='card-header-img' />
                                            }
                                            {carsData !== null ?
                                                <div className="car-card-badge-container">
                                                    {
                                                        item.category.premium == "premium" ?
                                                            <span className="badge text-bg-dark car-card-badge">Premium</span>
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.category.featured == "featured" ?
                                                            <span className="badge text-bg-warning car-card-badge">Featured</span>
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.category.verified == "verified" ?
                                                            <span className="badge text-bg-success car-card-badge">Verified</span>
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.discountOffer == 0 ?
                                                            ''
                                                            :
                                                            <span className="badge text-bg-light car-card-badge">{item.discountOffer}% Discount</span>
                                                    }
                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                        <div className="card-body">
                                            <h4>{item.carModelNo}</h4>
                                            <div className="card-details">
                                                <div className="details-one">
                                                    {

                                                        item.discountOffer == 0 ?
                                                            ""
                                                            :
                                                            <span className="details text-orange"><span className="text-line">{item.perDayRentalCost}</span></span>
                                                    }
                                                    <span className="details text-orange">AED {Number(item.perDayRentalCost) - Number(item.perDayRentalCost) / 100 * Number(item.discountOffer)} <span className="primary_text_color">/ day</span></span>
                                                    <div className="d-flex align-items-center">
                                                        <img src={roadIcon} alt="road-icon" className="spec-icon" />
                                                        <span className="details text-gray">{item.perDayMilagelimit}</span>
                                                    </div>
                                                </div>
                                                <div className="details-two">
                                                    {
                                                        item.discountOffer == 0 ?
                                                            ''
                                                            :
                                                            <span className="details text-orange"><span className="text-line">{item.weeklyRentalCost}</span></span>
                                                    }
                                                    <span className="details text-orange">AED {Number(item.weeklyRentalCost) - Number(item.weeklyRentalCost) / 100 * Number(item.discountOffer)} <span className="primary_text_color">/ week</span></span>
                                                    <div className="d-flex align-items-center">
                                                        <img src={roadIcon} alt="road-icon" className="spec-icon" />
                                                        <span className="details text-gray">{item.weeklyMilageLimit}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="specs">
                                                {/* <div className="small-spec">
                                                    <img src={userIcon} alt="user-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.carSeats}</span>
                                                </div> */}
                                                <div className="medium-spec w-auto">
                                                    <img src={typeIcon} alt="type-icon" className="spec-icon" />
                                                    <span className="text-gray">
                                                        {
                                                            carTypesData.length > 0 ?
                                                                carTypesData.map((type, key) => {
                                                                    return (
                                                                        type.id == item.carTypeId ? type.carType : ''
                                                                    );
                                                                })
                                                                :
                                                                item.carTypeId
                                                        }
                                                    </span>
                                                </div>
                                                <div className="small-spec">
                                                    <img src={doorIcon} alt="door-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.carDoors}</span>
                                                </div>
                                                <div className="small-spec">
                                                    <img src={seatIcon} alt="seat-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.carSeats}</span>
                                                </div>
                                                <div className="medium-spec">
                                                    <img src={fuelIcon} alt="fuel-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.carFuelType}</span>
                                                </div>
                                                <div className="medium-spec">
                                                    <img src={transmissionIcon} alt="transmission-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.autoTransmission == 'Yes' ? 'Auto' : 'Manual'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="card-footer-dealer-logo-container">
                                                <img src={`${process.env.React_App_Host_Url}/images/dealers-logo/${item.dealerCompanyId}.png`} alt="dealer-logo" className="dealer-logo" />
                                            </div>
                                            <div className="card-footer-details p-0">
                                                <div className="footer-info">
                                                    <img src={checkIcon} alt="check-icon" className="footer-icons check-icon" />
                                                    <span className="card-footer-text text-gray">{item.rentalAvailableFor} day rental available</span>
                                                </div>
                                                <div className="footer-info">
                                                    <img src={infoIcon} alt="inof-icon" className="footer-icons" />
                                                    <span className="card-footer-text text-gray">Deposit: {item.securityDeposit}</span>
                                                </div>
                                                <div className="footer-info">
                                                    <img src={checkIcon} alt="check-icon" className="footer-icons check-icon" />
                                                    <span className="card-footer-text text-gray">Insurance Included</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="card-buttons">
                                            <a data-tooltip-id="vender_contact" data-tooltip-content={'Phone'} className="card-btn primary_background_color phone-btn">
                                                <img src={callIcon} alt="call-icon" className="card-btn-icons" />
                                            </a>
                                            <a data-tooltip-id="vender_email" data-tooltip-content={'Whatsapp'} className="card-btn background-green">
                                                <img src={whatsappIcon} alt="whatsapp-icon" className="card-btn-icons" />
                                            </a>
                                            <a data-tooltip-id="vender_whatsapp" data-tooltip-content={'Email'} className="card-btn background-orange send-btn">
                                                <img src={sendIcon} alt="send-icon" className="card-btn-icons" />
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
                :
                <div className="list-container">
                    {
                        carsData.map((item, index) => {
                            return (
                                <div key={index} onClick={() => { navigate({ pathname: '/car_details', search: `?${createSearchParams({ car_id: item.id })}` }) }}>
                                    <div className="car-cards car-cards-slider">
                                        <div className="card-header">
                                            {item.carPhotosArray !== null ?
                                                <img src={`${process.env.React_App_Host_Url}/images/cars-images/${item.featuredImg}`} alt={item.carPhotosArray[0]} onError={(e) => { e.target.src = defaultCarImg }} className='card-header-img' />
                                                :
                                                <img src={defaultCarImg} alt={defaultCarImg} className='card-header-img' />
                                            }
                                            {carsData !== null ?
                                                <div className="car-card-badge-container">
                                                    {
                                                        item.category.premium == "premium" ?
                                                            <span className="badge text-bg-dark car-card-badge">Premium</span>
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.category.featured == "featured" ?
                                                            <span className="badge text-bg-warning car-card-badge">Featured</span>
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.category.verified == "verified" ?
                                                            <span className="badge text-bg-success car-card-badge">Verified</span>
                                                            :
                                                            ''
                                                    }
                                                    {
                                                        item.discountOffer == 0 ?
                                                            ''
                                                            :
                                                            <span className="badge text-bg-light car-card-badge">{item.discountOffer}% Discount</span>
                                                    }
                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                        <div className="card-body">
                                            <h4>{item.carModelNo}</h4>
                                            <div className="card-details">
                                                <div className="details-one">
                                                    {

                                                        item.discountOffer == 0 ?
                                                            ""
                                                            :
                                                            <span className="details text-orange"><span className="text-line">{item.perDayRentalCost}</span></span>
                                                    }
                                                    <span className="details text-orange">AED {Number(item.perDayRentalCost) - Number(item.perDayRentalCost) / 100 * Number(item.discountOffer)} <span className="primary_text_color">/ day</span></span>
                                                    <div className="d-flex align-items-center">
                                                        <img src={roadIcon} alt="road-icon" className="spec-icon" />
                                                        <span className="details text-gray">{item.perDayMilagelimit}</span>
                                                    </div>
                                                </div>
                                                <div className="details-two">
                                                    {
                                                        item.discountOffer == 0 ?
                                                            ''
                                                            :
                                                            <span className="details text-orange"><span className="text-line">{item.weeklyRentalCost}</span></span>
                                                    }
                                                    <span className="details text-orange">AED {Number(item.weeklyRentalCost) - Number(item.weeklyRentalCost) / 100 * Number(item.discountOffer)} <span className="primary_text_color">/ week</span></span>
                                                    <div className="d-flex align-items-center">
                                                        <img src={roadIcon} alt="road-icon" className="spec-icon" />
                                                        <span className="details text-gray">{item.weeklyMilageLimit}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="specs">
                                                {/* <div className="small-spec">
                                                    <img src={userIcon} alt="user-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.carSeats}</span>
                                                </div> */}
                                                <div className="medium-spec w-auto">
                                                    <img src={typeIcon} alt="type-icon" className="spec-icon" />
                                                    <span className="text-gray">
                                                        {
                                                            carTypesData.length > 0 ?
                                                                carTypesData.map((type, key) => {
                                                                    return (
                                                                        type.id == item.carTypeId ? type.carType : ''
                                                                    );
                                                                })
                                                                :
                                                                item.carTypeId
                                                        }
                                                    </span>
                                                </div>
                                                <div className="small-spec">
                                                    <img src={doorIcon} alt="door-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.carDoors}</span>
                                                </div>
                                                <div className="small-spec">
                                                    <img src={seatIcon} alt="seat-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.carSeats}</span>
                                                </div>
                                                <div className="medium-spec">
                                                    <img src={fuelIcon} alt="fuel-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.carFuelType}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="card-footer-dealer-logo-container">
                                                <img src={`${process.env.React_App_Host_Url}/images/dealers-logo/${item.dealerCompanyId}.png`} alt="dealer-logo" className="dealer-logo" />
                                            </div>
                                            <div className="card-footer-details p-0">
                                                <div className="footer-info">
                                                    <img src={checkIcon} alt="check-icon" className="footer-icons check-icon" />
                                                    <span className="card-footer-text text-gray">{item.rentalAvailableFor} day rental available</span>
                                                </div>
                                                <div className="footer-info">
                                                    <img src={infoIcon} alt="inof-icon" className="footer-icons" />
                                                    <span className="card-footer-text text-gray">Deposit: {item.securityDeposit}</span>
                                                </div>
                                                <div className="footer-info">
                                                    <img src={checkIcon} alt="check-icon" className="footer-icons check-icon" />
                                                    <span className="card-footer-text text-gray">Insurance Included</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="card-buttons">
                                            <a data-tooltip-id="vender_contact" data-tooltip-content={'Phone'} className="card-btn primary_background_color phone-btn">
                                                <img src={callIcon} alt="call-icon" className="card-btn-icons" />
                                            </a>
                                            <a data-tooltip-id="vender_email" data-tooltip-content={'Whatsapp'} className="card-btn background-green">
                                                <img src={whatsappIcon} alt="whatsapp-icon" className="card-btn-icons" />
                                            </a>
                                            <a data-tooltip-id="vender_whatsapp" data-tooltip-content={'Email'} className="card-btn background-orange send-btn">
                                                <img src={sendIcon} alt="send-icon" className="card-btn-icons" />
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    );
};

export default CarCardSlider;