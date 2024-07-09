import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';

const SectionTwo = () => {

    const props = useLocation();

    const [customerName, setCustomerName] = useState("");
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const [customerEmailAddress, setCustomerEmailAddress] = useState("");

    const [vehicleName, setVehicleName] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [reportReason, setReportReason] = useState("");

    const [dealerName, setDealerName] = useState("");
    const [dealerEmailAddress, setDealerEmailAddress] = useState("");
    const [dealerContactNumber, setDealerContactNumber] = useState("");

    const [customerMessage, setCustomerMessage] = useState("");

    const [captchaValue, setCaptchaValue] = useState("");
    const captchaRef = useRef();

    const [btnDisable, setBtnDisable] = useState(false);

    const callingReportApi = async (customerName, customerPhoneNumber, customerEmailAddress, vehicleName, vehicleNumber, reportReason, dealerName, dealerEmailAddress, dealerContactNumber, customerMessage, captchaValue) => {
        try {
            let response = await axios({
                method: 'POST',
                url: `${process.env.React_App_Host_Url}/api/post/report/details`,
                data: { customerName, customerPhoneNumber, customerEmailAddress, vehicleName, vehicleNumber, reportReason, dealerName, dealerEmailAddress, dealerContactNumber, customerMessage, captchaValue }
            });
            console.log(response);
            if (response.status == 200) {
                toast.success('Report send successfully');
                setTimeout(() => {
                    toast.info('We will contact you soon');
                }, 2000);
                setCustomerName("");
                setCustomerPhoneNumber("");
                setCustomerEmailAddress("");
                setVehicleName("");
                setVehicleNumber("");
                setReportReason("");
                setDealerName("");
                setDealerEmailAddress("");
                setDealerContactNumber("");
                setCustomerMessage("");
                setCaptchaValue("");
                captchaRef.current.reset();
                setBtnDisable(false);
            }
        } catch (error) {
            console.log('Failed while sending report: ', error);
            toast.error('Something went wrong please try again later');
            setBtnDisable(false);
        }
    };

    const sendReport = () => {
        if (customerName.trim() == "") {
            toast.info("Please enter your correct name");
        }
        else if (customerPhoneNumber.trim() == "") {
            toast.info("Please enter your correct phone number");
        }
        else if (customerEmailAddress.trim() == "") {
            toast.info("Please enter your correct email");
        }
        else if (vehicleName.trim() == "") {
            toast.info("Please enter correct vehicle name");
        }
        else if (vehicleNumber.trim() == "") {
            toast.info("Please enter correct vehicle number");
        }
        else if (reportReason.trim() == "") {
            toast.info("Please select valid report reason");
        }
        else if (dealerName.trim() == "") {
            toast.info("Please enter dealer company name");
        }
        else if (dealerEmailAddress.trim() == "") {
            toast.info("Please enter dealer email");
        }
        else if (dealerContactNumber.trim() == "") {
            toast.info("Please enter dealer contact number");
        }
        else if (customerMessage.trim() == "") {
            toast.info("Please enter your message");
        }
        else if (captchaValue == "") {
            toast.info("Please fill the captcha");
        }
        else {
            setBtnDisable(true);
            callingReportApi(customerName.trim(), customerPhoneNumber.trim(), customerEmailAddress.trim(), vehicleName.trim(), vehicleNumber.trim(), reportReason.trim(), dealerName.trim(), dealerEmailAddress.trim(), dealerContactNumber.trim(), customerMessage.trim(), captchaValue);
        }
    };

    const fetchingVenderData = async (id) => {
        try {
            let response = await axios({
                method: 'POST',
                url: `${process.env.React_App_Host_Url}/api/get/data/venders/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                setDealerName(response.data.data.companyName);
                setDealerEmailAddress(response.data.data.emailAddress);
                setDealerContactNumber(response.data.data.contactNumber);
            }
        } catch (error) {
            console.log('Failed while fetching car details data by id: ', error);
        }
    };

    const fetchingCarData = async (id) => {
        try {
            let response = await axios({
                method: 'POST',
                url: `${process.env.React_App_Host_Url}/api/get/data/carDetails/by/id`,
                data: { id }
            });
            // console.log(response);
            if (response.status == 200) {
                fetchingVenderData(response.data.data.dealerCompanyId);

                setVehicleName(response.data.data.carModelNo);
                setVehicleNumber(response.data.data.carLicense);
            }
        } catch (error) {
            console.log('Failed while fetching car details data by id: ', error);
        }
    };

    useEffect(() => {
        if (props.state) {
            fetchingCarData(props.state);
        }
        setReportReason('Customer Support');
    }, []);

    return (
        <>
            <ToastContainer theme="colored" />
            <div className="report-form-section-two p-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 form-container">
                        <h3 className='mb-4 primary_text_color'>Customer Support</h3>
                        <div className="row g-3">
                            <h5 className='mb-0'>Customer Details</h5>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Your Name'
                                    value={customerName}
                                    onChange={(e) => { setCustomerName(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Your Phone'
                                    value={customerPhoneNumber}
                                    onChange={(e) => { setCustomerPhoneNumber(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Your Email'
                                    value={customerEmailAddress}
                                    onChange={(e) => { setCustomerEmailAddress(e.target.value) }}
                                />
                            </div>

                            <h5 className="mb-0 mt-4">Vehicle Details</h5>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Name of Vehicle'
                                    value={vehicleName}
                                    onChange={(e) => { setVehicleName(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Vehicle License Number'
                                    value={vehicleNumber}
                                    onChange={(e) => { setVehicleNumber(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-4">
                                <select className="form-select background-whitesmoke p-2" value={reportReason} onChange={(e) => { setReportReason(e.target.value) }}>
                                    <option disabled>
                                        Choose...
                                    </option>
                                    <option>Customer Support</option>
                                    <option>Deposit Refund</option>
                                    <option>Report Fake Listing</option>
                                    <option>Offered High Price</option>
                                </select>
                            </div>

                            <h5 className="mb-0 mt-4">Supplier / Dealer Details</h5>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Dealer or Company Name'
                                    value={dealerName}
                                    onChange={(e) => { setDealerName(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Email Address'
                                    value={dealerEmailAddress}
                                    onChange={(e) => { setDealerEmailAddress(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Contact Number'
                                    value={dealerContactNumber}
                                    onChange={(e) => { setDealerContactNumber(e.target.value) }}
                                />
                            </div>

                            <div className="col-md-12 mt-4">
                                <textarea value={customerMessage} onChange={(e) => { setCustomerMessage(e.target.value) }} placeholder='Please describe us in details' className='form-control background-whitesmoke' rows="7"></textarea>
                            </div>
                            <div className="col-md-5">
                                <ReCAPTCHA sitekey={process.env.React_App_Recaptcha_Key} onChange={(e) => { setCaptchaValue(e) }} ref={captchaRef} />
                            </div>
                            <div className="col-12">
                                <button disabled={btnDisable} onClick={sendReport} className="btn primary_background_color text-white">
                                    Send report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionTwo;