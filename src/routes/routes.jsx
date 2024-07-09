import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home/home';
import Brands from '../pages/brands/brands';
import Cars from '../pages/cars/cars';
import DriverService from '../pages/driver-services/driver-service';
import Yachts from '../pages/yachts/yachts';
import DesertSafari from '../pages/desert-safari/desert-safari';
import QuadBiking from '../pages/quad-biking/quad-biking';
import About from "../pages/about/about";
import RentalCompanies from '../pages/rental-companies/rental-companies';
import Packages from '../pages/packages/packages';
import CarDetails from '../pages/car-details/car-details';
import YachtDetails from "../pages/yacht-details/yacht-details";
import DesertSafariDetails from '../pages/desert-safari-details/desert-safari-details';
import QuadBikingDetails from "../pages/quad-biking-details/quad-biking-details";
import CompanyDetails from '../pages/company-details/company-details';
import Contact from '../pages/contact/contact';
import AddYourOwnVehicle from '../pages/add-your-vehicle/add-your-vehicle';
import TermsAndConditions from '../pages/terms-and-conditions/terms-and-conditions';
import PrivacyPolicy from '../pages/privacy-policy/privacy-policy';
import TermsAndConditionsOfUse from '../pages/terms-and-conditions-of-use/terms-and-conditions-of-use';
import FrequentlyAskedQuestions from '../pages/frequently-asked-questions/frequently-asked-questions';
import ReportForm from '../pages/report-form/report-form';
import CountriesDrivingLicense from '../pages/countries-driving-license/countries-driving-license';
import ErrorPage from '../pages/error-page/error-page';
import SiteWorking from '../pages/site-working/site-working';

const App_Routes = () => {
    return (
        <>
            <Routes>
                {/* <Route path='/' element={<SiteWorking />} /> */}
                <Route path='/' element={<Home />} />
                <Route path='car_brands' element={<Brands />} />
                <Route path='cars' element={<Cars />} />
                <Route path='driver_service' element={<DriverService />} />
                <Route path='yachts' element={<Yachts />} />
                <Route path='desert_safari' element={<DesertSafari />} />
                <Route path='quad_biking' element={<QuadBiking />} />
                <Route path='about' element={<About />} />
                <Route path='rental_companies' element={<RentalCompanies />} />
                <Route path='packages' element={<Packages />} />
                <Route path='car_details' element={<CarDetails />} />
                <Route path='yacht_details' element={<YachtDetails />} />
                <Route path='desert_safari_details' element={<DesertSafariDetails />} />
                <Route path='quad_biking_details' element={<QuadBikingDetails />} />
                <Route path='company_details' element={<CompanyDetails />} />
                <Route path='contact' element={<Contact />} />
                <Route path='add_your_own_vehicle' element={<AddYourOwnVehicle />} />
                <Route path='terms_and_conditions' element={<TermsAndConditions />} />
                <Route path='privacy_policy' element={<PrivacyPolicy />} />
                <Route path='terms_and_conditions_of_use' element={<TermsAndConditionsOfUse />} />
                <Route path='frequently_asked_questions' element={<FrequentlyAskedQuestions />} />
                <Route path='report_form' element={<ReportForm />} />
                <Route path='countries_driving_license' element={<CountriesDrivingLicense />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default App_Routes;