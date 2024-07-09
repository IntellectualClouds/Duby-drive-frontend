import React, { useEffect, useState } from "react";

import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SectionOne = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [lengthData, setLengthData] = useState([]);

    const fetchingBrandsApi = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `${process.env.React_App_Host_Url}/api/get/data/carBrands/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setData(response.data.data);
            }
        } catch (error) {
            // console.log('Failed while fetching brands api: ', error);
        }
    };
    const fetchingBrandLength = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/count/data/carBrands`
            });
            // console.log(response);
            if (response.status == 200) {
                setLengthData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car length by brands api: ', error);
        }
    };

    useEffect(() => {
        fetchingBrandsApi();
        fetchingBrandLength();
    }, []);

    return (
        <>
            <div className="brands-section-one">
                <div className="brands-page-header text-center">
                    <h3 className="primary_text_color mb-3">{data.length > 0 ? data.length : 0} Car Brands available for hire in United Arab Emirates</h3>
                    <p className="para text-center">
                        If you’re looking to drive a car model of a specific auto brand in the UAE, you’ve come to the right place. DubyDrive.com hosts the largest selection of cars
                        for rent in the UAE. Listed below are cars available for hire by every auto brand. Be it cars by Ferrari, Lamborghini, Rolls Royce, Hyundai, Toyota, Honda,
                        Kia and so on.
                    </p>
                </div>

                <div className="brands-box-container">
                    {
                        data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <div key={index} className="brand-box">
                                        <div className="brand-box-head">
                                            <img src={`${process.env.React_App_Host_Url}/images/car-brands-logo/${item.logo}`} alt={item.logo} className="brand-logo" />
                                        </div>
                                        <div className="brand-box-body">
                                            <h3>{item.brandName}</h3>
                                            <p onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ brand: item.brandName })}` }, { state: { filterBy: 'brand', value: item.id } }) }}
                                                className='primary_text_color links'>
                                                {lengthData.map((itm, ind) => {
                                                    return (
                                                        <span key={ind}>{item.id == itm.carBrandId ? itm.total_length + ' Cars Rental Offers >' : ''}</span>
                                                    );
                                                })}</p>
                                        </div>
                                    </div>
                                );
                            })
                            :
                            ''
                    }
                </div>

                <div className="brands-page-details-container">
                    <div className="details mb-4">
                        <h3 className="brand_heading primary_text_color">Why people prefer to rent by brand</h3>
                        <p className="para">
                            Renting a car is a safe and secure way to travel, giving you your own personal vehicle in which you can travel in comfort. But when you think about renting a car, do you tend to rent a car from a company or brand you’ve never used before, or among the ones you’re familiar with?
                        </p>
                    </div>

                    <div className="details mb-4">
                        <h3 className="brand_heading primary_text_color">Sense of Familiarity</h3>
                        <p className="para">
                            Most people these days are opting to rent cars that they have a sense of familiarity with, as cars of the same company may have different driving dynamics, but ultimately share the same infotainment system, and other amenities, such as climate controls or seat and steering wheel adjustments.
                        </p>
                        <p className="para">
                            The brand design makes people more comfortable in the car. Adding to this, different brands are known to have different specialties. For example, Rolls Royce is known to make some of the most comfortable, luxurious cars in the world, whereas Toyota is known to make some of the strongest, most reliable vehicles, as well as a plethora of economy vehicles.
                        </p>
                    </div>

                    <div className="details mb-4">
                        <h3 className="brand_heading primary_text_color">Renting your favorite brand</h3>
                        <p className="para">
                            This is why renting by brand is becoming more popular, as it tends to simplify the process of choosing which car to rent. Given most cars available for rent include popular models from world-class automotive brands, car rentals .                        </p>
                        <p className="para">
                            People frequently travel for work and leisure, and they need a car during trips abroad. Adding to this, many people may not want the hassle of owning and maintaining a car, hence, they opt to rent cars.
                        </p>
                        <p className="para">
                            You can find cars of all ranges that you can enjoy using all over the UAE. Find your future rental car at DubyDrive.com today!
                        </p>
                    </div>

                    <div className="details mb-4">
                        <h3 className="brand_heading primary_text_color">Most Popular Car Brands</h3>
                        <p className="para">
                            Are you planning to buy a car? Why not rent first? Test drive it yourself for as long as you like - just to be sure. Hire a car for a few days or a week. You’re sure to find every popular car brand for rent in the UAE on this page. Get it right this time!
                        </p>
                        <p className="para">
                            If you’re planning a trip to the UAE for work, visit, or to settle for good, you’re sure to need a car. It’s as good as any other basic necessity of life in the middle east. The sweltering summers aren’t amicable and places are often hard or slow to reach by public transport.
                        </p>
                        <p className="para">
                            Some of the most popular auto-motor brands in the UAE include:
                        </p>
                    </div>

                    {/* Dynamic Brands Description */}

                    {/* <div className="details mb-4">
                        <h3 className="brand_heading">Brand Name (Dynamic Description)</h3>
                        <p className="para">
                            A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs.A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs.
                        </p>
                    </div> */}

                    {data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                item.descriptionStatus == true ?
                                    <div key={index} className="details mb-4">
                                        <h3 className="brand_heading">{item.brandName}</h3>
                                        <p className="para">{item.brandDescription}</p>
                                    </div>
                                    :
                                    ''
                            );
                        })
                        :
                        ''
                    }
                </div>
            </div>
        </>
    );
};

export default SectionOne;