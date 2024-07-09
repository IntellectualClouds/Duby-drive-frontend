import React, { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import { useLocation } from 'react-router-dom';

import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import App_Routes from './routes/routes';
import Footer from './components/footer/footer';
import TopBtn from './components/top-btn/top-btn';

import './styles/header.css';
import './styles/navbar.css';
import './styles/page-img-header.css';
import './styles/home.css';
import './styles/brands.css';
import './styles/cars.css';
import './styles/driver-service.css';
import './styles/yachts.css';
import './styles/desert-safari.css';
import './styles/quad-biking.css';
import './styles/about.css';
import './styles/rental-companies.css';
import './styles/packages.css';
import './styles/car-details.css';
import './styles/yacht-details.css';
import './styles/desert-safari-details.css';
import './styles/company-details.css';
import './styles/contact.css';
import './styles/add-your-own-vehicle.css';
import './styles/frequently-asked-questions.css';
import './styles/countries-driving-license.css';
import './styles/banner.css';
import './styles/error.css';
import './styles/site-working.css';
import './styles/footer.css';

const Main = () => {

    const {pathname} = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0);
    },[pathname]);

    return (
        <>
            <Header />
            <Navbar />
            <App_Routes />
            <Footer />
            <TopBtn />
        </>
    );
};

export default Main;