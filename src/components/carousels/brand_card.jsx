import React, { useState, useEffect,useRef } from "react";
import Slider from "react-slick";
import axios from "axios";
import { createSearchParams, useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandCardSlider = () => {

    const navigate = useNavigate();

    const [brandsData, setBrandsData] = useState([]);

    const [lengthData, setLengthData] = useState([]);

    const fetchingBrandsApi = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `${process.env.React_App_Host_Url}/api/get/data/carBrands/by/status`
            });
            // console.log(response);
            if (response.status == 200) {
                setBrandsData(response.data.data);
            }
        } catch (error) {
            // console.log('Failed while fetching brands api: ', error);
        }
    };

    const fetchingCarsCountApiByBrand = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/count/data/carBrands`
            });
            // console.log(response);
            if (response.status == 200) {
                setLengthData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching car brands length api: ', error);
        }
    };

    function NextCard(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ display: "flex", background: "whitesmoke", borderRadius: '50%', padding: 20, justifyContent: 'center', alignItems: 'center' }}
                onClick={onClick}
            />
        );
    }

    function PreviousCard(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ display: "flex", background: "whitesmoke", borderRadius: '50%', padding: 20, justifyContent: 'center', alignItems: 'center' }}
                onClick={onClick}
            />
        );
    }

    let sliderRef = useRef(null);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 9,
        slidesToScroll: 1,
        // nextArrow: <NextCard />,
        // prevArrow: <PreviousCard />,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 6,
                }
            },
            // {
            //     breakpoint: 768,
            //     settings: {
            //         slidesToShow: 4,
            //     }
            // },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 250,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };

    useEffect(() => {
        fetchingBrandsApi();
        fetchingCarsCountApiByBrand();
    }, []);

    return (
        <>
            {
                brandsData.length > 8 ?
                    <Slider {...settings}>
                        {
                            brandsData.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ brand: item.brandName.toLowerCase() })}` }, { state: { filterBy: 'brand', value: item.id } }) }}>
                                        <div className="brand-card">
                                            <img src={`${process.env.React_App_Host_Url}/images/car-brands-logo/${item.logo}`} alt={item.logo} className='brand-img' />
                                            <span className="brands-cards-slider-text">{item.brandName}</span>
                                            <h6 className='mb-0'>{lengthData.map((itm, ind) => {
                                                return (
                                                    <span style={{ fontSize: 12 }} key={ind}>{item.id == itm.carBrandId ? itm.total_length + ' Cars' : ''}</span>
                                                );
                                            })}</h6>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                    :
                    <div className="list-container">
                        {
                            brandsData.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => { navigate({ pathname: '/cars', search: `?${createSearchParams({ brand: item.brandName.toLowerCase() })}` }, { state: { filterBy: 'brand', value: item.id } }) }}>
                                        <div className="brand-card">
                                            <img src={`${process.env.React_App_Host_Url}/images/car-brands-logo/${item.logo}`} className='brand-img' />
                                            <span className="brands-cards-slider-text">{item.brandName}</span>
                                            <h6 className='mb-0'>{lengthData.map((itm, ind) => {
                                                return (
                                                    <span style={{ fontSize: 12 }} key={ind}>{item.id == itm.carBrandId ? itm.total_length + ' Cars' : ''}</span>
                                                );
                                            })}</h6>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </>
    );
};

export default BrandCardSlider;