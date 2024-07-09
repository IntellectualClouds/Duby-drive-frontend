import React, { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import axios from "axios";

import YachtPageBannerOne from "../../../components/banners/yacht-page-banner-one";
import YachtPageBannerTwo from "../../../components/banners/yacht-page-banner-two";

import yachtIcon from "../../../assets/icons/yacht.png";
import bedIcon from "../../../assets/icons/bed.png";
import userIcon from "../../../assets/icons/user.png";
import musicIcon from "../../../assets/icons/music.png";
import pinIcon from "../../../assets/icons/pin.png";
import kidIcon from "../../../assets/icons/child.png";
import fuelIcon from "../../../assets/icons/fuel.png";

import callIcon from "../../../assets/icons/call.png";
import whatsappIcon from "../../../assets/icons/whatsapp.png";
import sendIcon from "../../../assets/icons/send.png";
import filterIcon from "../../../assets/icons/filter-white.png";
import logo from "../../../assets/logo/duby-drive.png";

const SectionOne = () => {

    const navigate = useNavigate();

    const [yachtData, setYachtData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const fetchingYachtsDataApi = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${process.env.React_App_Host_Url}/api/get/data/yachtDetails`
            });
            // console.log(response);
            if (response.status == 200) {
                setYachtData(response.data.data);
                setFilterData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching yacht data api: ', error);
        }
    };

    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filterData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filterData.slice(startIndex, endIndex);

    const changePage = (page_number) => {
        setCurrentPage(page_number);
    };

    useEffect(() => {
        fetchingYachtsDataApi();
    }, []);

    return (
        <div className="yacht-page-section-one">
            <div className="row">
                <div className="col-md-3">
                    {yachtData.length > 0 ?
                        <div className="accordion accordion-flush yacht-accordion" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseZero"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseZero"
                                    >
                                        Select Yacht Name
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseZero"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        <div>
                                            <select onChange={(e) => { setFilterData(yachtData.filter(({ yachtName }) => (yachtName.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                <option>
                                                    Choose...
                                                </option>
                                                {yachtData.length > 0 ?
                                                    yachtData.map((item, index) => {
                                                        return (
                                                            <option key={index}>{item.yachtName}</option>
                                                        );
                                                    })
                                                    :
                                                    ''
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseOne"
                                    >
                                        Select Yacht Type
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseOne"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        <div>
                                            <select onChange={(e) => { setFilterData(yachtData.filter(({ yachtType }) => (yachtType.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                <option>
                                                    Choose...
                                                </option>
                                                {yachtData.length > 0 ?
                                                    yachtData.map((item, index) => {
                                                        return (
                                                            <option key={index}>{item.yachtType}</option>
                                                        );
                                                    })
                                                    :
                                                    ''
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseTwo"
                                    >
                                        Captain Included
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseTwo"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        <div>
                                            <select onChange={(e) => { setFilterData(yachtData.filter(({ captainIncluded }) => (captainIncluded.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                <option>
                                                    Choose...
                                                </option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseThree"
                                    >
                                        Crew Members Included
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseThree"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        <div>
                                            <select onChange={(e) => { setFilterData(yachtData.filter(({ crewMembers }) => (crewMembers.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                <option>
                                                    Choose...
                                                </option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseFour"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseFour"
                                    >
                                        Select Capacity
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseFour"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        <div>
                                            <select onChange={(e) => { setFilterData(yachtData.filter(({ capacity }) => (capacity.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                <option>
                                                    Choose...
                                                </option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFive"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFive"
                                        >
                                            Select Rooms
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseFive"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(yachtData.filter(({ yachtRoom }) => (yachtRoom.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            {/* currently room filer is off because some reasons and also we wants to add yacht size filter later */}
                        </div>
                        :
                        ''
                    }

                    <div className="yacht-animation d-flex justify-content-center mt-5">
                        <YachtPageBannerTwo />
                    </div>

                </div>
                <div className="col-md-9 yacht-details-section">
                    <div className="yacht-page-header">
                        <h2 className="mb-3">Dubai Yacht Rentals</h2>
                        <p className="para">Renting a yacht in Dubai to sail in the peaceful and quiet waters of the Arabian Gulf on your special occasion is simpler than ever. Compare Yacht Rеntal in Dubai prices from your preferred rental company in Dubai. Access diffеrеnt modеls, amеnitiеs offered by multiplе suppliеrs and choose your preferred yacht to rent, all undеr onе roof!</p>
                    </div>

                    <YachtPageBannerOne />

                    <div className="yacht-cards-details-container">
                        {currentData.length > 0 ?
                            currentData.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => { navigate({ pathname: '/yacht_details', search: `?${createSearchParams({ yacht_id: item.id })}` }) }} className="car-cards col-md-11">
                                        <div className="yacht-card-img-container">
                                            {
                                                item.yachtPhotosArray !== null ?
                                                    <img src={`${process.env.React_App_Host_Url}/images/yacht-images/${item.yachtPhotosArray[0]}`} alt={item.yachtPhotosArray[0]} className="yacht-card-img" />
                                                    :
                                                    ''
                                            }
                                        </div>
                                        <div className="yacht-card-details">
                                            <h4 className="yacht-name">{item.yachtName}</h4>
                                            <div className="yacht-specs-container">
                                                <div className="yacht-spec-item">
                                                    <img src={yachtIcon} alt="yacht-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.yachtType}</span>
                                                </div>
                                                <div className="yacht-spec-item">
                                                    <img src={bedIcon} alt="bed-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.yachtRoom}</span>
                                                </div>
                                                <div className="yacht-spec-item">
                                                    <img src={userIcon} alt="user-icon" className="spec-icon" />
                                                    <span className="text-gray">{item.capacity}</span>
                                                </div>
                                            </div>
                                            <div className="yacht-card-dealer-info">
                                                <img src={`${process.env.React_App_Host_Url}/images/dealers-logo/${item.dealerCompanyId}.png`} alt="dealer-logo" className="yacht-card-dealer-logo" />
                                                <h5 className="mb-0 primary_text_color">Dealer name or company</h5>
                                            </div>
                                            <div className="yacht-card-price-info-container">
                                                <h5>AED {item.perHourRentalCost} <span className="text-gray">/ hour</span></h5>
                                            </div>
                                        </div>

                                        <div className="card-buttons">
                                            <div className="card-btn primary_background_color phone-btn yacht-phone-btn">
                                                <img src={callIcon} alt="call-icon" className="card-btn-icons" />
                                            </div>
                                            <div className="card-btn background-green">
                                                <img src={whatsappIcon} alt="whatsapp-icon" className="card-btn-icons" />
                                            </div>
                                            <div className="card-btn background-orange yacht-send-btn">
                                                <img src={sendIcon} alt="send-icon" className="card-btn-icons" />
                                            </div>
                                        </div>
                                        {/* <div className="yacht-card-price-info-container">
                                                <h5>AED {item.perHourRentalCost} <span className="text-gray">/ hour</span></h5>
                                                <h5>AED {item.perDayRentalCost} <span className="text-gray">/ day</span></h5>
                                            </div> */}
                                    </div>

                                );
                            })
                            :
                            ''
                        }
                    </div>


                    {
                        currentData.length > 0 ?
                            <div className="pagination-bar p-2 d-flex justify-content-center mt-3">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item pagination-item" onClick={() => { changePage(currentPage - 1) }}>
                                            <a className="page-link p-2 ps-4 pe-4" href="#top">
                                                Previous
                                            </a>
                                        </li>
                                        {Array.from({ length: totalPages }, (item, index) => (
                                            <li key={index} onClick={() => { changePage(index + 1) }} className="page-item pagination-item">
                                                <a className="page-link p-2 ps-4 pe-4" href="#top">
                                                    {index + 1}
                                                </a>
                                            </li>
                                        ))}
                                        <li className="page-item pagination-item" onClick={() => { changePage(currentPage + 1) }}>
                                            <a className="page-link p-2 ps-4 pe-4" href="#top">
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                            </div>
                            :
                            ''
                    }
                </div>
            </div>
            <button onClick={() => { document.querySelector('.mobile-filter-sidebar').classList.add('active-filter-sidebar') }} className="filterSideBarBtn primary_background_color"><img src={filterIcon} alt="filter-icon" height={20} width={20} /> Filters</button>

            <div className="mobile-filter-sidebar background-transparent">
                <div className="mobile-sidebar-container">
                    <div className="mobile-filter-sidebar-header">
                        <img onClick={() => { navigate('/') }} src={logo} alt="logo" className='mobile-filter-sidebar-header-logo' />
                        <h4 onClick={() => { navigate('/') }}>DubyDrive</h4>
                        <span className='mobile-filter-sidebar-close-icon' onClick={() => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar') }}>&times;</span>
                    </div>
                    <div className="mobile-filter-sidebar-body">
                        {yachtData.length > 0 ?
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseZero"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseZero"
                                        >
                                            Select Yacht Name
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseZero"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(yachtData.filter(({ yachtName }) => (yachtName.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {yachtData.length > 0 ?
                                                        yachtData.map((item, index) => {
                                                            return (
                                                                <option key={index}>{item.yachtName}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseOne"
                                        >
                                            Select Yacht Type
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseOne"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(yachtData.filter(({ yachtType }) => (yachtType.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {yachtData.length > 0 ?
                                                        yachtData.map((item, index) => {
                                                            return (
                                                                <option key={index}>{item.yachtType}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTwo"
                                        >
                                            Captain Included
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseTwo"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(yachtData.filter(({ captainIncluded }) => (captainIncluded.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseThree"
                                        >
                                            Crew Members Included
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseThree"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(yachtData.filter(({ crewMembers }) => (crewMembers.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFour"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFour"
                                        >
                                            Select Capacity
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseFour"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { setFilterData(yachtData.filter(({ capacity }) => (capacity.toLowerCase().includes(e.target.value.toLowerCase())))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTwo"
                                        >
                                            Select Car Type
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseTwo"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <select onChange={(e) => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar'); setFilterData(yachtData.filter(({ carTypeId }) => (carTypeId.toString().includes(e.target.value)))) }} className="form-select background-whitesmoke p-2">
                                                    <option>
                                                        Choose...
                                                    </option>
                                                    {carTypesData.length > 0 ?
                                                        carTypesData.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.id}>{item.carType}</option>
                                                            );
                                                        })
                                                        :
                                                        ''
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            :
                            ''
                        }
                    </div>
                </div>
                <div onClick={() => { document.querySelector('.mobile-filter-sidebar').classList.remove('active-filter-sidebar') }} className='filter-sidebar-close-vertical-bar'></div>
            </div>
        </div>
    );
};

export default SectionOne;