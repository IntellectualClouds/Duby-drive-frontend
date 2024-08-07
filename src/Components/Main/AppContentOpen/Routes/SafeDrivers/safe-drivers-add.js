import React, { useEffect, useState, useRef } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Text Editor Form...
import JoditEditor from "jodit-react";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const SafeDriversForm = () => {
  let navigation = useNavigate();

  const [dealerData, setDealerData] = useState([]);

  //! Form States...
  const [servicePeriod, setServicePeriod] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [carWithDriver, setCarWithDriver] = useState("");
  const [dealerCompanyId, setDealerCompanyId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);

  const [btnDisable, setBtnDisable] = useState(false);

  const editor = useRef(null);

  //! Calling Api for adding new safe driver data...
  const apiCall = async (
    servicePeriod,
    serviceType,
    carWithDriver,
    dealerCompanyId,
    startTime,
    endTime,
    servicePrice,
    description,
    status
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/safeDrivers`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          servicePeriod,
          serviceType,
          carWithDriver,
          dealerCompanyId,
          startTime,
          endTime,
          servicePrice,
          description,
          status,
        },
      });
      // console.log(response);
      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Congraulations!",
          text: "Driver Details is added successfully",
          showConfirmButton: true,
          timer: 2000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          willClose: () => {
            setBtnDisable(false);
          setServicePeriod("");
          setServiceType("");
          setCarWithDriver("");
          setDealerCompanyId(Number);
          setStartTime("");
          setEndTime("");
          setServicePrice("");
          setDescription("");
          setStatus(true);

          navigation("/safeDriversTable");
          },
        });
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
  const addNewSafeDriver = async (e) => {
    e.preventDefault();
    if (
      servicePeriod.trim() == "" ||
      serviceType.trim() == "" ||
      carWithDriver.trim() == "" ||
      !dealerCompanyId ||
      startTime.trim() == "" ||
      endTime.trim() == "" ||
      servicePrice.trim() == "" ||
      description.trim() == ""
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
        servicePeriod.trim(),
        serviceType.trim(),
        carWithDriver.trim(),
        dealerCompanyId,
        startTime.trim(),
        endTime.trim(),
        servicePrice.trim(),
        description.trim(),
        statusValue
      );
    }
  };

  const fetchingDealersData = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `${host[0].hostUrl}/api/get/data/venders`
      });
      // console.log(response);
      if (response.status == 200) {
        setDealerData(response.data.data);
        setDealerCompanyId(response.data.data[0].id);
      }
    } catch (error) {
      // console.log('Failed while fetching dealers data api: ', error);
    }
  };

  useEffect(() => {
    fetchingDealersData();

    setServicePeriod("Hourly");
    setServiceType("Driver Service");
    setCarWithDriver("Only Driver");
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Safe Drivers</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: " #8fbd56" }}>
              Safe Drivers
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Driver Service
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Driver Service</h3>
            </div>
            <div className="card-body">
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}
                >
                  {/* Service Period */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Service Period
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={servicePeriod}
                      onChange={(e) => {
                        setServicePeriod(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Hourly</option>
                      <option>Per Day</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                    {servicePeriod.trim().length < 4 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select service period
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
                  {/* Service Type */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Service Type
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={serviceType}
                      onChange={(e) => {
                        setServiceType(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Driver Service</option>
                      <option>Pick and Drop</option>
                      <option>School Pick and Drop</option>
                      <option>Event Driver</option>
                      <option>Airport Transfer</option>
                    </select>
                    {serviceType.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select service type
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
                  {/* With Driver */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Car with Driver
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={carWithDriver}
                      onChange={(e) => {
                        setCarWithDriver(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Only Driver</option>
                      <option>Car with Driver</option>
                    </select>
                    {carWithDriver.trim().length < 4 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select at least one option
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
                  {/* Dealer */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Dealer Company
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={dealerCompanyId}
                      onChange={(e) => {
                        setDealerCompanyId(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      {dealerData.length > 0 ?
                        dealerData.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>{item.companyName}</option>
                          );
                        })
                        :
                        ''
                      }
                    </select>
                    {dealerCompanyId.length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select dealer company
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
                  {/* Start Time */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                      }}
                      style={{
                        borderColor:
                          startTime.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {startTime.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter service start time
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
                  {/* End Time */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={endTime}
                      onChange={(e) => {
                        setEndTime(e.target.value);
                      }}
                      style={{
                        borderColor:
                          endTime.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {endTime.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter service end time
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
                  {/* Service Price */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Service Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={servicePrice}
                      onChange={(e) => {
                        setServicePrice(e.target.value);
                      }}
                      style={{
                        borderColor:
                          servicePrice.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {servicePrice.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter service price
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
                  {/* Status */}
                  <div className="col-md-2" style={{ marginLeft: 10 }}>
                    <label htmlFor="validationCustom04" className="form-label">
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
                  {/* Description */}
                  {/* <div className="col-md-12">
                    <label htmlFor="validationCustom01" className="form-label">
                      Driver Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        height: 80,
                        borderColor:
                          description.trim().length < 5 ? "red" : "#8fbd56",
                      }}
                    />
                    {description.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter driver description
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
                  </div> */}

                  <div className="col-md-12" style={{ marginTop: 10, marginBottom: 20 }}>
                    <h4 style={{ color: "#8fbd56" }}>Driver Description:</h4>
                    <JoditEditor
                      ref={editor}
                      value={description}
                      onChange={(e) => {
                        setDescription(e);
                      }}
                    />
                  </div>


                  {/* Button */}
                  <div className="col-md-12" style={{ marginTop: 20 }}>
                    <div
                      className="btn btn-default"
                      style={{ marginRight: 10 }}
                    >
                      <Link to={"/safeDriversTable"}>Cancel</Link>
                    </div>
                    <button className="btn btn-primary" onClick={addNewSafeDriver} disabled={btnDisable}>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SafeDriversForm;
