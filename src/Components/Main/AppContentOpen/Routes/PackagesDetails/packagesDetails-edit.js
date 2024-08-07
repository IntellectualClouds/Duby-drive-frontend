import React, { useEffect, useState } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Import Link from React Router Dom...
import { Link, useNavigate, useLocation } from "react-router-dom";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";;

const PackageDetailsEditForm = () => {
  let location = useLocation();
  let navigation = useNavigate();

  //! Form States...
  const [packageId, setPackageId] = useState(Number);
  const [packageFeatures, setPackageFeatures] = useState("");
  const [rowID, setRowID] = useState(Number);

  const [btnDisable, setBtnDisable] = useState(false);

  //? Api Data State...
  const [packagesDataState, setPackagesDataState] = useState([]);

  //! Calling Api for update package details data...
  const apiCall = async (packageId, packageFeatures, id) => {
    let apiUrl = `${host[0].hostUrl}/api/put/data/packagesDetails/update/byId`;

    try {
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: { packageId, packageFeatures, id },
      });
      // console.log(response);
      if (response.status == 200) {
        // alert("data updated successfully");
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
            setPackageId(Number);
            setPackageFeatures("");
            setRowID(Number);
            navigation("/packageDetailsTable");
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

  //! Fucntion for update data in dataBase...
  const editPackageDetailsData = async (e) => {
    e.preventDefault();
    if (!packageId || packageFeatures.trim() == "" || !rowID) {
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
      setBtnDisable(true);
      apiCall(packageId, packageFeatures.trim(), rowID);
    }
  };

  //! Fetching Package Type Api...
  const packagesApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/packages`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log(response.data.data);
      if (response.status == 200) {
        setPackagesDataState(response.data.data);
      }
    } catch (error) {
      // console.log(`Something went wrong while fecthing packages Api: `, error);
    }
  };

  useEffect(() => {
    packagesApi();
    setRowID(location.state.data.id);
    setPackageId(location.state.data.packageId);
    setPackageFeatures(location.state.data.packageFeature);
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Package Details</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Package Details
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
                  <label htmlFor="validationCustom04" className="form-label">
                    Select Package
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    required
                    value={packageId}
                    onChange={(e) => {
                      setPackageId(e.target.value);
                    }}
                  >
                    <option disabled>Select</option>
                    {packagesDataState.length > 0 ? (
                      packagesDataState.map((item, index) => {
                        return <option key={index} value={item.id}>{item.packageName}</option>;
                      })
                    ) : (
                      <option></option>
                    )}
                  </select>
                  {!packageId ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please select Package
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
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Edit Package Features
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={packageFeatures}
                    onChange={(e) => {
                      setPackageFeatures(e.target.value);
                    }}
                    style={{
                      resize: "none",
                      height: 35,
                      borderColor:
                        packageFeatures.trim().length < 5 ? "red" : "#8fbd56",
                    }}
                  />
                  {packageFeatures.trim().length < 5 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter updated Package Features
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
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/packageDetailsTable"}>Cancel</Link>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={editPackageDetailsData}
                    disabled={btnDisable}
                  >
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

export default PackageDetailsEditForm;
