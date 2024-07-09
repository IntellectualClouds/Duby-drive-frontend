import React from 'react';
import { useNavigate } from 'react-router-dom';

const SectionOne = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="faq-section-one p-5 pb-3">
                <h1 className='mb-4'>Dubai Car Rental FAQs</h1>

                <p className='para'><span onClick={()=>{navigate('/')}} className="links primary_text_color">DubyDrive.com</span> presents a comprehensive set of frequently asked questions that you might need answers for before renting a car in the UAE. No matter if you decide to rent a Kia Picanto, Cadillac Escalade or even a Ferrari 488 in the emirates, the below answers apply. Source: various car rental companies operating in Dubai, Abu Dhabi, Ras Al Khaimah and RTA (Road and Transport Authority) itself. Please feel free to share your suggestions and comments with us.</p>
                <p className='para'><span className='primary_text_color'>Note</span>: Rental car company, car hire company and car lease company all mean the same. They are used interchangeably for maximum effect.</p>
                <p className='para'>Passport holders of GCC, US, UK, Canada and <span className='links primary_text_color text-decoration-underline' onClick={()=>{navigate('/countries_driving_license')}}>certain other countries can drive on their home country license</span> in the UAE. <span onClick={()=>{navigate('/countries_driving_license')}} className="primary_text_color text-decoration-underline links">Read more...</span></p>
            </div>
        </>
    );
};

export default SectionOne;