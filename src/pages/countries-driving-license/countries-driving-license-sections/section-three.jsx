import React from 'react';

import playStoreBtn from "../../../assets/download-btn/google-btn.png";
import appStoreBtn from "../../../assets/download-btn/apple-btn.png";

const SectionThree = () => {
    return (
        <>
            <div className="driving-license-section-three text-white">
                <div className='col-md-5 p-5'>
                    <h2 className='mt-5 mb-4'>Get the DubyDrive Car Rental App on your smartphone today!</h2>

                    <div className='ps-3 ms-3 app-download-details-container'>
                        <p>- Find offers with detailed info</p>
                        <p>- Direct Supplier booking process</p>
                        <p>- Available in 30+ cities</p>
                    </div>

                    <div className='d-flex flex-column ps-5 mt-4'>   
                        <img src={playStoreBtn} alt="play-store-btn" className='app-download-btn' />
                        <img src={appStoreBtn} alt="app-store-btn" className='app-download-btn' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionThree;