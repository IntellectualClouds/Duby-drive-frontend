import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';

const SectionOne = () => {

    const [driverServiceData, setDriverServiceData] = useState([]);

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const [serviceType, setServiceType] = useState(Number);

    const [captchaValue, setCaptchaValue] = useState("");
    const captchaRef = useRef();

    const [btnDisable, setBtnDisable] = useState(false);

    const fetchingDriverServiceApi = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `${process.env.React_App_Host_Url}/api/get/data/safeDrivers/by/status`,
            });
            // console.log(response);
            if (response.status == 200) {
                setDriverServiceData(response.data.data);
                setServiceType(response.data.data[0].id);
            }
        } catch (error) {
            console.log('Failed while fetching driver service api: ', error);
        }
    };

    const postData = async (customerName, customerEmail, customerPhoneNumber, serviceType, captchaValue) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/post/data/driverService`,
                data: { customerName, customerEmail, customerPhoneNumber, serviceType, captchaValue }
            });
            // console.log(response);
            if (response.status == 200) {
                toast.success('Submit successfully');
                setCustomerName("");
                setCustomerEmail("");
                setCustomerPhoneNumber("");
                setServiceType(Number);
                setCaptchaValue("");
                captchaRef.current.reset();
                setBtnDisable(false);
            }
        } catch (error) {
            // console.log('Failed while calling driver service api: ', error);
            toast.error('Something went wrong please try again later');
            setBtnDisable(false);
        }
    };

    const submitData = () => {
        if (customerName.trim() == "") {
            toast.info("Please enter your correct name");
        }
        else if (customerEmail.trim() == "") {
            toast.info("Please enter your correct email");
        }
        else if (customerPhoneNumber.trim() == "") {
            toast.info("Please enter your correct phone number");
        }
        else if (!serviceType) {
            toast.info("Please select service type");
        }
        else if (captchaValue == "") {
            toast.info("Please fill the captcha");
        }
        else {
            setBtnDisable(true);
            postData(customerName.trim(), customerEmail.trim(), customerPhoneNumber.trim(), serviceType, captchaValue);
        }
    };

    useEffect(() => {
        fetchingDriverServiceApi();
    }, []);

    return (
        <>
            <ToastContainer theme="colored" />
            <div className="driver-service-section-one">
                <h2 className='mb-4 primary_text_color'>Book a professional driver for your own car in Dubai</h2>
                <div className="row">
                    <div className="form-container col-md-12">
                        <div className="row g-3">
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Your Name'
                                    value={customerName}
                                    onChange={(e) => { setCustomerName(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Your Email'
                                    value={customerEmail}
                                    onChange={(e) => { setCustomerEmail(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Your Phone Number'
                                    value={customerPhoneNumber}
                                    onChange={(e) => { setCustomerPhoneNumber(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-3">
                                <select className="form-select background-whitesmoke p-2" value={serviceType} onChange={(e) => { setServiceType(e.target.value) }}>
                                    <option disabled>
                                        Choose...
                                    </option>
                                    {driverServiceData.length > 0 ?
                                        driverServiceData.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>{item.servicePeriod} {item.serviceType} ({item.carWithDriver})</option>
                                            );
                                        })
                                        :
                                        ''
                                    }
                                </select>
                            </div>
                            <div className="col-md-5">
                                <ReCAPTCHA sitekey={process.env.React_App_Recaptcha_Key} onChange={(e) => { setCaptchaValue(e) }} ref={captchaRef} />
                            </div>
                            <div className="col-12">
                                <button onClick={submitData} disabled={btnDisable} className="btn primary_background_color text-white">
                                    Book Driver
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionOne;