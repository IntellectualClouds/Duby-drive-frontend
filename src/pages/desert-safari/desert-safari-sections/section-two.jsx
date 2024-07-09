import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

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
import axios from 'axios';

const SectionTwo = () => {

    const navigate = useNavigate();

    const [DesertSafariData, setDesertSafariData] = useState([]);

    const fetchingDesertSafariData = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/desertSafari/by/status`,
            });
            // console.log(response);
            if (response.status == 200) {
                setDesertSafariData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching desert safari data: ', error);
        }
    };

    useEffect(() => {
        fetchingDesertSafariData();
    }, []);

    return (
        <>
            <div className="desert-safari-section-two">
                <div className="desert-safari-cards-container">
                    {DesertSafariData.length > 0 ?
                        DesertSafariData.map((item, index) => {
                            return (
                                <div key={index} onClick={() => { navigate({ pathname: '/desert_safari_details', search: `?${createSearchParams({ desert_safari_id: item.id })}` }) }} className="desert-safari-card">
                                    <div className="desert-safari-card-head">
                                        {
                                            item.desertPhotosArray !== null ?
                                                <img src={`${process.env.React_App_Host_Url}/images/desert-images/${item.desertPhotosArray[0]}`} alt={item.desertPhotosArray[0]} />
                                                :
                                                ''
                                        }

                                        {
                                            item.discountOffer == 0 ?
                                                ''
                                                :
                                                <div className='desert-safari-card-discount-badge-container'>
                                                    <span className="badge text-bg-dark car-card-badge">{item.discountOffer}% Discount</span>
                                                </div>
                                        }

                                    </div>
                                    <div className="desert-safari-card-body">
                                        <div className="desert-safari-details">
                                            <div className="desert-safari-info">
                                                <div>
                                                    <h5>{item.desertSafariName}</h5>
                                                    <h6>{item.transferType} transfer per adult</h6>
                                                </div>
                                                <div className='desert-safari-price-container'>
                                                    <span className="primary_text_color">AED {item.adultPrice}</span>
                                                </div>
                                            </div>
                                            {/* <p className="para mb-2">{item.description}</p> */}
                                        </div>
                                        <div className="desert-safari-features">
                                            {item.hotelPickAndDrop == true ?
                                                <img src={jeepIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                :
                                                ''
                                            }
                                            {item.duneBashing == true ?
                                                <img src={thrillingIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                :
                                                ''
                                            }
                                            {item.camelRiding == true ?
                                                <img src={camelIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                :
                                                ''
                                            }
                                            {item.unlimitedRefreshments == true ?
                                                <img src={refreshmentIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                :
                                                ''
                                            }
                                            {item.bbqDinner == true ?
                                                <img src={bbqIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                :
                                                ''
                                            }
                                            {
                                                item.nonVegDishes == true ?
                                                    <img src={novVegIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                    :
                                                    ''
                                            }
                                            {
                                                item.sheesha == true ?
                                                    <img src={hookahIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                    :
                                                    ''
                                            }
                                            {
                                                item.separateWashrooms == true ?
                                                    <img src={washroomIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                    :
                                                    ''
                                            }
                                            {
                                                item.photography == true ?
                                                    <img src={cameraIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                    :
                                                    ''
                                            }
                                            {
                                                item.tanuraShow == true ?
                                                    <img src={showIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                    :
                                                    ''
                                            }
                                            {
                                                item.bellyDance == true ?
                                                    <img src={danceIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                                    :
                                                    ''
                                            }
                                            {/* sandboarding is missing */}
                                            {/* <img src={suvIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            <img src={falconIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            <img src={campIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            <img src={arabicIcon} alt="features-icon" className='desert-safari-feature-icon' />
                                            <img src={airConditionerIcon} alt="features-icon" className='desert-safari-feature-icon' /> */}
                                        </div>
                                        <div className="desert-safari-key-features">
                                            <h6 className='primary_text_color mb-3'>Key Features</h6>
                                            {item.tickets == true ?
                                                <div className='key-features-details'>
                                                    <img className='me-2' height={18} width={18} src={tickets} alt="key-feature-icon" />
                                                    <span className="key-feature-text">Free Tickets</span>
                                                </div>
                                                :
                                                ''
                                            }
                                            {
                                                item.accommodation == true ?
                                                    <div className='key-features-details'>
                                                        <img className='me-2' height={18} width={18} src={accommodation} alt="key-feature-icon" />
                                                        <span className="key-feature-text">Accommodation</span>
                                                    </div>
                                                    :
                                                    ''
                                            }
                                            {
                                                item.welcomeDrink == true ?
                                                    <div className='key-features-details'>
                                                        <img className='me-2' height={20} width={20} src={welcomeDrink} alt="key-feature-icon" />
                                                        <span className="key-feature-text">Welcome Drink</span>
                                                    </div>
                                                    :
                                                    ''
                                            }
                                        </div>
                                    </div>
                                    <div className="desert-safari-card-footer">
                                        <button className='btn primary_background_color text-white w-100 text-center'><img src={contactusIcon} alt="contactus-icon" height={20} width={20} /> Book now</button>
                                    </div>
                                </div>
                            )
                        })
                        :
                        ''
                    }
                </div>
            </div>
        </>
    );
};

export default SectionTwo;