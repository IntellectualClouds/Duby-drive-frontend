import React, { useEffect, useState } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate, useLocation } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const AreaEditForm = () => {
  let location = useLocation();
  let navigation = useNavigate();

  //! Form States...
  const [areaName, setAreaName] = useState("");
  const [cityId, setCityId] = useState(Number);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [status, setStatus] = useState(true);
  const [rowID, setRowID] = useState(Number);

  const [btnDisable, setBtnDisable] = useState(false);

  //! Api Data State...
  const [cityData, setCityData] = useState([]);

  //! Calling Api for edit area data...
  const apiCall = async (
    areaName,
    cityId,
    latitude,
    longitude,
    status,
    id
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/put/data/area/update/byId`;

    try {
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: { areaName, cityId, latitude, longitude, status, id },
      });
      // console.log(response);
      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Congraulations!",
          text: "Record updated successfully",
          showConfirmButton: true,
          timer: 2000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          willClose: () => {
            setBtnDisable(false);
            setAreaName("");
            setCityId(Number);
            setLatitude("");
            setLongitude("");
            setStatus(true);
            setRowID(Number);
            navigation("/areaTable");
          },
        });
      }
    } catch (error) {
      // console.log(
      //   "Something went wrong while updating data in dataBase: ",
      //   error
      // );
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed while updating",
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

  //! Function for update data in dataBase...
  const editAreaData = async (e) => {
    e.preventDefault();
    if (areaName.trim() == "" || !cityId || !rowID) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Failed while updating",
        text: "Please fill the the required fields",
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
        areaName.trim(),
        cityId,
        latitude.trim(),
        longitude.trim(),
        statusValue,
        rowID
      );
    }
  };

  //! Calling cities api...
  const callCityApi = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `${host[0].hostUrl}/api/get/data/cities`,
      });
      // console.log(response);
      if (response.status == 200) {
        setCityData(response.data.data);
      }
    } catch (error) {
      // console.log(
      //   "Something went wrong while fetching city names api: ",
      //   error
      // );
    }
  };

  useEffect(() => {
    callCityApi();
    // console.log(location.state.data);
    setRowID(location.state.data.id);
    setAreaName(location.state.data.areaName);
    setCityId(location.state.data.cityId);
    setLatitude(location.state.data.latitude);
    setLongitude(location.state.data.longitude);
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">City Area</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: " #8fbd56" }}>
              City Area
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Form
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Edit Form</h3>
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
                {/* DropDown */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom04" className="form-label">
                    Select City
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    required
                    value={cityId}
                    onChange={(e) => {
                      setCityId(e.target.value);
                    }}
                  >
                    <option disabled>Select</option>
                    {cityData.length > 0 ? (
                      cityData.map((item, index) => {
                        return <option key={index} value={item.id}>{item.cityName}</option>;
                      })
                    ) : (
                      <option></option>
                    )}
                  </select>
                  {!cityId ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please select City
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
                {/* Area Name */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Edit Area Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={areaName}
                    onChange={(e) => {
                      setAreaName(e.target.value);
                    }}
                    style={{
                      borderColor:
                        areaName.trim().length < 3 ? "red" : "#8fbd56",
                    }}
                  />
                  {areaName.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter updated Area Name
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
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: -10,
                  }}
                >
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Edit Latitude (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={latitude}
                      onChange={(e) => {
                        setLatitude(e.target.value);
                      }}
                      style={{
                        borderColor:
                          latitude.trim().length < 2 ? "red" : "#8fbd56",
                      }}
                    />
                    {latitude.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter latitude
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
                      Edit Longitude (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={longitude}
                      onChange={(e) => {
                        setLongitude(e.target.value);
                      }}
                      style={{
                        borderColor:
                          longitude.trim().length < 2 ? "red" : "#8fbd56",
                      }}
                    />
                    {longitude.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter longitude
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
                {/* Status */}
                <div className="col-md-5" style={{ marginLeft: 10 }}>
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

                {/* Button */}
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/areaTable"}>Cancel</Link>
                  </div>
                  <button className="btn btn-primary" onClick={editAreaData} disabled={btnDisable}>
                    {
                      btnDisable ?
                        <>
                          <span className="spinner-grow spinner-grow-sm mt-1 me-1" aria-hidden="true" />
                          <span role="status">Loading...</span>
                        </>
                        :
                        'Update'
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

export default AreaEditForm;
