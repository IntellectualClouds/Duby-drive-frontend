import React, { useState, useEffect } from 'react';
import axios from 'axios';

import quickLinksJSONData from "../../json/quick-links/quick-links-names.json";

import { createSearchParams, useNavigate } from "react-router-dom";

import menuItemBg from "../../assets/backgrounds/menu-item-bg.webp";
import logo from '../../assets/logo/duby-drive.png';

import citiesIcon from "../../assets/icons/cities.png";
import brandIcon from "../../assets/icons/brand.png";
import carIcon from "../../assets/icons/sports-car.png";
import yachtIcon from "../../assets/icons/boat.png";
import driverIcon from "../../assets/icons/driver.png";
import camelIcon from "../../assets/icons/camel.png";
import bikeIcon from "../../assets/icons/bike.png";
import aboutIcon from "../../assets/icons/about.png";
import contactIcon from "../../assets/icons/contact-us.png";
import quickLinksIcon from "../../assets/icons/quick-links.png";

import hamBurger from "../../assets/icons/hamburger.png";

import navLocationsIcon from "../../assets/icons/nav-locations.png";
import navBrandIcon from "../../assets/icons/nav-brands.png";
import navCarIcon from "../../assets/icons/nav-cars.png";
import navYachtIcon from "../../assets/icons/nav-yacht.png";
import navCamelIcon from "../../assets/icons/nav-camel.png";
import navBikingIcon from "../../assets/icons/nav-biking.png";
import navLinksIcon from "../../assets/icons/nav-links.png";

import earthIcon from "../../assets/icons/planet-earth.png";
import companyIcon from "../../assets/icons/company.png";

import fbIcon from "../../assets/icons/facebook.png";
import instaIcon from "../../assets/icons/instagram.png";
import tiktokIcon from "../../assets/icons/tiktok.png";
import youtubeIcon from "../../assets/icons/youtube.png";

const Navbar = () => {

    const navigate = useNavigate();

    const [quickLinksData, setQuickLinksData] = useState(quickLinksJSONData);

    const [megaMenu, setMegaMenu] = useState(false);
    const [rentACarMenu, setRentACarMenu] = useState(false);

    const [brandsData, setBrandsData] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [carTypeData, setCarTypeData] = useState([]);
    const [driverServiceData, setDriverServiceData] = useState([]);

    const [lengthData, setLengthData] = useState([]);

    const fetchingBrandsApi = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `${process.env.React_App_Host_Url}/api/get/data/carBrands/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setBrandsData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching brands api: ', error);
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

    const fetchingCarTypeDataApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/carTypes/by/category`
            });
            // console.log(response);
            if (response.status == 200) {
                setCarTypeData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car type data api: ', error);
        }
    };

    const fetchingCarsCountApiByBrand = async () => {
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
            console.log('Failed while fetching car brands length api: ', error);
        }
    };

    const fetchingDriverServiceApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/safeDrivers/by/status`
            });
            // console.log('drivers data', response);
            if (response.status == 200) {
                setDriverServiceData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching driver service data api: ', error);
        }
    };

    useEffect(() => {
        fetchingBrandsApi();
        fetchingCitiesApi();
        fetchingCarTypeDataApi();
        fetchingCarsCountApiByBrand();
        fetchingDriverServiceApi();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-mobile">
                <div className="container-fluid container-fluid-navbar">
                    <div className="collapse navbar-collapse ul-parent-container" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 ul-list-container">
                            <li className="nav-item links" onMouseOver={() => { setRentACarMenu(true) }} onMouseLeave={() => { setRentACarMenu(false) }} onClick={() => { navigate('/') }}>
                                <a className="navbar_links links_hover nav-link" aria-current="page">
                                    <img src={citiesIcon} alt="cities-icon" height={20} width={20} className='nav-icons' />
                                    Locations
                                </a>
                            </li>
                            <li className="nav-item links" onMouseOver={() => { setMegaMenu(true) }} onMouseLeave={() => { setMegaMenu(false) }} onClick={() => { navigate('car_brands') }}>
                                <a className="navbar_links links_hover nav-link">
                                    <img src={brandIcon} alt="brand-icon" height={23} width={23} className='nav-icons' />
                                    Car Brands
                                </a>
                            </li>
                            <li
                                onMouseOver={() => { document.querySelector('.dropdown-menu').classList.add('show') }}
                                onMouseLeave={() => { document.querySelector('.dropdown-menu').classList.remove('show') }}
                                className="nav-item links dropdown">
                                <a
                                    className="navbar_links links_hover nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img src={carIcon} alt="car-icon" height={20} width={20} className='nav-icons' />
                                    Rental Cars
                                </a>
                                <ul className="dropdown-menu">
                                    <li onClick={() => { navigate('cars') }}>
                                        <a className="dropdown-item">
                                            Rental Cars
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li onClick={() => { navigate('packages') }}>
                                        <a className="dropdown-item">
                                            Add your own vehicle
                                        </a>
                                    </li>
                                    {/* Driver Service */}
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li onClick={() => { navigate('driver_service') }}>
                                        <a className="dropdown-item">
                                            Safe Drivers
                                        </a>
                                    </li>
                                    {driverServiceData.length > 0 ?
                                        <>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            {
                                                driverServiceData.map((item, index) => {
                                                    return (
                                                        <li className='m-1' key={index} onClick={() => { navigate({ pathname: 'driver_service', search: `?${createSearchParams({ q: `${item.servicePeriod.toLowerCase()} ${item.serviceType.toLowerCase()}` })}` }, { state: item.id }) }}>
                                                            <a className="dropdown-item">
                                                                {item.servicePeriod} {item.serviceType}
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        ''
                                    }
                                </ul>
                            </li>
                            <li className="nav-item links" onClick={() => { navigate('yachts') }}>
                                <a className="navbar_links links_hover nav-link">
                                    <img src={yachtIcon} alt="yacht-icon" height={20} width={20} className='nav-icons' />
                                    Yacht Rental
                                </a>
                            </li>
                           
                            <li className="nav-item links" onClick={() => { navigate('desert_safari') }}>
                                <a className="navbar_links links_hover nav-link">
                                    {/* <img src={camelIcon} alt="camel-icon" height={20} width={20} className='nav-icons' /> */}
                                    <img src={carIcon} alt="camel-icon" height={20} width={20} className='nav-icons' />
                                    Tour Packages
                                </a>
                            </li>
                            <li className="nav-item links" onClick={() => { navigate('quad_biking') }}>
                                <a className="navbar_links links_hover nav-link">
                                    <img src={bikeIcon} alt="bike-icon" height={17} width={17} className='nav-icons' />
                                    Quad Bike
                                </a>
                            </li>
                            <li className="nav-item links dropdown"
                                onMouseOver={() => { document.querySelector('#quick-links-dropdown').classList.add('show') }}
                                onMouseLeave={() => { document.querySelector('#quick-links-dropdown').classList.remove('show') }}
                            >
                                <a
                                    className="navbar_links links_hover nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img src={quickLinksIcon} alt="driver-icon" height={17} width={17} className='nav-icons' />
                                    Quick Links
                                </a>

                                <ul id='quick-links-dropdown' className="dropdown-menu quick-links-dropdown">
                                    {
                                        quickLinksData.length > 0 ?
                                            quickLinksData.map((item, index) => {
                                                return (
                                                    <li key={index} onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ quick_link: item.toLowerCase() })}` }) }}>
                                                        <a className="dropdown-item">
                                                            {item}
                                                        </a>
                                                    </li>
                                                );
                                            })
                                            :
                                            ''
                                    }
                                    {
                                        carTypeData.length > 0 ?
                                            carTypeData.slice(0,6).map((item, index) => {
                                                return (
                                                    <li key={index} onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ type: item.carType.toLowerCase() })}` }, { state: { filterBy: 'carType', value: item.id } }) }}>
                                                        <a className="dropdown-item">
                                                            {item.carType.toUpperCase()} CARS RENTALS IN DUBAI
                                                        </a>
                                                    </li>
                                                );
                                            })
                                            :
                                            ''
                                    }
                                    <li onClick={() => { navigate('/quad_biking') }}>
                                        <a className="dropdown-item">
                                            BUGGY RENTALS IN DUBAI
                                        </a>
                                    </li>
                                    <li onClick={() => { navigate('/desert_safari') }}>
                                        <a className="dropdown-item">
                                            TOUR PACKAGES IN DUBAI
                                        </a>
                                    </li>
                                    {
                                        brandsData.length > 0 ?
                                            brandsData.slice(0,6).map((item, index) => {
                                                return (
                                                    <li key={index} onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ brand: item.brandName })}` }, { state: { filterBy: 'brand', value: item.id } }) }}>
                                                        <a className="dropdown-item">
                                                            {item.brandName.toUpperCase()} CAR RENTALS IN DUBAI
                                                        </a>
                                                    </li>
                                                );
                                            })
                                            :
                                            ''
                                    }
                                    <li onClick={() => { navigate('/yachts') }}>
                                        <a className="dropdown-item">
                                            YACHTS RENTALS IN DUBAI
                                        </a>
                                    </li>
                                    <li onClick={() => { navigate('/driver_service') }}>
                                        <a className="dropdown-item">
                                            DRIVER SERVICES IN DUBAI
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {/* <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button> */}
                    <div className='mobile-navbar-header-container'>
                        <img src={hamBurger} onClick={() => { document.querySelector('.mobile-navbar-modal').classList.add('active-nav-modal') }} alt="hamburger" className='mt-0 mb-0 ms-3 me-2' height={25} width={25} />
                        <img onClick={() => { navigate('/') }} src={logo} alt="duby-drive-logo" height={33} width={33} />
                        <h5 onClick={() => { navigate('/') }} className='mb-0 text-white ms-2'>Duby Drive</h5>
                    </div>
                </div>

                <div className="mega-menu-container" style={{ display: megaMenu == true ? 'flex' : 'none' }}>
                    <div className="mega-menu col-md-10" onMouseOver={() => { setMegaMenu(true) }} onMouseLeave={() => { setMegaMenu(false) }}>
                        {
                            brandsData.length > 0 ? brandsData.map((item, index) => {
                                return (
                                    // <div key={index} className="col-md-2 menu-cards" onClick={() => { navigate({ pathname: '/cars_filter', search: `?${createSearchParams({ brand: item.brandName.toLowerCase() })}` }, { state: { filterBy: 'brand', value: item.id } }) }}>
                                    <div key={index} className="col-md-2 menu-cards" onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ brand: item.brandName.toLowerCase() })}` }, { state: { filterBy: 'brand', value: item.id } }) }}>
                                        <div className='me-15'>
                                            <img src={`${process.env.React_App_Host_Url}/images/car-brands-logo/${item.logo}`} className='mega-menu-brand-card-img' alt={item.logo} />
                                        </div>
                                        <div className='d-flex flex-column justify-content-start ms-1'>
                                            <h5 className='mb-0'>{item.brandName}</h5>
                                            <h6 className='mb-0'>{lengthData.map((itm, ind) => {
                                                return (
                                                    <span key={ind}>{item.id == itm.carBrandId ? itm.total_length + ' Cars' : ''}</span>
                                                );
                                            })}</h6>
                                        </div>
                                    </div>
                                );
                            })
                                :
                                ''
                        }
                    </div>
                </div>

                <div className="mega-menu-container" style={{ display: rentACarMenu == true ? 'flex' : 'none',position:'absolute',left:'18%' }}>
                    <div className="mega-menu ms-5 p-0" onMouseOver={() => { setRentACarMenu(true) }} onMouseLeave={() => { setRentACarMenu(false) }}>
                        <div className="d-flex">
                            <img src={menuItemBg} className='menu-item-bg-img' alt="menu-item-bg" />
                            <ul className='rent-a-car-menu-list-container'>
                                {citiesData.length > 0 ?
                                    citiesData.slice(0, 8).map((item, index) => {
                                        return (
                                            // <li key={index} onClick={() => { navigate({ pathname: '/cars_filter', search: `?${createSearchParams({ city: item.cityName.toLowerCase() })}` }, { state: { filterBy: 'city', value: item.id } }) }}>
                                            <li key={index} onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ city: item.cityName.toLowerCase() })}` }, { state: { filterBy: 'city', value: item.id } }) }}>
                                                <a>
                                                    {item.cityName}
                                                </a>
                                            </li>
                                        );
                                    })
                                    :
                                    ''
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mobile-navbar-modal background-transparent">
                    <div className="mobile-navbar-container">
                        <div className="mobile-nav-header">
                            <img onClick={() => { navigate('/') }} src={logo} alt="logo" className='mobile-nav-header-logo' />
                            <h4 onClick={() => { navigate('/') }}>DubyDrive</h4>
                            <span className='mobile-nav-close-icon' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal') }}>&times;</span>
                        </div>
                        <div className="mobile-nav-body">

                            <button className="border-0 p-2 rounded primary_background_color text-white d-flex align-items-center ms-2 mb-2" onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('/add_your_own_vehicle') }}>
                                <img src={carIcon} alt="car-icon" height={18} width={18} className='me-1' />
                                <span>Register your vehicle</span>
                            </button>

                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed p-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseZero"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseZero"
                                        >
                                            <img src={navLocationsIcon} alt="cities-icon" height={20} width={20} className='nav-icons' />
                                            Locations
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseZero"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                {citiesData.length > 0 ?
                                                    citiesData.slice(0, 8).map((item, index) => {
                                                        return (
                                                            <p className='mobile-nav-links' key={index} onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate({ pathname: '/cars', search: `?${createSearchParams({ city: item.cityName.toLowerCase() })}` }, { state: { filterBy: 'city', value: item.id } }) }}>
                                                                <a>
                                                                    {item.cityName}
                                                                </a>
                                                            </p>
                                                        );
                                                    })
                                                    :
                                                    ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed p-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseOne"
                                        >
                                            <img src={navBrandIcon} alt="brand-icon" height={23} width={23} className='nav-icons' />
                                            Car Brands
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseOne"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div className='mt-3'>
                                                {
                                                    brandsData.length > 0 ? brandsData.map((item, index) => {
                                                        return (
                                                            <div key={index} className="col-md-2 menu-cards" onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate({ pathname: '/cars', search: `?${createSearchParams({ brand: item.brandName.toLowerCase() })}` }, { state: { filterBy: 'brand', value: item.id } }) }}>
                                                                <div className='me-15'>
                                                                    <img src={`${process.env.React_App_Host_Url}/images/car-brands-logo/${item.logo}`} className='mega-menu-brand-card-img me-2' alt={item.logo} />
                                                                </div>
                                                                <div className='d-flex flex-column justify-content-start ms-1'>
                                                                    <h5 className='mb-0'>{item.brandName}</h5>
                                                                    <h6 className='mb-0'>{lengthData.map((itm, ind) => {
                                                                        return (
                                                                            <span key={ind}>{item.id == itm.carBrandId ? itm.total_length + ' Cars' : ''}</span>
                                                                        );
                                                                    })}</h6>
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
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed p-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTwo"
                                        >
                                            <img src={navCarIcon} alt="car-icon" height={20} width={20} className='nav-icons' />
                                            Rental Cars
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseTwo"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <p className='mobile-nav-links' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('cars') }}>
                                                    <a className="dropdown-item">
                                                        Rental Cars
                                                    </a>
                                                </p>
                                                <p className='mobile-nav-links' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('packages') }}>
                                                    <a className="dropdown-item">
                                                        Add your own vehicle
                                                    </a>
                                                </p>
                                                <p className='mobile-nav-links' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('driver_service') }}>
                                                    <a className="dropdown-item">
                                                        Safe Drivers
                                                    </a>
                                                </p>
                                                {driverServiceData.length > 0 ?
                                                    <>
                                                        {
                                                            driverServiceData.map((item, index) => {
                                                                return (
                                                                    <p className='mobile-nav-links' key={index} onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate({ pathname: 'driver_service', search: `?${createSearchParams({ q: `${item.servicePeriod.toLowerCase()} ${item.serviceType.toLowerCase()}` })}` }, { state: item.id }) }}>
                                                                        <a className="dropdown-item">
                                                                            {item.servicePeriod} {item.serviceType}
                                                                        </a>
                                                                    </p>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                    :
                                                    ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed p-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseThree"
                                        >
                                            <img src={navYachtIcon} alt="yacht-icon" height={20} width={20} className='nav-icons' />
                                            Yacht Rentals
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseThree"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <p className='mobile-nav-links' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('/yachts') }}>
                                                    <a className="dropdown-item">
                                                        Rental a Yacht
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed p-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFour"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFour"
                                        >
                                            <img src={navCarIcon} alt="camel-icon" height={20} width={20} className='nav-icons' />
                                            Tour Packages
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseFour"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <p className='mobile-nav-links' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('/desert_safari') }}>
                                                    <a className="dropdown-item">
                                                        Tour Packages
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed p-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFive"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFive"
                                        >
                                            <img src={navBikingIcon} alt="bike-icon" height={17} width={17} className='nav-icons' />
                                            Quad Biking
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseFive"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <p className='mobile-nav-links' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('/quad_biking') }}>
                                                    <a className="dropdown-item">
                                                        Quad Biking
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed p-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseSix"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseSix"
                                        >
                                            <img src={navLinksIcon} alt="driver-icon" height={17} width={17} className='nav-icons' />
                                            Quick Links
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseSix"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                {
                                                    quickLinksData.length > 0 ?
                                                        quickLinksData.map((item, index) => {
                                                            return (
                                                                <p className='mobile-nav-links' key={index} onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate({ pathname: '/cars', search: `?${createSearchParams({ quick_link: item.toLowerCase() })}` }) }}>
                                                                    <a className="dropdown-item">
                                                                        {item}
                                                                    </a>
                                                                </p>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                }
                                                {
                                                    carTypeData.length > 0 ?
                                                        carTypeData.map((item, index) => {
                                                            return (
                                                                <p className='mobile-nav-links' key={index} onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate({ pathname: '/cars', search: `?${createSearchParams({ type: item.carType.toLowerCase() })}` }, { state: { filterBy: 'carType', value: item.id } }) }}>
                                                                    <a className="dropdown-item">
                                                                        {item.carType.toUpperCase()} CARS RENTALS IN DUBAI
                                                                    </a>
                                                                </p>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                }
                                                <p className='mobile-nav-links' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('/quad_biking') }}>
                                                    <a className="dropdown-item">
                                                        BUGGY RENTALS IN DUBAI
                                                    </a>
                                                </p>
                                                {
                                                    brandsData.length > 0 ?
                                                        brandsData.map((item, index) => {
                                                            return (
                                                                <p className='mobile-nav-links' key={index} onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate({ pathname: '/cars', search: `?${createSearchParams({ brand: item.brandName })}` }, { state: { filterBy: 'brand', value: item.id } }) }}>
                                                                    <a className="dropdown-item">
                                                                        {item.brandName.toUpperCase()} CAR RENTALS IN DUBAI
                                                                    </a>
                                                                </p>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                }
                                                <p className='mobile-nav-links' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('/yachts') }}>
                                                    <a className="dropdown-item">
                                                        YACHTS RENTALS IN DUBAI
                                                    </a>
                                                </p>
                                                <p className='mobile-nav-links' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('/driver_service') }}>
                                                    <a className="dropdown-item">
                                                        DRIVER SERVICES IN DUBAI
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex flex-column justify-content-center align-items-center mt-2 mb-5'>
                                <div className='mb-2 d-flex'>
                                    <a onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); }} className='d-flex header-links links_hover' href="#">
                                        <img className='header-links-icons' src={earthIcon} height={20} width={20} alt="earth-icon" />
                                        <span className="h5 mb-0">UAE</span>
                                    </a>
                                    <a className='d-flex header-links links_hover' onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal'); navigate('rental_companies') }}>
                                        <img className='header-links-icons' src={companyIcon} height={20} width={20} alt="company-icon" />
                                        <span className="h5 mb-0">Rental Companies</span>
                                    </a>
                                </div>
                                <h5 className="text-center">Follow Us:</h5>
                                <div className="d-flex align-items-center justify-content-center me-3 ms-3">
                                    <img src={fbIcon} alt="social-media-icon" className='m-2 background-whitesmoke p-2 rounded' height={45} width={45} />
                                    <img src={instaIcon} alt="social-media-icon" className='m-2 background-whitesmoke p-2 rounded' height={45} width={45} />
                                    <img src={tiktokIcon} alt="social-media-icon" className='m-2 background-whitesmoke p-2 rounded' height={45} width={45} />
                                    <img src={youtubeIcon} alt="social-media-icon" className='m-2 background-whitesmoke p-2 rounded' height={45} width={45} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => { document.querySelector('.mobile-navbar-modal').classList.remove('active-nav-modal') }} className='nav-close-vertical-bar'></div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
