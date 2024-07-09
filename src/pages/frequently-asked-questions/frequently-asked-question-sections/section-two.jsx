import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionTwo = () => {

    const [faqData, setFaqData] = useState([]);

    const fetchingFaqData = async () => {
        const faqType = 'Duby Drive';
        try {
            let response = await axios({
                method: 'POST',
                url: `${process.env.React_App_Host_Url}/api/get/data/faq/by/type`,
                data: { faqType }
            });
            // console.log(response);
            if (response.status == 200) {
                setFaqData(response.data.data);
            }
        } catch (error) {
            // console.log('Failed while fetching faq data: ', error);
        }
    };

    useEffect(() => {
        fetchingFaqData();
    }, []);

    return (
        <>
            <div className="faq-section-two ps-5 pe-5 mt-3">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    {
                        faqData.length > 0 ?
                            faqData.map((item, index) => {
                                return (
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
                                                {item.faqHeading} ({item.faqType})
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

export default SectionTwo;