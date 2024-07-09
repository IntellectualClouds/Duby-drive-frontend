import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import ContactInfoBox from './components/contact-info-box';

const SectionOne = () => {

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const [customerMessage, setCustomerMessage] = useState("");

    const [captchaValue, setCaptchaValue] = useState("");
    const captchaRef = useRef();

    const [btnDisable, setBtnDisable] = useState(false);

    const callingContactFormApi = async (customerName, customerEmail, customerPhoneNumber, customerMessage, captchaValue) => {
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/post/data/contactForm`,
                data: { customerName, customerEmail, customerPhoneNumber, customerMessage, captchaValue }
            });
            // console.log(response);
            if (response.status == 200) {
                toast.success('Submit successfully');
                setTimeout(() => {
                    toast.info('We will contact you soon');
                }, 2000);
                setCustomerName("");
                setCustomerEmail("");
                setCustomerPhoneNumber("");
                setCustomerMessage("");
                setCaptchaValue("");
                captchaRef.current.reset();
                setBtnDisable(false);
            }
        } catch (error) {
            // console.log('Failed while calling contact from post api: ', error);
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
        else if (customerMessage.trim() == "") {
            toast.info("Please enter your message");
        }
        else if (captchaValue == "") {
            toast.info("Please fill the captcha");
        }
        else {
            setBtnDisable(true);
            callingContactFormApi(customerName.trim(), customerEmail.trim(), customerPhoneNumber.trim(), customerMessage.trim(), captchaValue);
        }
    };

    return (
        <>
            <ToastContainer theme="colored" />
            <div className="contact-form-section-one">
                <h3 className='mb-4'>Do you have any question?</h3>
                <div className="row flex-wrap">
                    <div className="form-container col-md-8">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Your Name'
                                    value={customerName}
                                    onChange={(e) => {
                                        setCustomerName(e.target.value
                                        )
                                    }}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Your Email'
                                    value={customerEmail}
                                    onChange={(e) => { setCustomerEmail(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2 background-whitesmoke"
                                    placeholder='Your Phone Number'
                                    value={customerPhoneNumber}
                                    onChange={(e) => { setCustomerPhoneNumber(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-12">
                                <textarea placeholder='Text Message' value={customerMessage} onChange={(e) => { setCustomerMessage(e.target.value) }} className='form-control background-whitesmoke' rows="7"></textarea>
                            </div>
                            <div className="col-md-5">
                                <ReCAPTCHA sitekey={process.env.React_App_Recaptcha_Key} onChange={(e) => { setCaptchaValue(e) }} ref={captchaRef} />
                            </div>
                            <div className="col-12">
                                <button disabled={btnDisable} onClick={submitData} className="btn primary_background_color text-white">
                                    Submit form
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <ContactInfoBox />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionOne;