import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate,createSearchParams } from 'react-router-dom';

const SectionFive = () => {

    const navigate = useNavigate();

    const [citiesData, setCitiesData] = useState([]);

    const fetchingCitiesApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/cities/by/status`,
            });
            // console.log(response);
            if (response.status == 200) {
                setCitiesData(response.data.data.slice(0,4));
            }
        } catch (error) {
            console.log('Failed while fetching cities data api: ', error);
        }
    };

    useEffect(() => {
        fetchingCitiesApi();
    }, []);

    return (
        <>
            <div className='home-section-five'>
                <div className="section-five-header">
                    <h3 className='primary_text_color'>Find car rental services near you</h3>
                </div>

                <div className="cities-cards-container">
                    {
                        citiesData.length > 0 ?
                            citiesData.map((item, index) => {
                                return (
                                    <div onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ city: item.cityName.toLowerCase() })}` }, { state: { filterBy: 'city', value: item.id } }) }} key={index} className="city-card">
                                        <div className='city-card-img' style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1)), url(${process.env.React_App_Host_Url}/images/cities-images/${item.pictureUrl})` }}>
                                            <p className='city-name'>{item.cityName}</p>
                                            <p className='cars-details'>View Rental Cars in {item.cityName}</p>
                                        </div>
                                    </div>
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

export default SectionFive;