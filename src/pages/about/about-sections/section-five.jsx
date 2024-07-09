import React from 'react'

const SectionFive = () => {
    return (
        <>
            <div className="about-page-section-five">
                <div className="col-md-7 about-page-video-contanier">
                    <iframe width="80%" height="350" src="https://www.youtube.com/embed/NMThdHhrLoM?si=V3Ze1aXVrK_nuPDN" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
                <div className="col-md-5 about-page-section-five-content">
                    <div className="about-page-section-five-content-one">
                        <h3 className='primary_text_color'>User Friendly</h3>
                        <p className="para para-border text-justify">
                            Our user-friendly interface and efficient search engine makes it easy for you to find and compare different car rental options. You can filter your search based on various criteria such as car type and makes, price range and location allowing you to find the perfect rental companies quickly and efficiently.
                        </p>
                    </div>
                    <div className="about-page-section-five-content-two">
                        <h3 className='primary_text_color'>Vision</h3>
                        <p className="para para-border text-justify">
                            Our vision is to bring simplification and improvement in the process of renting all kind of vehicles for our end- user's experience.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );;
};

export default SectionFive;