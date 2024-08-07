import React, { useState, useRef, useEffect } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const BannerForm = () => {
    let navigation = useNavigate();

    const [bannerPage, setBannerPage] = useState("");
    const [bannerNumber, setBannerNumber] = useState("");
    const [status, setStatus] = useState(true);
    const [bannerHTML, setBannerHTML] = useState("");

    const [btnDisable, setBtnDisable] = useState(false);

    const apiCall = async (
        bannerPage,
        bannerNumber,
        status,
        bannerHTML
    ) => {
        let apiUrl = `${host[0].hostUrl}/api/post/data/banner`;

        try {
            let response = await axios({
                method: "POST",
                url: apiUrl,
                data: { bannerPage, bannerNumber, status, bannerHTML },
            });
            // console.log(response);
            if (response.status == 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Congraulations!",
                    text: "Banner added successfully",
                    showConfirmButton: true,
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    willClose: () => {
                        setBtnDisable(false);
                        setBannerPage("");
                        setBannerNumber("");
                        setStatus(true);
                        setBannerHTML("");
                        navigation("/bannerTable");
                    },
                });
            }
        } catch (error) {
            // console.log(
            //     "Something went wrong while adding banner data in dataBase: ",
            //     error
            // );
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Cannot process your entry!",
                text: "Something went wrong from server site make sure your network is connected",
                showConfirmButton: true,
                timer: 4000,
                customClass: {
                  confirmButton: 'btn btn-danger'
                },
                willClose: () => {
                  setBtnDisable(false);
                },
              });
        }
    };

    const addNewBanner = async (e) => {
        e.preventDefault();
        if (
            bannerPage.trim() == "" ||
            bannerNumber.trim() == "" ||
            bannerHTML.trim() == ""
        ) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Cannot process your entry!",
                text: "All fields are required, Please enter correct details",
                showConfirmButton: true,
                timer: 3000,
                customClass: {
                  confirmButton: 'btn btn-info'
                },
              });
        } else {
            let statusValue;
            if (status == true) {
                statusValue = "active";
            } else {
                statusValue = "inActive";
            }
            setBtnDisable(true);
            apiCall(
                bannerPage.trim(),
                bannerNumber.trim(),
                statusValue,
                bannerHTML
            );
        }
    };

    useEffect(() => {
        setBannerPage("Home Page");
        setBannerNumber("1");
    }, []);

    return (
        <>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Banner</h1>
                </div>
                <div className="ms-auto pageheader-btn">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" style={{ color: " #8fbd56" }}>
                            Banner
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Add New Banner
                        </li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="card">
                        <div className="card-header border-bottom">
                            <h3 className="card-title">Add New Banner</h3>
                        </div>
                        <div className="card-body">
                            <form
                                className="row g-3 needs-validation"
                                noValidate
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flexWrap: 'wrap'
                                }}
                            >
                                <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 10 }}>
                                    <div className="col-4">
                                        <label htmlFor="validationCustom04" className="form-label">
                                            Select Page
                                        </label>
                                        <select
                                            className="form-select"
                                            id="validationCustom04"
                                            required
                                            value={bannerPage}
                                            onChange={(e) => {
                                                setBannerPage(e.target.value);
                                            }}
                                        >
                                            <option disabled>Select</option>
                                            <option>Home Page</option>
                                            <option>Car Page</option>
                                            <option>Yacht Page</option>
                                            <option>Quad Biking Page</option>
                                            <option>Companies Page</option>
                                            <option>Car Details Page</option>
                                            <option>Yacht Details Page</option>
                                            <option>Bike Details Page</option>
                                            <option>Company Details Page</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="validationCustom04" className="form-label">
                                            Select Banner No.
                                        </label>
                                        <select
                                            className="form-select"
                                            id="validationCustom04"
                                            required
                                            value={bannerNumber}
                                            onChange={(e) => {
                                                setBannerNumber(e.target.value);
                                            }}
                                        >
                                            <option disabled>Select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2" style={{ backgroundColor: "none", marginLeft: 10 }}
                                    >
                                        <label htmlFor="validationCustom04" className="form-label">
                                            Active/Inactive
                                        </label>
                                        <div className="form-group">
                                            <div className="checkbox">
                                                <div className="custom-checkbox custom-control">
                                                    <input type="checkbox" className="custom-control-input" id="checkbox-2" defaultChecked={true} onClick={() => { setStatus(!status) }} />
                                                    <label htmlFor="checkbox-2" className="custom-control-label" style={{ marginTop: 3, fontWeight: "500", color: "#8fbd56", }}>
                                                        {status == true ? "Active" : ""}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                    <div className="col-md-12">
                                        <h4 className="mb-2" style={{ color: "#8fbd56" }}>
                                            Upload Banner HTML
                                        </h4>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="validationCustom01"
                                            required
                                            value={bannerHTML}
                                            onChange={(e) => {
                                                setBannerHTML(e.target.value);
                                            }}
                                            style={{
                                                resize: "none",
                                                height: 150,
                                            }}
                                        />
                                        {bannerHTML.trim().length < 10 ? (
                                            <label
                                                htmlFor="validationCustom01"
                                                className="form-label"
                                                style={{
                                                    color: "red",
                                                    fontWeight: "400",
                                                    paddingLeft: 10,
                                                }}
                                            >
                                                Please enter Banner HTML
                                            </label>
                                        ) : (
                                            <label
                                                htmlFor="validationCustom01"
                                                className="form-label"
                                                style={{
                                                    color: "#8fbd56",
                                                    fontWeight: "400",
                                                    paddingLeft: 10,
                                                }}
                                            >
                                                Looks good
                                            </label>
                                        )}
                                        <div className="valid-feedback">Looks good!</div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="btn btn-default" style={{ marginRight: 10 }}>
                                        <Link to={"/bannerTable"}>Cancel</Link>
                                    </div>
                                    <button className="btn btn-primary" onClick={addNewBanner} disabled={btnDisable}>
                                        {
                                            btnDisable ?
                                                <>
                                                    <span className="spinner-grow spinner-grow-sm mt-1 me-1" aria-hidden="true" />
                                                    <span role="status">Loading...</span>
                                                </>
                                                :
                                                'Submit'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerForm;
