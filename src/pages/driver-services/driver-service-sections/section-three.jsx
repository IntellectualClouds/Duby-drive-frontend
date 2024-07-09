import React from 'react';

import masterCard from '../../../assets/cards/master-card.png';
import visaCard from '../../../assets/cards/visa-card.png';
import expressCard from '../../../assets/cards/express-card.png';

const SectionThree = () => {

    return (
        <>
            <div className="driver-service-section-three">

                <div className="driver-service-section-three-header">
                    <h2 className="primary_text_color text-center mb-4">Payment Modes</h2>
                </div>
                <div className="driver-service-section-three-body">
                    <div className="payment-card background-whitesmoke">
                        <img src={masterCard} alt="master-card" className='payment-card-img' />
                    </div>
                    <div className="payment-card background-whitesmoke">
                        <img src={visaCard} alt="visa-card" className='payment-card-img' />
                    </div>
                    <div className="payment-card background-whitesmoke">
                        <img src={expressCard} alt="express-card" className='payment-card-img' />
                    </div>
                </div>
                <div className="driver-service-section-three-footer">
                    <p className="text-center para mb-0">Secure online payment available for Mastercard, Visa and American Express cards.</p>
                    <p className="text-center para">Cash is always acceptable however a part payment would be required to be done online for advance bookings.</p>
                </div>

            </div>
        </>
    );
};

export default SectionThree;