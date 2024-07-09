import React, { useEffect, useState } from "react";

import { useNavigate, createSearchParams, useLocation, useSearchParams } from "react-router-dom";

import CarPageBannerOne from "../../../components/banners/car-page-banner-one";
import CarPageBannerTwo from "../../../components/banners/car-page-banner-two";

import userIcon from "../../../assets/icons/user.png";
import typeIcon from "../../../assets/icons/type.png";
import doorIcon from "../../../assets/icons/door.png";
import seatIcon from "../../../assets/icons/seat.png";
import fuelIcon from "../../../assets/icons/fuel.png";
import infoIcon from "../../../assets/icons/info.png";
import checkIcon from "../../../assets/icons/check.png";
import callIcon from "../../../assets/icons/call.png";
import whatsappIcon from "../../../assets/icons/whatsapp.png";
import sendIcon from "../../../assets/icons/send.png";
import roadIcon from "../../../assets/icons/road.png";

import defaultCarImg from "../../../assets/images/on-error/default-car.png";

import transmissionIcon from "../../../assets/icons/transmission.png";

import axios from "axios";

import filterIcon from "../../../assets/icons/filter-white.png";

import CarCardSlider from '../../../components/carousels/car_cards';
import { Tooltip } from "react-tooltip";

import logo from "../../../assets/logo/duby-drive.png";

const SectionOne = () => {

    const navigate = useNavigate();
    const props = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();

    const [pageHeading, setPageHeading] = useState("");

    const [citiesData, setCitiesData] = useState([]);
    const [citiesDataLength, setCitiesDataLength] = useState(8);

    const [carData, setCarData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [carTypesData, setCarTypesData] = useState([]);

    const [filterData, setFilterData] = useState([]);

    const [loaderStatus, setLoaderStatus] = useState(true);

    const fetchingBrandsDataApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/carBrands/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setBrandData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car brand data api: ', error);
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

    const fetchingCitiesApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/cities/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setCitiesData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching cities data api: ', error);
        }
    };

    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filterData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filterData.slice(startIndex, endIndex);

    const changePage = (page_number) => {
        setCurrentPage(page_number);
    };

    const fetchingCarsDataApi = async (e) => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                if (!e) {
                    setCarData(response.data.data);
                    setFilterData(response.data.data);
                    setPageHeading("RENT A CARS DAILY, WEEKLY AND MONTHLY BASIS");
                }
                else {

                    const array = response.data.data;

                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }

                    setCarData(array);
                    setFilterData(array);
                    setPageHeading(e);
                }
            }
        } catch (error) {
            console.log('Failed while fetching car data api: ', error);
        }
    };

    const fetchingCarDataByID = async (car_id_array) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/multiple/by/id`,
                data: { car_id_array }
            });
            // console.log(response);
            if (response.status == 200) {
                setCarData(response.data.data);
                setFilterData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car multiple data by id: ', error);
        }
    };

    const fetchingCarDataByFilter = async (filterData) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/multiple/by/filter`,
                data: { filterData }
            });
            // console.log(response);
            if (response.status == 200) {
                setCarData(response.data.data);
                setFilterData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car multiple data by filter: ', error);
        }
    };

    const fetchingCarDataByFilterBrand = async (filterData) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/multiple/by/filter/brand`,
                data: { filterData }
            });
            // console.log(response);
            if (response.status == 200) {
                setCarData(response.data.data);
                setFilterData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car multiple data by filter: ', error);
        }
    };

    const fetchByCity = async (cityId) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/by/city`,
                data: { cityId }
            });
            // console.log(response);
            if (response.status == 200) {
                setCarData(response.data.data);
                setFilterData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car data by city: ', error);
        }
    };

    const fetchingCarDataByCategory = async (fetchBy) => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/by/${fetchBy}`,
            });
            // console.log(response);
            if (response.status == 200) {
                setCarData(response.data.data);
                setFilterData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car data api by category: ', error);
        }
    };

    useEffect(() => {
        const propsData = props.state;
        fetchingBrandsDataApi();
        fetchingCarTypesData();
        fetchingCitiesApi();
        if (propsData) {
            if (propsData.filterBy) {
                if (propsData.filterBy == 'carType') {
                    fetchingCarDataByFilter(propsData);
                    setPageHeading(`Rent a ${searchParams.get('type')} car on daily, weekly and monthly basis`);
                }
                else if (propsData.filterBy == 'brand') {
                    // console.log('city id or name: ', propsData.value);
                    fetchingCarDataByFilterBrand(propsData);
                    setPageHeading(`Rent a ${searchParams.get('brand')} cars on daily, weekly and monthly basis`);
                }
                else if (propsData.filterBy == 'city') {
                    // console.log('city id or name: ', propsData.value);
                    fetchByCity(propsData.value);
                    setPageHeading(`RENT A Car in ${searchParams.get('city')} on daily, weekly & monthly basis`);
                }
            }
            else {
                fetchingCarDataByID(propsData);
            }
        }
        else if (searchParams.get('quick_link')) {
            fetchingCarsDataApi(searchParams.get('quick_link'));
        }
        else if (searchParams.get('category')) {
            const category = searchParams.get('category');
            fetchingCarDataByCategory(category);
            if (category == 'allCategory') {
                setPageHeading(`ALL EXCLUSIVE CAR RENTAL SERVICES NEAR YOU`);
            }
            else if (category == 'featuredAndVerified') {
                setPageHeading(`ALL FEATURED AND VERIFIED CAR RENTAL SERVICES NEAR YOU`);
            }
            else if (category == 'verified') {
                setPageHeading(`ALL VERIFIED CAR RENTAL SERVICES NEAR YOU`);
            }
        }
        else {
            fetchingCarsDataApi();
        }

        setTimeout(() => {
            setLoaderStatus(false);
        }, 5000);
    }, [searchParams]); // searchParams or Props

    return (
        <>
            <Tooltip id='vender_contact' style={{ zIndex: 1 }} />
            <Tooltip id='vender_whatsapp' style={{ zIndex: 1 }} />
            <Tooltip id='vender_email' style={{ zIndex: 1 }} />

            <div className="car-page-section-one">
                <div className="row">
                    <div id="car-page-filter-section" className="col-md-3">
                        {carData.length > 0 ?
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseZero"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseZero"
                                        >
                                            Select Car Brand
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseZero"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ carBrandId }) => (carBrandId.toString().includes(e.target.value)))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {brandData.length > 0 ?
                                                        brandData.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.id}>{item.brandName}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseOne"
                                        >
                                            Select Car Model No.
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseOne"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ carModelNo }) => (carModelNo.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {carData.length > 0 ?
                                                        carData.map((item, index) => {
                                                            return (
                                                                <option key={index}>{item.carModelNo}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTwo"
                                        >
                                            Select Car Type
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseTwo"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ carTypeId }) => (carTypeId.toString().includes(e.target.value)))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {carTypesData.length > 0 ?
                                                        carTypesData.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.id}>{item.carType}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseThree"
                                        >
                                            Select Fuel Type
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseThree"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ carFuelType }) => (carFuelType.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    <option>Petrol</option>
                                                    <option>Diesel</option>
                                                    <option>Electric</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFour"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFour"
                                        >
                                            Auto Transmission
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseFour"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ autoTransmission }) => (autoTransmission.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFive"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFive"
                                        >
                                            GCC Specs
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseFive"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ gccSpecs }) => (gccSpecs.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseSix"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseSix"
                                        >
                                            No. of Seats
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseSix"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ carSeats }) => (carSeats.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseSeven"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseSeven"
                                        >
                                            No. of Doors
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseSeven"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ carDoors }) => (carDoors.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseEight"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseEight"
                                        >
                                            Luggage
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseEight"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ carLuggage }) => (carLuggage.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseNine"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseNine"
                                        >
                                            Insurance Type
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseNine"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ insuranceType }) => (insuranceType.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>Basic</option>
                                                    <option>Comprehensive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTen"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTen"
                                        >
                                            Select Car Color
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseTen"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(carData.filter(({ carExteriorColor }) => (carExteriorColor.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {carData.length > 0 ?
                                                        carData.map((item, index) => {
                                                            return (
                                                                <option key={index}>{item.carExteriorColor}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            ''
                        }

                        <div className="d-flex justify-content-center mt-5">
                            <CarPageBannerTwo />
                        </div>

                    </div>
                    <div className="col-md-9 details-section">
                        <div className="car-page-header">
                            <h2>{pageHeading !== "" ? pageHeading.toUpperCase() : "RENT A CARS DAILY, WEEKLY AND MONTHLY BASIS"}</h2>
                            <p className="para">Choose from a range of cars fleet at the best rates direct from suppliers.</p>
                        </div>

                        <CarPageBannerOne />

                        {
                            citiesData.length > 0 ?
                                <div className="car-filters-container">
                                    <div className="col-md-11 car-filters">
                                        {
                                            citiesData.length > 0 ?
                                                citiesData.slice(0, citiesDataLength).map((item, index) => {
                                                    return (
                                                        // <a key={index} onClick={() => { navigate({ pathname: '/cars_filter', search: `?${createSearchParams({ city: item.cityName.toLowerCase() })}` }, { state: { filterBy: 'city', value: item.id } }) }} className="primary_text_color page-links car-page-filter-links">Rent a Car in {item.cityName}</a>
                                                        <a key={index} onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ city: item.cityName.toLowerCase() })}` }, { state: { filterBy: 'city', value: item.id } }) }} className="primary_text_color page-links car-page-filter-links">Rent a Car in {item.cityName}</a>
                                                    );
                                                })
                                                :
                                                ''
                                        }
                                        {
                                            citiesDataLength == 8 ?
                                                <button onClick={() => { setCitiesDataLength(citiesData.length) }} className="btn primary_background_color text-white car-page-filter-btn">See more</button>
                                                :
                                                <button onClick={() => { setCitiesDataLength(8) }} className="btn primary_background_color text-white car-page-filter-btn">See less</button>
                                        }
                                    </div>
                                </div>
                                :
                                ''
                        }

                        <div className="car-cards-details-container">
                            {currentData.length > 0 ?
                                currentData.map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => { navigate({ pathname: '/car_details', search: `?${createSearchParams({ car_id: item.id })}` }) }}>
                                            <div className="car-cards">
                                                <div className="card-header">
                                                    {
                                                        item.carPhotosArray !== null ?
                                                            <img src={`${process.env.React_App_Host_Url}/images/cars-images/${item.featuredImg}`} alt={item.carPhotosArray[0]} onError={(e) => { e.target.src = defaultCarImg }} className='card-header-img' />
                                                            :
                                                            <img src={defaultCarImg} alt={defaultCarImg} className='card-header-img' />
                                                    }
                                                    {currentData !== null ?
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
                                                                    ''
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
                                                        {/* <img src={`${process.env.React_App_Host_Url}/images/car-brands-logo/${item.carBrandId}.png`} alt="brand-logo" className="dealer-logo" /> */}
                                                    </div>
                                                    <div className="card-footer-details ps-0">
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
                                                <div className="card-buttons">
                                                    <a data-tooltip-id="vender_contact" data-tooltip-content={'Phone'} className="card-btn primary_background_color phone-btn">
                                                        <img src={callIcon} alt="call-icon" className="card-btn-icons" />
                                                    </a>
                                                    <a data-tooltip-id="vender_email" data-tooltip-content={'Whatsapp'} className="card-btn background-green">
                                                        <img src={whatsappIcon} alt="whatsapp-icon" className="card-btn-icons" />
                                                    </a>
                                                    <a data-tooltip-id="vender_whatsapp" data-tooltip-content={'Email'} className="card-btn background-orange send-btn">
                                                        <img src={sendIcon} alt="send-icon" className="card-btn-icons" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                :
                                ''
                            }
                        </div>

                        {
                            currentData.length > 0 ?
                                <div className="pagination-bar p-2 d-flex justify-content-center mt-3">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination flex-wrap justify-content-center">
                                            <li className="page-item pagination-item" onClick={() => { changePage(currentPage - 1) }}>
                                                <a className="page-link p-2 ps-4 pe-4" href="#top">
                                                    Previous
                                                </a>
                                            </li>
                                            {Array.from({ length: totalPages }, (item, index) => (
                                                <li key={index} onClick={() => { changePage(index + 1) }} className="page-item pagination-item">
                                                    <a className="page-link p-2 ps-4 pe-4" href="#top">
                                                        {index + 1}
                                                    </a>
                                                </li>
                                            ))}
                                            <li className="page-item pagination-item" onClick={() => { changePage(currentPage + 1) }}>
                                                <a className="page-link p-2 ps-4 pe-4" href="#top">
                                                    Next
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>

                                </div>
                                :
                                loaderStatus == true ?
                                    <div className="d-flex justify-content-center align-items-center p-5">
                                        <div className="m-2 spinner-grow text-dark" role="status">
                                            <span className="sr-only" />
                                        </div>

                                        <div className="m-2 spinner-grow text-dark" role="status">
                                            <span className="sr-only" />
                                        </div>

                                        <div className="m-2 spinner-grow text-dark" role="status">
                                            <span className="sr-only" />
                                        </div>

                                        <div className="m-2 spinner-grow text-dark" role="status">
                                            <span className="sr-only" />
                                        </div>

                                        <div className="m-2 spinner-grow text-dark" role="status">
                                            <span className="sr-only" />
                                        </div>
                                    </div>
                                    :
                                    <div className="d-flex justify-content-center align-items-center p-5">
                                        <h3 className="primary_text_color text-center">No Results...</h3>
                                    </div>

                        }
                    </div>
                </div>

                <button onClick={() => { document.querySelector('.mobile-filter-sidebar').classList.add('active-filter-sidebar') }} className="filterSideBarBtn primary_background_color"><img src={filterIcon} alt="filter-icon" height={20} width={20} /> Filters</button>
            </div>

            <div className="mobile-filter-sidebar background-transparent">
                <div className="mobile-sidebar-container">
                    <div className="mobile-filter-sidebar-header">
                        <img onClick={() => { navigate('/') }} src={logo} alt="logo" className='mobile-filter-sidebar-header-logo' />
                        <h4 onClick={() => { navigate('/') }}>DubyDrive</h4>
                        <span className='mobile-filter-sidebar-close-icon' onClick={() => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar') }}>&times;</span>
                    </div>
                    <div className="mobile-filter-sidebar-body">
                        {carData.length > 0 ?
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseZero"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseZero"
                                        >
                                            Select Car Brand
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseZero"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ carBrandId }) => (carBrandId.toString().includes(e.target.value)))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {brandData.length > 0 ?
                                                        brandData.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.id}>{item.brandName}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseOne"
                                        >
                                            Select Car Model No.
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseOne"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ carModelNo }) => (carModelNo.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {carData.length > 0 ?
                                                        carData.map((item, index) => {
                                                            return (
                                                                <option key={index}>{item.carModelNo}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTwo"
                                        >
                                            Select Car Type
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseTwo"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ carTypeId }) => (carTypeId.toString().includes(e.target.value)))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {carTypesData.length > 0 ?
                                                        carTypesData.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.id}>{item.carType}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseThree"
                                        >
                                            Select Fuel Type
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseThree"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ carFuelType }) => (carFuelType.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    <option>Petrol</option>
                                                    <option>Diesel</option>
                                                    <option>Electric</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFour"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFour"
                                        >
                                            Auto Transmission
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseFour"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ autoTransmission }) => (autoTransmission.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFive"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFive"
                                        >
                                            GCC Specs
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseFive"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ gccSpecs }) => (gccSpecs.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseSix"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseSix"
                                        >
                                            No. of Seats
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseSix"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ carSeats }) => (carSeats.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseSeven"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseSeven"
                                        >
                                            No. of Doors
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseSeven"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ carDoors }) => (carDoors.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseEight"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseEight"
                                        >
                                            Luggage
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseEight"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ carLuggage }) => (carLuggage.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseNine"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseNine"
                                        >
                                            Insurance Type
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseNine"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ insuranceType }) => (insuranceType.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>Choose...</option>
                                                    <option>Basic</option>
                                                    <option>Comprehensive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTen"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTen"
                                        >
                                            Select Car Color
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseTen"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(carData.filter(({ carExteriorColor }) => (carExteriorColor.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {carData.length > 0 ?
                                                        carData.map((item, index) => {
                                                            return (
                                                                <option key={index}>{item.carExteriorColor}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            ''
                        }
                    </div>
                </div>
                <div onClick={() => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar') }} className='filter-sidebar-close-vertical-bar'></div>
            </div>

            <div className='home-section-four pt-0'>
                <div className="car-cards-container mt-0">
                    <CarCardSlider fetchBy='allCategory' />
                </div>
            </div >
        </>
    );
};

export default SectionOne;