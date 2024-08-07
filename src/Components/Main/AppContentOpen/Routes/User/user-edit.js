import React, { useEffect, useState } from "react";
import "../../../../../index.css";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate, useLocation } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const UserEditForm = () => {
  let location = useLocation();
  let navigation = useNavigate();

  //! Form States...
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userIP, setUserIP] = useState("");
  const [status, setStatus] = useState(true);
  const [rowID, setRowID] = useState(Number);

  const [btnDisable, setBtnDisable] = useState(false);

  //* Image State...
  const [file, setFile] = useState(null);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Function for getting user ip...
  const callApiforGettingIP = async () => {
    // ! Api Calling for getting user ip...
    let apiUrl = "https://api.ipify.org";

    try {
      let response = await fetch(apiUrl);
      // console.log(await response.text());

      if (response.status == 200) {
        let userip = await response.text();
        setUserIP(userip);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching IP api: ", error);
    }
  };

  //! Function for uploading image into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = `${host[0].hostUrl}/api/upload/image/user`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      // console.log(response);
      if (response.status == 200) {
        setModalStatus(true);
        setModalData({
          heading: "Congraulations!",
          title: "User data is updated successfully",
          title2: "Please wait",
          statusCode: "200",
        });
        setTimeout(() => {
          setModalData(null);
          setModalStatus(false);
          setBtnDisable(false);
          setUserFullName("");
          setUserEmail("");
          setUserRole("");
          setUserIP("");
          setStatus(true);
          setFile(null);
          setRowID(Number);

          navigation("/userTable");
        }, 2000);
      }
    } catch (error) {
      // console.log("Something went wrong while uploading image: ", error);
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your update entry!",
        title:
          "Something went wrong from server site make sure your network is connected",
        title2: "Make sure you entered correct details",
        statusCode: "500",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
        setBtnDisable(false);
      }, 5000);
    }
  };

  //! Calling Api for adding new user data...
  const apiCall = async (fullName, email, role, ip, status, id) => {
    let apiUrl = `${host[0].hostUrl}/api/update/user/data`;

    try {
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: {
          fullName,
          email,
          role,
          ip,
          status,
          id,
        },
      });
      // console.log(response);
      if (response.status == 200) {
        if (file !== null) {
          uploadImage();
        } else {
          setModalStatus(true);
          setModalData({
            heading: "Congraulations!",
            title: "User data is updated successfully",
            title2: "Please wait",
            statusCode: "200",
          });
          setTimeout(() => {
            setModalData(null);
            setModalStatus(false);
            setBtnDisable(false);
            setUserFullName("");
            setUserEmail("");
            setUserRole("");
            setUserIP("");
            setStatus(true);
            setFile(null);
            setRowID(Number);

            navigation("/userTable");
          }, 2000);
        }
      }
    } catch (error) {
      // console.log(
      //   "Something went wrong while adding user data in dataBase: ",
      //   error
      // );
      // alert(error.response.data.message);
      if (error.response) {
        setModalStatus(true);
        setModalData({
          heading: "Error: Cannot process your update entry!",
          title: error.response.data.message,
          title2: "Please enter correct details",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
          setBtnDisable(false);
        }, 5000);
      } else {
        setModalStatus(true);
        setModalData({
          heading: "Error: Cannot process your update entry!",
          title:
            "Something went wrong from server site make sure your network is connected",
          title2: "Make sure you entered correct details",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
          setBtnDisable(false);
        }, 5000);
      }
    }
  };

  //! Fucntion for edit user data in dataBase...
  const editUserData = async (e) => {
    e.preventDefault();
    if (
      userFullName.trim() == "" ||
      userEmail.trim() == "" ||
      userRole.trim() == ""
    ) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your update entry!",
        title: "All fields are required",
        title2: "Upload profile picture if you want to update it",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else if (userFullName.trim().length < 3 || userRole.trim().length < 3) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your update entry!",
        title: "Please enter valid details",
        title2: "Upload profile picture if you want to update it",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else {
      let statusValue;
      if (status == true) {
        statusValue = "active";
      } else {
        statusValue = "inActive";
      }
      setBtnDisable(true);
      apiCall(
        userFullName.trim(),
        userEmail.trim(),
        userRole.trim(),
        userIP,
        statusValue,
        rowID
      );

      e.preventDefault();
    }
  };

  useEffect(() => {
    // console.log(location.state.data);
    callApiforGettingIP();

    setRowID(location.state.data.id);
    setUserFullName(location.state.data.userName);
    setUserEmail(location.state.data.userEmail);
    setUserRole(location.state.data.userRole);
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">User</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: " #8fbd56" }}>
              User
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
                {/* Full Name */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Edit Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={userFullName}
                    onChange={(e) => {
                      setUserFullName(e.target.value);
                    }}
                    style={{
                      borderColor:
                        userFullName.trim().length < 3 ? "red" : "#8fbd56",
                    }}
                  />
                  {userFullName.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please edit user full name
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
                {/* Upload Profile Picture */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    Upload Profile Picture
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
                      Upload profile picture if you want to update it
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
                {/* User Role */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom04" className="form-label">
                    Select Role
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    required
                    value={userRole}
                    onChange={(e) => {
                      setUserRole(e.target.value);
                    }}
                  >
                    <option disabled>Select</option>
                    <option>User</option>
                    <option>Dealer</option>
                  </select>
                  {userRole.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please select role
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
                <div
                  className="col-md-3"
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

                {/* Button */}
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/userTable"}>Cancel</Link>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      editUserData(e);
                    }}
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

      <div
        className="modal fade show customStyle"
        id="modalToggle"
        aria-modal="true"
        role="dialog"
        style={{
          // display: modalStatus == true ? "block" : "none",
          // position: "absolute",
          // backgroundColor: "red",
          display: "block",
          top: modalStatus == true ? "0%" : "-100%",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{
            backgroundColor: "none",
            display: "flex",
            alignItems: "start",
          }}
        >
          <div className="modal-content">
            <button
              aria-label="Close"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                setModalStatus(false);
                setModalData(null);
              }}
              style={{ position: "absolute", right: 10, top: 5 }}
            >
              <span aria-hidden="true">×</span>
            </button>
            {modalStatus == true ? (
              <div
                className="modal-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={modalData.statusCode == "200" ? successIcon : errorIcon}
                  style={{ marginTop: 10, height: 45, width: 45 }}
                />
                <h4
                  style={{
                    color: modalData.statusCode == "200" ? "#13bfa6" : "red",
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  {modalData.heading}
                </h4>
                <p style={{ textAlign: "center" }}>{modalData.title}</p>
                <p style={{ textAlign: "center", marginTop: -10 }}>
                  {modalData.title2}
                </p>
                {modalData.statusCode == "200" ? (
                  <button
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setModalStatus(false);
                      setModalData(null);
                    }}
                    style={{ width: 120 }}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setModalStatus(false);
                      setModalData(null);
                    }}
                    style={{ width: 120 }}
                  >
                    Close
                  </button>
                )}
              </div>
            ) : (
              <div
                className="modal-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h4
                  style={{ color: "red", textAlign: "center", marginTop: 20 }}
                >
                  Error
                </h4>
                <p style={{ textAlign: "center" }}>Something went wrong</p>
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setModalStatus(false);
                    setModalData(null);
                  }}
                  style={{ width: 120 }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditForm;
