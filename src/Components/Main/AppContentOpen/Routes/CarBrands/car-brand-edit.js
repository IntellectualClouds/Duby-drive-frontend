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

const CarBrandEditForm = () => {
  let location = useLocation();
  let navigation = useNavigate();

  //! Form States...
  const [brandName, setBrandName] = useState("");
  const [status, setStatus] = useState(true);
  const [brandDescription, setBrandDescription] = useState("");
  const [descriptionStatus, setDescriptionStatus] = useState(true);
  const [rowID, setRowID] = useState(Number);

  const [btnDisable, setBtnDisable] = useState(false);

  //* Image State...
  const [file, setFile] = useState(null);

  //! Function for uploading image into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = `${host[0].hostUrl}/api/upload/image/carBrands`;

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
          text: "Record updated successfully",
          showConfirmButton: true,
          timer: 2000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          willClose: () => {
            setBtnDisable(false);
            setBrandName("");
            setFile(null);
            setStatus(true);
            setBrandDescription("");
            setDescriptionStatus(true);
            setRowID(Number);
            navigation("/carBrandTable");
          },
        });
      }
    } catch (error) {
      // console.log("Something went wrong while uploading image: ", error);
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

  //! Calling Api for edit car brand data...
  const apiCall = async (
    carBrandName,
    status,
    description,
    descriptionStatus,
    id
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/put/data/carBrands/update/byId`;

    try {
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: { carBrandName, status, description, descriptionStatus, id },
      });
      // console.log(response);
      if (response.status == 200) {
        if (file !== null) {
          uploadImage();
        } else {
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
              setBrandName("");
              setFile(null);
              setStatus(true);
              setBrandDescription("");
              setDescriptionStatus(true);
              setRowID(Number);
              navigation("/carBrandTable");
            },
          });
        }
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
  const editCarBrandData = async (e) => {
    e.preventDefault();
    if (brandName.trim() == "" || !rowID || brandDescription.trim() == "") {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Failed while updating",
        text: "Please fill the the required fields or upload image if you want to update it",
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
        brandName.trim(),
        statusValue,
        brandDescription.trim(),
        descriptionStatus,
        rowID
      );
    }
  };

  useEffect(() => {
    // console.log(location.state.data);
    setRowID(location.state.data.id);
    setBrandName(location.state.data.brandName);
    setBrandDescription(location.state.data.brandDescription);
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Car Brands</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: " #8fbd56" }}>
              Car Brands
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
                  backgroundColor: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Edit Brand Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={brandName}
                    onChange={(e) => {
                      setBrandName(e.target.value);
                    }}
                    style={{
                      borderColor:
                        brandName.trim().length < 3 ? "red" : "#8fbd56",
                    }}
                  />
                  {brandName.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter updated Car Brand Name
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
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    Upload Brand Logo
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
                      {/* Please upload Car Brand logo */}
                      Upload brand logo if you want to update it
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
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Edit Brand Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={brandDescription}
                    onChange={(e) => {
                      setBrandDescription(e.target.value);
                    }}
                    style={{
                      resize: "none",
                      height: 80,
                      borderColor:
                        brandDescription.trim().length < 5 ? "red" : "#8fbd56",
                    }}
                  />
                  {brandDescription.trim().length < 5 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter updated Brand Description
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
                <div style={{ display: "flex" }}>
                  {/* Status */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
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
                  {/* Status */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Description
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
                              setDescriptionStatus(!descriptionStatus);
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
                            {descriptionStatus == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/carBrandTable"}>Cancel</Link>
                  </div>
                  <button className="btn btn-primary" onClick={editCarBrandData} disabled={btnDisable}>
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

export default CarBrandEditForm;