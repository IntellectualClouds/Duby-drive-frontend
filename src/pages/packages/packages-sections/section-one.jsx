import React, { useEffect, useState } from 'react';

import tickIcon from "../../../assets/icons/correct.png";
import crownIcon from "../../../assets/icons/crown.png";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SectionOne = () => {

    const navigate = useNavigate();

    const [packagesData, setPackagesData] = useState([]);
    const [packagesDetailsData, setPackagesDetailsData] = useState([]);

    const fetchingPackagesDataApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/packages/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setPackagesData(response.data.data);
            }
        } catch (error) {
            console.log('Something went wrong while fetching packages data api by status: ', error);
        }
    };

    const fetchingPackagesDetailsApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/packagesDetails/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setPackagesDetailsData(response.data.data);
            }
        } catch (error) {
            console.log('Something went wrong while fetching packages details api by status: ', error);
        }
    };

    useEffect(() => {
        fetchingPackagesDataApi();
        fetchingPackagesDetailsApi();
    }, []);

    return (
        <>
            <div className="package-page-section-one">
                <div className="package-card-container">

                    {packagesData.length > 0 ?
                        packagesData.map((item, index) => {
                            return (
                                <div key={index} className="package-card">
                                    <div className='package-card-header'>
                                        <h4 className="package-card-header-heading text-orange text-center">{item.packageName}</h4>
                                    </div>
                                    <div className='package-card-body-one'>
                                        {/* <h3 className='package-card-sell-heading'>{item.currencyType} {item.packageSellPrice}</h3> */}
                                        {/* <h3 className='package-card-offer-heading'>{item.currencyType} {item.packageOfferPrice}</h3> */}

                                        <div>
                                            <img src={`${process.env.React_App_Host_Url}/images/package-images/${item.logoUrl}`} alt='package-img' className='package-card-img' />
                                        </div>

                                        {/* <h3 className='package-card-duration-heading'>{item.packageDuration}</h3> */}
                                        <h3 className='package-card-info-heading text-orange'>{item.packageName} allows you to add only {item.carLimit} cars</h3>
                                    </div>
                                    <div className='package-card-body-two'>
                                        {
                                            packagesDetailsData.length > 0 ?
                                                packagesDetailsData.map((data, ind) => {
                                                    return (
                                                        <React.Fragment key={ind}>
                                                            {
                                                                item.id == data.packageId ?
                                                                    <div className='package-card-details'>
                                                                        <img src={tickIcon} className='package-card-tick-icon' alt="tick-icon" /><h3 className='package-card-details-heading'>{data.packageFeature}</h3>
                                                                    </div>
                                                                    :
                                                                    ''
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })
                                                :
                                                ''
                                        }
                                    </div>
                                    <div className='package-card-footer'>
                                        <a href='#' onClick={() => { navigate('/add_your_own_vehicle') }} className="btn package-card-footer-btn"><img src={crownIcon} alt="crown-icon" height={30} width={30} /> Choose this package</a>
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

export default SectionOne;