import React from 'react';

import documentIcon from "../../../assets/icons/document.png";
import moneyIcon from "../../../assets/icons/money.png";
import carIcon from "../../../assets/icons/sports-car.png";

const SectionOne = () => {
    return (
        <>
            <div className="driver-service-section-four primary_background_color pt-4">
                <div className="driver-service-section-four-body">
                    <div className="driver-service-section-four-box">
                        <img className='mb-4' height={50} width={50} src={documentIcon} alt="document-icon" />
                        <h4 className='text-white text-center'>Exceptional Track Record</h4>
                        <p className="text-white text-center">We have successfully resolved 90% of customer issues</p>
                    </div>
                    <div className="driver-service-section-four-box">
                        <img className='mb-4' height={50} width={50} src={moneyIcon} alt="money-icon" />
                        <h4 className='text-white text-center'>Supplier-Handled Billing</h4>
                        <p className="text-white text-center">For car rentals, all payments are directly handled by the supplier</p>
                    </div>
                    <div className="driver-service-section-four-box">
                        <img className='mb-4' height={50} width={50} src={carIcon} alt="car-icon" />
                        <h4 className='text-white text-center'>Not a Direct Provider</h4>
                        <p className="text-white text-center">We are a car rental marketplace, not a car rental company</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionOne;