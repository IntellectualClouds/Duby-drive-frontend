import React, { useEffect, useState } from 'react';

import { createSearchParams, useNavigate } from 'react-router-dom';

import downIcon from "../../../assets/icons/down.png";
import upIcon from "../../../assets/icons/up.png";

import axios from 'axios';

const SectionTwo = () => {

    const navigate = useNavigate();

    const [carTypesData, setCarTypesData] = useState([]);
    const [carTypeDataLimit, setCarTypeDataLimit] = useState(10);

    const fetchingCarTypesData = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `${process.env.React_App_Host_Url}/api/get/data/carTypes/by/status`
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
    }, []);

    return (
        <>
            <div className='home-section-two'>
                <div className="section-two-header">
                    <h3 className='section-two-main-heading'>Book Your Car Rental, Luxury Yacht and Tour Packages <span onClick={() => { navigate('/cars') }} className="links primary_text_color h6 ms-1">See more cars<img className='ms-0' src={downIcon} alt="down-icon" height={30} width={30} /></span></h3>
                </div>
                <div className="cards-container">
                    {
                        carTypesData.length > 0 ?
                            carTypesData.slice(0, carTypeDataLimit).map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {
                                            item.category == 'Cars' ?
                                                <div key={index} onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ type: item.carType.toLowerCase() })}` }, { state: { filterBy: 'carType', value: item.id } }) }} className="cards">
                                                    <div className="car-card">
                                                        <img src={`${process.env.React_App_Host_Url}/images/type-images/${item.image}`} alt={item.image} className='car-card-img' />
                                                        <span className="text-center home-section-two-text">
                                                            {item.carType}
                                                        </span>
                                                    </div>
                                                </div>
                                                :
                                                item.category == 'Yachts' ?
                                                    <div key={index} onClick={() => { navigate('/yachts') }} className="cards">
                                                        <div className="car-card">
                                                            <img src={`${process.env.React_App_Host_Url}/images/type-images/${item.image}`} alt={item.image} className='car-card-img' />
                                                            <span className="text-center home-section-two-text">
                                                                {item.carType}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    :
                                                    item.category == 'Tour Packages' ?
                                                        <div key={index} onClick={() => { navigate('/desert_safari') }} className="cards">
                                                            <div className="car-card">
                                                                <img src={`${process.env.React_App_Host_Url}/images/type-images/${item.image}`} alt={item.image} className='car-card-img' />
                                                                <span className="text-center home-section-two-text">
                                                                    {item.carType}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        :
                                                        item.category == 'Driver Services' ?
                                                            <div key={index} onClick={() => { navigate('/driver_service') }} className="cards">
                                                                <div className="car-card">
                                                                    <img src={`${process.env.React_App_Host_Url}/images/type-images/${item.image}`} alt={item.image} className='car-card-img' />
                                                                    <span className="text-center home-section-two-text">
                                                                        {item.carType}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            :
                                                            ''
                                        }
                                    </React.Fragment>
                                );
                            })
                            :
                            ''
                    }
                    {/* FIXED */}
                    {/* <div onClick={() => { navigate('/desert_safari') }} className="cards">
                        <div className="car-card">
                            <img src={desert} alt="desert-safari" className='car-card-img p-3' />
                            <span className="text-center home-section-two-text">
                                Desert Safari
                            </span>
                        </div>
                    </div>
                    <div onClick={() => { navigate('/driver_service') }} className="cards">
                        <div className="car-card">
                            <img src={serviceCar} alt="service" className='car-card-img' />
                            <span className="text-center home-section-two-text">
                                Driver Service
                            </span>
                        </div>
                    </div>
                    <div onClick={() => { navigate('/cars') }} className="cards">
                        <div className="car-card">
                            <img src={car} alt="car" className='car-card-img' />
                            <span className="text-center home-section-two-text">
                                Cars
                            </span>
                        </div>
                    </div>
                    <div onClick={() => { navigate('/yachts') }} className="cards">
                        <div className="car-card">
                            <img src={yacht} alt="yacht" className='car-card-img' />
                            <span className="text-center home-section-two-text">
                                Yacht
                            </span>
                        </div>
                    </div> */}
                    {/* <div onClick={() => { navigate('/quad_biking') }} className="cards">
                        <div className="car-card">
                            <img src={bike} alt="bike" className='car-card-img' />
                            <span className="text-center home-section-two-text">
                                Dune Bashing
                            </span>
                        </div>
                    </div> */}
                </div>

                {
                    carTypeDataLimit == carTypesData.length ?
                        <div className='mt-4 d-flex justify-content-center'>
                            <button onClick={() => { setCarTypeDataLimit(10) }} className="btn primary_text_color section-two-btn">See less <img className='ms-1' src={upIcon} alt="down-icon" height={15} width={15} /></button>
                        </div>
                        :
                        <div className='mt-4 d-flex justify-content-center'>
                            <button onClick={() => { setCarTypeDataLimit(carTypesData.length) }} className="btn primary_text_color section-two-btn">See more <img src={downIcon} alt="down-icon" height={25} width={25} /></button>
                        </div>
                }

                <div className='text-container'>
                    <p className='para'>
                        Looking for a reliable budget-friendly rent a car near you? Your search ends here. With DubyDrive, simply enjoy easy and direct booking with our top-notch car rental partner companies in UAE and experience outstanding services at affordable price. Get a great deals when you book a rental car through us. Dubudrive.com is the most advanced car rental online portal and business platform in Dubai. Dedicated to simplify the process of renting all type of vehicles. Choose your dream vehicles from our most trusted car rental businesses. Whether you are a tourist or local resident, we assure you will get the best cheapest rental deal in the town.
                    </p>
                </div>
            </div>
        </>
    );
};

export default SectionTwo;