import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';

import countriesNameData from "../../../../json/countries-name/countries-name.json";

const AddYourOwnVehicleForm = () => {

    const [countriesData, setCountriesData] = useState(countriesNameData);

    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [fleetSize, setFleetSize] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    const [captchaValue, setCaptchaValue] = useState("");
    const captchaRef = useRef();

    const [btnDisable, setBtnDisable] = useState(false);

    const postData = async (data) => {
        try {
            let response = await axios({
                method: 'POST',
                url: `${process.env.React_App_Host_Url}/api/post/data/dealer`,
                data: data
            });
            // console.log(response);
            if (response.status == 200) {
                toast.success('Form submitted successfully');
                setTimeout(() => {
                    toast.info('Please check your provided email inbox');
                }, 2000);
                setName("");
                setCompanyName("");
                setJobTitle('Owner / Founder');
                setFleetSize('5-10 cars');
                setPhoneNumber("");
                setEmailAddress("");
                setCountry('United Arab Emirates');
                setCity("Abu Dhabi");
                setCaptchaValue("");
                captchaRef.current.reset();
                setBtnDisable(false);
            }
        } catch (error) {
            console.log('Failed while posting data: ', error);
            setBtnDisable(false);
            toast.error('Something went wrong while submitting form');
        }
    };

    const submitForm = () => {
        if (name.trim() == "" || name.trim().length < 3) {
            toast.info('Please enter your correct name');
        }
        else if (companyName.trim() == "" || companyName.trim().length < 3) {
            toast.info('Please enter your correct company name');
        }
        else if (jobTitle.trim() == "" || jobTitle.trim().length < 3) {
            toast.info('Please select your job title');
        }
        else if (fleetSize.trim() == "" || fleetSize.trim().length < 2) {
            toast.info('Please select fleet size');
        }
        else if (phoneNumber.trim() == "" || phoneNumber.trim().length < 11) {
            toast.info('Please enter your correct phone number');
        }
        else if (emailAddress.trim() == "" || emailAddress.trim().length < 10) {
            toast.info('Please enter your correct email');
        }
        else if (country.trim() == "" || country.trim().length < 3) {
            toast.info('Select your country');
        }
        else if (city.trim() == "" || city.trim().length < 3) {
            toast.info('Select your city');
        }
        else if (captchaValue == "") {
            toast.info("Please fill the captcha");
        }
        else {
            setBtnDisable(true);
            let dataObj = {
                name: name.trim(),
                companyName: companyName.trim(),
                jobTitle: jobTitle.trim(),
                fleetSize: fleetSize.trim(),
                phoneNumber: phoneNumber.trim(),
                emailAddress: emailAddress.trim(),
                country: country.trim(),
                city: city.trim(),
                captchaValue: captchaValue
            };
            // console.log(dataObj);
            postData(dataObj);
        };
    };

    useEffect(() => {
        setJobTitle('Owner / Founder');
        setFleetSize('5-10 cars');
        setCountry('United Arab Emirates');
        setCity('Abu Dhabi');
    }, []);

    return (
        <>
            <ToastContainer theme="colored" />
            <div className="add-your-own-vehicle-form-container">
                <h4 className='mb-4 mt-3'>Register your Car Rental business</h4>
                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control p-2 background-whitesmoke"
                            placeholder='Your Name'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control p-2 background-whitesmoke"
                            placeholder='Company Name'
                            value={companyName}
                            onChange={(e) => { setCompanyName(e.target.value) }}
                        />
                    </div>
                    <div className="col-md-6">
                        <select className="form-select background-whitesmoke p-2" value={jobTitle} onChange={(e) => { setJobTitle(e.target.value) }}>
                            <option disabled>
                                Job Title...
                            </option>
                            <option>Owner / Founder</option>
                            <option>General Manager</option>
                            <option>Sales Manages</option>
                            <option>Marketing Manager</option>
                            <option>Admin / Receptionist</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <select className="form-select background-whitesmoke p-2" value={fleetSize} onChange={(e) => { setFleetSize(e.target.value) }}>
                            <option disabled>
                                Fleet Size...
                            </option>
                            <option>5-10 cars</option>
                            <option>Upto 50 Cars</option>
                            <option>Upto 100 Cars</option>
                            <option>Upto 500 Cars</option>
                            <option>500+ Cars</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control p-2 background-whitesmoke"
                            placeholder='Phone Number'
                            value={phoneNumber}
                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control p-2 background-whitesmoke"
                            placeholder='Email'
                            value={emailAddress}
                            onChange={(e) => { setEmailAddress(e.target.value) }}
                        />
                    </div>
                    <div className="col-md-6">
                        <select className="form-select background-whitesmoke p-2" value={country} onChange={(e) => { setCountry(e.target.value) }}>
                            <option disabled>
                                Select...
                            </option>
                            {countriesData.length > 0 ?
                                countriesData.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    );
                                })
                                :
                                ''
                            }
                        </select>
                    </div>
                    <div className="col-md-6">
                        <select className="form-select background-whitesmoke p-2" value={city} onChange={(e) => { setCity(e.target.value) }}>
                            <option disabled>
                                City...
                            </option>
                            <option>Abu Dhabi</option>
                            <option>Ajman</option>
                            <option>Dubai</option>
                            <option>Fujairah</option>
                            <option>Ras Al Khaimah</option>
                            <option>Sharjah</option>
                            <option>Umm Al Quwain</option>
                        </select>
                    </div>
                    <div className="col-md-5">
                        <ReCAPTCHA sitekey={process.env.React_App_Recaptcha_Key} onChange={(e) => { setCaptchaValue(e) }} ref={captchaRef} />
                    </div>
                    <div className="col-12">
                        <button onClick={submitForm} disabled={btnDisable} className="btn primary_background_color text-white">
                            Submit form
                        </button>
                    </div>
                </div>
                <p className="para">To market your vehicles here, make sure your all vehicles are registered, insured and under the name of licensed business.</p>
            </div>
        </>
    );
};

export default AddYourOwnVehicleForm;

