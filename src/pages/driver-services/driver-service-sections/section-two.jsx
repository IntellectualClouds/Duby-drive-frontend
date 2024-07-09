import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SectionTwo = () => {

    const props = useLocation();

    const [allData, setAllData] = useState([]);
    const [driverServiceData, setDriverServiceData] = useState(null);

    const fetchingDriverServiceApi = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `${process.env.React_App_Host_Url}/api/get/data/safeDrivers/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setAllData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching driver service api: ', error);
        }
    };

    const fetchingDriverServiceApiById = async (id) => {
        try {
            let response = await axios({
                method: 'POST',
                url: `${process.env.React_App_Host_Url}/api/get/data/safeDrivers/by/id`,
                data: { id }
            });
            console.log(response);
            if (response.status == 200) {
                setAllData("");
                setDriverServiceData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching driver service api by id: ', error);
        }
    };

    useEffect(() => {
        if (props.state) {
            const id = props.state;
            fetchingDriverServiceApiById(id);
        }
        else {
            fetchingDriverServiceApi();
        }
    }, [props]);

    return (
        <>
            <div className="driver-service-section-two">
                <h1 className='mb-4 text-gray text-center'>Our Prices For Driver Services in Dubai, UAE</h1>

                <div className="driver-service-table-container d-flex flex-column align-items-center">
                    {allData.length > 0 ?
                        allData.map((item, index) => {
                            return (
                                <div key={index} className="col-md-9 driver-service-table row background-whitesmoke">
                                    <div className="col-md-6 p-0 driver-service-table-column-one">
                                        <div className="driver-service-table-header-one primary_background_color">
                                            <h4 className="text-white mb-0 text-center">{item.servicePeriod} {item.serviceType} ({item.carWithDriver})</h4>
                                        </div>
                                        <div className="driver-service-table-body driver-service-table-body-one">
                                            <p className="para" dangerouslySetInnerHTML={{__html:item.driverDescription}}></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 p-0 driver-service-table-column-two">
                                        <div className="driver-service-table-header-two primary_background_color">
                                            <h4 className="text-white mb-0 text-center">Price: {item.servicePrice} AED</h4>
                                        </div>
                                        <div className="driver-service-table-body">
                                            <h3 className="driver-service-table-time-text primary_text_color text-center mt-4 mb-0">Time: {item.startTime} - {item.endTime}</h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        :
                        driverServiceData == null ?
                            ''
                            :
                            <div className="col-md-9 driver-service-table row background-whitesmoke">
                                <div className="col-md-6 p-0 driver-service-table-column-one">
                                    <div className="driver-service-table-header-one primary_background_color">
                                        <h4 className="text-white mb-0 text-center">{driverServiceData.servicePeriod} {driverServiceData.serviceType} ({driverServiceData.carWithDriver})</h4>
                                    </div>
                                    <div className="driver-service-table-body driver-service-table-body-one">
                                        <p className="para" dangerouslySetInnerHTML={{__html:driverServiceData.driverDescription}}></p>
                                    </div>
                                </div>
                                <div className="col-md-6 p-0 driver-service-table-column-two">
                                    <div className="driver-service-table-header-two primary_background_color">
                                        <h4 className="text-white mb-0 text-center">Price: {driverServiceData.servicePrice} AED</h4>
                                    </div>
                                    <div className="driver-service-table-body">
                                        <h3 className="driver-service-table-time-text primary_text_color text-center mt-4 mb-0">Time: {driverServiceData.startTime} - {driverServiceData.endTime}</h3>
                                    </div>
                                </div>
                            </div>
                    }
                </div>

            </div>
        </>
    );
};

export default SectionTwo;