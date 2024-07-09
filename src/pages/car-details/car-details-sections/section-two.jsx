import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionTwo = () => {

    const navigate = useNavigate();

    const [faqData, setFaqData] = useState([]);

    const fetchingFaqData = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `${process.env.React_App_Host_Url}/api/get/data/faq/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setFaqData(response.data.data.slice(0, 10));
            }
        } catch (error) {
            console.log('Failed while fetching faq data: ', error);
        }
    };

    useEffect(() => {
        fetchingFaqData();
    }, []);

    return (
        <>
            <div id="car-details-faq-section" className='home-section-twelve ps-5 pe-5 col-md-8 pt-0'>
                <h2 className='mb-4'>Frequently Asked Questions</h2>
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    {
                        faqData.length > 0 ?
                            faqData.map((item, index) => {
                                return (
                                    item.faqType == 'Customer' ?
                                        <div key={index} className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#flush-collapse${index}`}
                                                    aria-expanded="false"
                                                    aria-controls={`flush-collapse${index}`}
                                                >
                                                    {item.faqHeading}
                                                </button>
                                            </h2>
                                            <div
                                                id={`flush-collapse${index}`}
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div className="accordion-body">
                                                    {item.faqDescription}
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ''
                                );
                            })
                            :
                            ''
                    }
                </div>
                <div className='section-twelve-footer'>
                    <p className='section-twelve-footer-text'>DubyDrive.com is your trusted and reliable resource in the UAE. For more info, check out our complete list of <span onClick={() => { navigate('/frequently_asked_questions') }} className='primary_text_color links'>Dubai Car Rental FAQs.</span></p>
                </div>
            </div>
        </>
    );
};

export default SectionTwo;



