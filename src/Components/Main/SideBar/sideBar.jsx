import React from "react";
import '../../../index.css';

//! Importing Routing From React Router Dom...
import { useNavigate, Link } from "react-router-dom";

const Sidebar = () => {

    let navigation = useNavigate();

    return (
        <>
            {/* <!--APP-SIDEBAR--> */}
            <div className="sticky">
                <div className="app-sidebar__overlay" data-bs-toggle="sidebar"></div>
                <div className="app-sidebar customScrollBar">
                    <div className="side-header">
                        {/* <a className="header-brand1" href="index.html">
                            <img src="../assets/images/brand/logo.png" className="header-brand-img desktop-logo" alt="logo" />
                            <img src="../assets/images/brand/logo-1.png" className="header-brand-img toggle-logo" alt="logo" />
                            <img src="../assets/images/brand/logo-2.png" className="header-brand-img light-logo" alt="logo" />
                            <img src="../assets/images/brand/logo-3.png" className="header-brand-img light-logo1" alt="logo" />
                        </a> */}
                        <a className="header-brand1" href="/"
                            style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="../assets/images/brand/logo.png" style={{ height: 50 }}
                                className="header-brand-img desktop-logo" alt="logo" />
                            <img src="../assets/images/brand/logo-1.png" style={{ height: 50 }}
                                className="header-brand-img toggle-logo" alt="logo" />
                            <img src="../assets/images/brand/logo-2.png" style={{ height: 50 }}
                                className="header-brand-img light-logo" alt="logo" />
                            <img src="../assets/images/brand/logo-3.png" style={{ height: 50 }}
                                className="header-brand-img light-logo1" alt="logo" />
                            {/*  <p style="color: black;font-weight: 500;font-size: 20px;padding-left: 10px;margin-top: 20px;">Duby Drive</p>  */}
                        </a>
                        {/* <!-- LOGO --> */}
                    </div>
                    <div className="main-sidemenu">
                        <div className="slide-left disabled" id="slide-left"><svg xmlns="http://www.w3.org/2000/svg"
                            fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                        </svg>
                        </div>
                        <ul className="side-menu">
                            <li>
                                <h3>Menu</h3>
                            </li>
                            {/* Dashboard */}
                            <li className="slide">
                                <a className="side-menu__item has-link" data-bs-toggle="slide" onClick={() => { navigation('/') }}>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon"
                                        enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
                                        <path
                                            d="M19.9794922,7.9521484l-6-5.2666016c-1.1339111-0.9902344-2.8250732-0.9902344-3.9589844,0l-6,5.2666016C3.3717041,8.5219116,2.9998169,9.3435669,3,10.2069702V19c0.0018311,1.6561279,1.3438721,2.9981689,3,3h2.5h7c0.0001831,0,0.0003662,0,0.0006104,0H18c1.6561279-0.0018311,2.9981689-1.3438721,3-3v-8.7930298C21.0001831,9.3435669,20.6282959,8.5219116,19.9794922,7.9521484z M15,21H9v-6c0.0014038-1.1040039,0.8959961-1.9985962,2-2h2c1.1040039,0.0014038,1.9985962,0.8959961,2,2V21z M20,19c-0.0014038,1.1040039-0.8959961,1.9985962-2,2h-2v-6c-0.0018311-1.6561279-1.3438721-2.9981689-3-3h-2c-1.6561279,0.0018311-2.9981689,1.3438721-3,3v6H6c-1.1040039-0.0014038-1.9985962-0.8959961-2-2v-8.7930298C3.9997559,9.6313477,4.2478027,9.0836182,4.6806641,8.7041016l6-5.2666016C11.0455933,3.1174927,11.5146484,2.9414673,12,2.9423828c0.4853516-0.0009155,0.9544067,0.1751099,1.3193359,0.4951172l6,5.2665405C19.7521973,9.0835571,20.0002441,9.6313477,20,10.2069702V19z" />
                                    </svg> */}
                                    <img src={require('../../../assets/nav-icons/home.png')} alt="home" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <h3>Frontend Forms Data</h3>
                            </li>
                            <li className="slide" onClick={() => { navigation('/contactFormTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/contact.png')} alt="contact" height={20} width={20} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Contact</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/dealerDataTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/dealer.png')} alt="dealer" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Dealer Requests</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/driverServiceFormTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/driver.png')} alt="driver" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Driver Service</span>
                                </a>
                            </li>

                            <li className="slide" onClick={() => { navigation('/reportDetailsTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/report.png')} alt="report" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Report Details</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/tourBookingsTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/car.png')} alt="car" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Tour Bookings</span>
                                </a>
                            </li>
                            <li>
                                <h3>Setups and Settings</h3>
                            </li>
                            <li className="slide" onClick={() => { navigation('/carBrandTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/brands.png')} alt="brands" height={20} width={20} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Car Brands</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/carFeaturesTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/features.png')} alt="features" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Car Features</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/carTypeTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/car.png')} alt="car" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Car Types</span></a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/citiesTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/city.png')} alt="city" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Cities</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/areaTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/area.png')} alt="area" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>City Area</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/dealerTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/dealer.png')} alt="dealer" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Dealers</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/faqTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/faq.png')} alt="faq" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>FAQ'S</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/packagesTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/packages.png')} alt="package" height={17} width={17} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Packages</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/packageDetailsTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/packages.png')} alt="packages.png" height={17} width={17} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Packages Details</span>
                                </a>
                            </li>
                            <li>
                                <h3>Main Content</h3>
                            </li>
                            <li className="slide" onClick={() => { navigation('/carDetailsTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/car.png')} alt="car" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Car Details</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/quadBikeTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/bike.png')} alt="bike" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Quad Bike</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/safeDriversTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/driver.png')} alt="driver.png" height={17} width={17} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Safe Drivers</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/desertSafariTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/car.png')} alt="car.png" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Tour Packages</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/yachtTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/yacht.png')} alt="yacht.png" height={20} width={20} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Yacht</span>
                                </a>
                            </li>



                            <li>
                                <h3>Marketing</h3>
                            </li>
                            <li className="slide" onClick={() => { navigation('/bannerTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/banner.png')} alt="banner" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Banners</span>
                                </a>
                            </li>
                            <li className="slide">
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/banner.png')} alt="banner" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Meta Tags</span>
                                </a>
                            </li>
                            <li>
                                <h3>User Settings</h3>
                            </li>
                            <li className="slide" onClick={() => { navigation('/userTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/user.png')} alt="user" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Users</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/roleTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/user.png')} alt="user" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Roles</span>
                                </a>
                            </li>
                            <li className="slide" onClick={() => { navigation('/navigationTable') }}>
                                <a className="side-menu__item" data-bs-toggle="slide">
                                    <img src={require('../../../assets/nav-icons/user.png')} alt="user" height={18} width={18} className="me-2" />
                                    <span className="side-menu__label" style={{ color: 'gray' }}>Navigations</span>
                                </a>
                            </li>
                        </ul>
                        <div className="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                            width="24" height="24" viewBox="0 0 24 24">
                            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
                        </svg>
                        </div>
                    </div>
                </div>
            </div >
            {/* <!--/APP-SIDEBAR--> */}
        </>
    );
};

export default Sidebar;