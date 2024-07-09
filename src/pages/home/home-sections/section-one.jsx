import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const SectionOne = () => {

    const navigate = useNavigate();

    const [carData, setCarData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const fetchingCarData = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setCarData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car data api: ', error);
        }
    };

    const serachInputOnChangeHandler = (e) => {
        if (e.target.value.toLowerCase() == "") {
            setFilterData([]);
        }
        else if (e.target.value.toLowerCase() == 'cars' || e.target.value.toLowerCase() == 'car') {
            setFilterData(carData);
        }
        else {
            setFilterData(
                // carData.filter(({ carModelNo, carType, carBrandName }) => (
                //     carModelNo.toLowerCase().includes(e.target.value.toLowerCase()) ||
                //     carType.toLowerCase().includes(e.target.value.toLowerCase()) ||
                //     carBrandName.toLowerCase().includes(e.target.value.toLowerCase())
                // ))
                carData.filter(({ carModelNo }) => (
                    carModelNo.toLowerCase().includes(e.target.value.toLowerCase())
                ))
            );
        }
    };

    const onKeyPressHandler = (e) => {
        if (e.key == 'Enter') {
            if (filterData.length > 0) {
                const cars_id_array = [];
                for (let i = 0; i < filterData.length; i++) {
                    cars_id_array.push(filterData[i].id);
                }
                navigate('/cars', { state: cars_id_array });
            }
            else {
                toast.error('No result found');
            }
        }
    };

    useEffect(() => {
        fetchingCarData();
        document.getElementById('home_search_input').value = '';
        // document.getElementById('home_search_input').focus();
    }, []);

    return (
        <>
            <ToastContainer theme='dark' />
            <div className='home-section-one'>
                <div className='sub-section col-md-6 text-white'>
                    <h1 className='text-center text-wrap home-main-text home-main-heading'>CLICK, SELECT AND DRIVE</h1>
                    <p className='text-center text-wrap home-main-text'>Book directly from local car rental. No commission, no mark-ups.</p>

                    <div className="search-container">
                        <div className="search-input">
                            <div className="search-icon"></div>
                            <input id='home_search_input' autoComplete='off' onChange={serachInputOnChangeHandler} onKeyPress={onKeyPressHandler} type="text" placeholder='Search Car Rentals in Dubai' />
                        </div>
                        <button onClick={() => { navigate('/cars') }} className="btn home_btn primary_background_color links_hover view-all-cars-btn">View All Cars <div className="btn-icon"></div> </button>
                        {filterData.length > 0 ?
                            <div className="search-results-container col-md-12">
                                {filterData.length > 0 ?
                                    filterData.map((item, index) => {
                                        return (
                                            <div key={index} onClick={() => { navigate({ pathname: 'car_details', search: `?${createSearchParams({ car_id: item.id })}` }) }} className='search-result-item'>
                                                <p className='p-2 mb-1'>{item.carModelNo}</p>
                                                <img src={`${process.env.React_App_Host_Url}/images/cars-images/${item.carPhotosArray[0]}`} alt={item.carPhotosArray[0]} height={50} width={100} />
                                            </div>
                                        );
                                    })
                                    :
                                    ''
                                }
                            </div>
                            :
                            ''
                        }
                    </div>

                </div>
            </div>
        </>
    );
};

export default SectionOne;