import React, { useEffect, useState } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const CarTypeForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [carTypeName, setCarTypeName] = useState("");
  const [abbrevation, setAbbrevation] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(true);

  const [btnDisable, setBtnDisable] = useState(false);

  //* Image State...
  const [file, setFile] = useState(null);

  //! Function for uploading image into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = `${host[0].hostUrl}/api/upload/image/carTypes`;

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
          text: "Car Type is added successfully",
          showConfirmButton: true,
          timer: 2000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          willClose: () => {
            setBtnDisable(false);
            setCarTypeName("");
            setAbbrevation("");
            setCategory("Cars");
            setFile(null);
            setStatus(true);
            navigation("/carTypeTable");
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

  //! Calling Api for adding new car type data...
  const apiCall = async (carTypeName, typeAbbrevation, category, status) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/carTypes`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { carTypeName, typeAbbrevation, category, status },
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
  const addNewCarType = async (e) => {
    e.preventDefault();
    if (carTypeName.trim() == "" || file == null || abbrevation.trim() == "" || category.trim() == "") {
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
      apiCall(carTypeName.trim(), abbrevation.trim(), category.trim(), statusValue);
    }
  };

  useEffect(() => {
    setCategory('Cars');
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Car Type</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Car Type
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Car Type
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Car Type</h3>
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
                <div className="d-flex">
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Car Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carTypeName}
                      onChange={(e) => {
                        setCarTypeName(e.target.value);
                      }}
                      style={{
                        borderColor:
                          carTypeName.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {carTypeName.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Car Type Name
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
                      Abbrevation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={abbrevation}
                      onChange={(e) => {
                        setAbbrevation(e.target.value);
                      }}
                      style={{
                        borderColor:
                          abbrevation.trim().length < 2 ? "red" : "#8fbd56",
                      }}
                    />
                    {abbrevation.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Car Type Abbrevation
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
                    Upload Type Image
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
                      Please upload type image
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
                  <label htmlFor="validationCustom04" className="form-label">
                    Select Category
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    required
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option disabled>Select</option>
                    <option>Cars</option>
                    <option>Yachts</option>
                    <option>Tour Packages</option>
                    <option>Driver Services</option>
                  </select>
                  {category.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please select category
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
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/carTypeTable"}>Cancel</Link>
                  </div>
                  <button className="btn btn-primary" onClick={addNewCarType} disabled={btnDisable}>
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

export default CarTypeForm;