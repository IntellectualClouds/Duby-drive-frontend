import React, { useEffect, useState } from "react";
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

const PackagesForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [packageName, setPackageName] = useState("");
  const [packageDuration, setPackageDuration] = useState("");
  const [currencyType, setCurrencyType] = useState("");
  const [carLimit, setCarLimit] = useState("");
  const [packageSellPrice, setPackageSellPrice] = useState("");
  const [packageOfferPrice, setPackageOfferPrice] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [verified, setVerified] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [premium, setPremium] = useState(true);

  const [btnDisable, setBtnDisable] = useState(false);

  //* Image State...
  const [file, setFile] = useState(null);

  //! Function for uploading image into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = `${host[0].hostUrl}/api/upload/image/packages`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      // console.log(response);
      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Congraulations!",
          text: "Package added successfully",
          showConfirmButton: true,
          timer: 2000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          willClose: () => {
            setBtnDisable(false);
            setPackageName("");
            setPackageDuration("");
            setFile(null);
            setStatus(true);
            setCurrencyType("");
            setPackageSellPrice("");
            setPackageOfferPrice("");
            setPackageDescription("");
            setCarLimit("");
            setVerified(false);
            setFeatured(false);
            setPremium(false);
            navigation("/packagesTable");
  
          },
        });
      }
    } catch (error) {
      // console.log("Something went wrong while uploading image: ", error);
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

  //! Calling Api for adding new package data...
  const apiCall = async (
    packageName,
    packageDuration,
    status,
    currency,
    sellPrice,
    offerPrice,
    description,
    carLimit,
    verified,
    featured,
    premium
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/packages`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          packageName,
          packageDuration,
          status,
          currency,
          sellPrice,
          offerPrice,
          description,
          carLimit,
          verified,
          featured,
          premium
        },
      });
      // console.log(response);
      if (response.status == 200) {
        uploadImage();
      }
    } catch (error) {
      // console.log(
      //   "Something went wrong while adding data in dataBase: ",
      //   error
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

  //! Fucntion for adding new data in dataBase...
  const addNewPackage = async (e) => {
    e.preventDefault();
    if (
      packageName.trim() == "" ||
      packageDuration.trim() == "" ||
      file == null ||
      currencyType.trim() == "" ||
      packageSellPrice.trim() == "" ||
      packageOfferPrice.trim() == "" ||
      packageDescription.trim() == "" ||
      carLimit.trim() == ""
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
      let statusValue = status == true ? "active" : "inActive";
      let verifyValue = verified == true ? "verified" : "notVerified";
      let featuredValue = featured == true ? "featured" : "notFeatured";
      let premiumValue = premium == true ? "premium" : "notPremium";
      setBtnDisable(true);
      apiCall(
        packageName.trim(),
        packageDuration.trim(),
        statusValue,
        currencyType.trim(),
        packageSellPrice.trim(),
        packageOfferPrice.trim(),
        packageDescription.trim(),
        carLimit.trim(),
        verifyValue,
        featuredValue,
        premiumValue
      );
    }
  };

  useEffect(() => {
    setCurrencyType("AED");
    setCarLimit("5");
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Packages</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Packages
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Package
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Package</h3>
            </div>
            <div className="card-body">
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="col-md-12" style={{ display: 'flex', flexWrap: "wrap" }}>
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Package Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={packageName}
                      onChange={(e) => {
                        setPackageName(e.target.value);
                      }}
                      style={{
                        borderColor:
                          packageName.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {packageName.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Package Name
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Package Duration (Month)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={packageDuration}
                      onChange={(e) => {
                        setPackageDuration(e.target.value);
                      }}
                      style={{
                        borderColor:
                          packageDuration.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {packageDuration.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter package duration
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
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    Upload Logo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="validationCustom02"
                    required
                     accept="image/png, image/jpeg"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    style={{
                      borderColor: file == null ? "red" : "#8fbd56",
                    }}
                  />
                  {file == null ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please upload Package logo
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
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {/* PAckage sell price Input Add */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Package Sell Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={packageSellPrice}
                      onChange={(e) => {
                        setPackageSellPrice(e.target.value);
                      }}
                      style={{
                        borderColor:
                          packageSellPrice.trim().length < 1
                            ? "red"
                            : "#8fbd56",
                        width: "100%",
                      }}
                    />
                    {packageSellPrice.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Package Sell Price
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
                  {/* Package offer price input */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Package Offer Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={packageOfferPrice}
                      onChange={(e) => {
                        setPackageOfferPrice(e.target.value);
                      }}
                      style={{
                        borderColor:
                          packageOfferPrice.trim().length < 1
                            ? "red"
                            : "#8fbd56",
                        width: "100%",
                      }}
                    />
                    {packageOfferPrice.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Package Offer Price
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
                  {/* Currency Type */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Currency
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={currencyType}
                      onChange={(e) => {
                        setCurrencyType(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>USD</option>
                      <option>AED</option>
                      <option>PKR</option>
                    </select>
                    {currencyType.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select Currency Type
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
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Select Cars Limit */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Cars Limit
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={carLimit}
                      onChange={(e) => {
                        setCarLimit(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                      <option>25</option>
                      <option>30</option>
                      <option>35</option>
                      <option>40</option>
                      <option>45</option>
                      <option>50</option>
                      <option>55</option>
                      <option>60</option>
                      <option>65</option>
                      <option>70</option>
                      <option>75</option>
                      <option>80</option>
                      <option>85</option>
                      <option>90</option>
                      <option>95</option>
                      <option>100</option>
                    </select>
                    {carLimit.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select Cars Limit
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
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Packages Description */}
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      Package Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={packageDescription}
                      onChange={(e) => {
                        setPackageDescription(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        // height: 100,
                        borderColor:
                          packageDescription.trim().length < 5
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {packageDescription.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Package Description
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
                  {/* Verify */}
                  <div
                    className="col-md-2"
                    style={{ backgroundColor: "none" }}
                  >
                    <label
                      htmlFor="validationCustom04"
                      className="form-label"
                    >
                      Verify
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-3"
                            defaultChecked={true}
                            onClick={() => {
                              setVerified(!verified);
                            }}
                          />
                          <label
                            htmlFor="checkbox-3"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {verified == true ? "Verified" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Featured */}
                  <div
                    className="col-md-2"
                    style={{ backgroundColor: "none" }}
                  >
                    <label
                      htmlFor="validationCustom04"
                      className="form-label"
                    >
                      Featured
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-4"
                            defaultChecked={true}
                            onClick={() => {
                              setFeatured(!featured);
                            }}
                          />
                          <label
                            htmlFor="checkbox-4"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {featured == true ? "Featured" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Premium */}
                  <div
                    className="col-md-2"
                    style={{ backgroundColor: "none" }}
                  >
                    <label
                      htmlFor="validationCustom04"
                      className="form-label"
                    >
                      Premium
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-5"
                            defaultChecked={true}
                            onClick={() => {
                              setPremium(!premium);
                            }}
                          />
                          <label
                            htmlFor="checkbox-5"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {premium == true ? "Premium" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 20, backgroundColor: "none" }}
                  >
                    <label
                      htmlFor="validationCustom04"
                      className="form-label"
                    >
                      Active/Inactive
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-2"
                            defaultChecked={true}
                            onClick={() => {
                              setStatus(!status);
                            }}
                          />
                          <label
                            htmlFor="checkbox-2"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {status == true ? "Active" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                </div>
                {/* Button */}
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/packagesTable"}>Cancel</Link>
                  </div>
                  <button className="btn btn-primary" onClick={addNewPackage} disabled={btnDisable}>
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

export default PackagesForm;
