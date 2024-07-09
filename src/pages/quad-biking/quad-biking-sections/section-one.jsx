import React, { useEffect, useState } from "react";

import QuadBikePageBannerOne from "../../../components/banners/quad-bike-page-banner-one";
import QuadBikePageBannerTwo from "../../../components/banners/quad-bike-page-banner-two";

import seatIcon from "../../../assets/icons/seat.png";
import doorIcon from "../../../assets/icons/door.png";

import checkIcon from "../../../assets/icons/check.png";
import tickIcon from "../../../assets/icons/tick.png";

import callIcon from "../../../assets/icons/call.png";
import whatsappIcon from "../../../assets/icons/whatsapp.png";
import sendIcon from "../../../assets/icons/send.png";
import axios from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";

const SectionOne = () => {

    const navigate = useNavigate();

    const [bikeData, setBikeData] = useState([]);

    const fetchingBikeDataApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/quadBiking/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setBikeData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching bike data api: ', error);
        }
    };

    useEffect(() => {
        fetchingBikeDataApi();
    }, []);

    return (
        <>
            <div className="yacht-page-section-one">
                <div className="row">
                    <div className="col-md-3">
                        <div className="d-flex justify-content-center mt-5">                        
                        <QuadBikePageBannerTwo/>
                        </div>
                    </div>
                    <div className="col-md-9 yacht-details-section">
                        <div className="yacht-page-header">
                            <h2 className="mb-3">Desert Buggy Rental in Dubai</h2>
                            <p className="para">Explore, compare and rent from our vast network of buggy rental suppliers in Dubai and get the best dune buggy deals in town!</p>
                        </div>

                        <QuadBikePageBannerOne />

                        <div className="yacht-cards-details-container">
                            {bikeData.length > 0 ?
                                bikeData.map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => { navigate({ pathname: '/quad_biking_details', search: `?${createSearchParams({ quad_bike_id: item.id })}` }) }} className="yacht-card col-md-11 mt-0">
                                            <div className="yacht-card-img-container col-md-4">
                                                {
                                                    item.quadBikePhotosArray !== null ?
                                                        <img src={`${process.env.React_App_Host_Url}/images/quad-bike-images/${item.quadBikePhotosArray[0]}`} alt={item.quadBikePhotosArray[0]} className="yacht-card-img" />
                                                        :
                                                        ''
                                                }
                                            </div>
                                            <div className="yacht-card-details col-md-6">
                                                <h5 className="yacht-name">{item.bikeName}</h5>
                                                <div className="yacht-specs-container">
                                                    <div className="yacht-spec-item">
                                                        <span className="text-gray">{item.bikeType}</span>
                                                    </div>
                                                    <div className="yacht-spec-item">
                                                        <img src={seatIcon} alt="yacht-icon" className="spec-icon" />
                                                        <span className="text-gray">{item.seats}</span>
                                                    </div>
                                                    <div className="yacht-spec-item">
                                                        <img src={doorIcon} alt="bed-icon" className="spec-icon" />
                                                        <span className="text-gray">{item.doors}</span>
                                                    </div>
                                                </div>
                                                <div className="yacht-card-dealer-info quad-card-dealer-info">
                                                    <img src={`${process.env.React_App_Host_Url}/images/dealers-logo/${item.dealerId}.png`} alt="dealer-logo" className="yacht-card-dealer-logo" />
                                                    <div className="quad-bike-info-container">
                                                        <div className="quad-bike-info">
                                                            <img src={checkIcon} alt="check-icon" className="quad-bike-check-icon" />
                                                            <span>Price for 1 person</span>
                                                        </div>
                                                        {item.funDesertActivities == 'Yes' ?
                                                            <div className="quad-bike-info">
                                                                <img src={checkIcon} alt="check-icon" className="quad-bike-check-icon" />
                                                                <span>Fun Desert Activities</span>
                                                            </div>
                                                            :
                                                            ''
                                                        }
                                                        {
                                                            item.safetyGearAndTraining == 'Yes' ?
                                                                <div className="quad-bike-info mb-0">
                                                                    <img src={checkIcon} alt="check-icon" className="quad-bike-check-icon" />
                                                                    <span>Safety gear & training</span>
                                                                </div>
                                                                :
                                                                ''
                                                        }
                                                    </div>
                                                </div>
                                                <div className="card-buttons">
                                                    <div className="card-btn primary_background_color phone-btn yacht-phone-btn">
                                                        <img src={callIcon} alt="call-icon" className="card-btn-icons" />
                                                    </div>
                                                    <div className="card-btn background-green">
                                                        <img src={whatsappIcon} alt="whatsapp-icon" className="card-btn-icons" />
                                                    </div>
                                                    <div className="card-btn background-orange yacht-send-btn">
                                                        <img src={sendIcon} alt="send-icon" className="card-btn-icons" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="yacht-card-price-info-container col-md-2">
                                                <h6>AED {item.pricePerHour} <span className="text-gray">/ hour</span></h6>
                                                <h6>AED {item.priceTwoHour} <span className="text-gray">/ 2 hour</span></h6>
                                                {item.foodAndBeverages == 'Yes' ?
                                                    <div className="quad-refreshment-info">
                                                        {/* <img src={tickIcon} alt="tick-icon" className="quad-bike-tick-icon" /> */}
                                                        <span>F&B Combo @ AED {item.snacksPrice} p.p.</span>
                                                    </div>
                                                    :
                                                    ''
                                                }
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
            </div>
        </>
    );
};

export default SectionOne;