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

import TagsInput from "react-tagsinput";

//! Importing Upload Icon...
import uploadIcon from "../../../../../assets/icons/upload.png";

const QuadBikeForm = () => {
  let navigation = useNavigate();

  //! Forms States...
  const [form1State, setForm1State] = useState(true);
  const [form2State, setForm2State] = useState(false);
  const [form3State, setForm3State] = useState(false);

  const [btnDisable, setBtnDisable] = useState(false);

  //! Form 1 Inputs/Selects States...
  const [bikeName, setBikeName] = useState("");
  const [dealerId, setDealerId] = useState(Number);
  const [bikeType, setBikeType] = useState("");
  const [seats, setSeats] = useState("");
  const [doors, setDoors] = useState("");
  const [funDesertActivities, setFunDesertActivities] = useState("");
  const [safetyGearAndTraining, setSafetyGearAndTraining] = useState("");
  const [foodAndBeverages, setFoodAndBeverages] = useState("");
  const [status, setStatus] = useState(true);

  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState([]);

  //! Form 2 Inputs States...
  const [pricePerHour, setPricePerHour] = useState("");
  const [priceTwoHour, setPriceTwoHour] = useState("");
  const [snacksPrice, setSnacksPrice] = useState("");
  const [vatPercentage, setVatPercentage] = useState("");
  const [snacksDescription, setSnacksDescription] = useState("");

  //! Form 5 Images States...
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imagesArr, setImagesArr] = useState([]);

  //!* Video File State...
  const [videoFile, setVideoFile] = useState(null);

  const [dealerData, setDealerData] = useState([]);

  //! Function for toogle success modal after 200 response of Api...
  const toogleSuccessModal = () => {
    setBikeName("");
    setDealerId(Number);
    setBikeType("");
    setSeats("");
    setDoors("");
    setFunDesertActivities("");
    setSafetyGearAndTraining("");
    setFoodAndBeverages("");
    setStatus(true);

    setMetaDescription("");
    setMetaKeywords([]);

    setPricePerHour("");
    setPriceTwoHour("");
    setSnacksPrice("");
    setVatPercentage("");
    setSnacksDescription("");

    setSelectedFiles(null);
    setImagesArr([]);
    setVideoFile(null);

    // setForm3State(false);
    // setForm4State(false);
    // setForm3State(false);
    // setForm2State(false);
    // setForm1State(true);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Congraulations!",
      text: "Bike added successfully",
      showConfirmButton: true,
      timer: 2000,
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      willClose: () => {
        setBtnDisable(false);
        navigation("/quadBikeTable");
      },
    });
  };

  //! Function for uploading video into folder or saving video name into dataBase...
  const uploadVideo = async () => {
    if (videoFile == null) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Cannot process your entry!",
        text: "Video not found please try again later",
        showConfirmButton: true,
        timer: 3000,
        customClass: {
          confirmButton: 'btn btn-info'
        },
        willClose: () => {
          setBtnDisable(false);
        }
      });
    } else {
      const formData = new FormData();
      formData.append("videoFile", videoFile);

      let apiUrl = `${host[0].hostUrl}/api/upload/video/quadBiking`;

      try {
        let response = await axios({
          method: "POST",
          url: apiUrl,
          data: formData,
        });
        // console.log(response);
        if (response.status == 200) {
          toogleSuccessModal();
        }
      } catch (error) {
        // console.log("Something went wrong while uploading video: ", error);
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
    }
  };

  //! Function for uploading bike images into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("images", file);
    }

    let apiUrl = `${host[0].hostUrl}/api/upload/image/quadBiking`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      // console.log(response);
      if (response.status == 200) {
        if (videoFile !== null) {
          uploadVideo();
        } else {
          toogleSuccessModal();
        }
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

  //! Calling Api for adding new bike details data...
  const apiCall = async (
    bikeName,
    dealerId,
    bikeType,
    seats,
    doors,
    funDesertActivities,
    safetyGearAndTraining,
    foodAndBeverages,
    statusValue,
    pricePerHour,
    priceTwoHour,
    snacksPrice,
    vatPercentage,
    snacksDescription,
    metaDescription,
    metaKeywords
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/quadBiking`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          bikeName,
          dealerId,
          bikeType,
          seats,
          doors,
          funDesertActivities,
          safetyGearAndTraining,
          foodAndBeverages,
          statusValue,
          pricePerHour,
          priceTwoHour,
          snacksPrice,
          vatPercentage,
          snacksDescription,
          metaDescription,
          metaKeywords
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

  //! Form 1 Handler...
  const form1Handler = () => {
    if (
      bikeName.trim() == "" ||
      !dealerId ||
      bikeType.trim() == "" ||
      seats.trim() == "" ||
      doors.trim() == "" ||
      funDesertActivities.trim() == "" ||
      safetyGearAndTraining.trim() == "" ||
      foodAndBeverages.trim() == ""
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
      setForm1State(false);
      setForm3State(false);
      setForm2State(true);
    }
  };
  //! Form 2 Handler...
  const form2Handler = () => {
    if (
      pricePerHour.trim() == "" ||
      priceTwoHour.trim() == "" ||
      snacksPrice.trim() == "" ||
      vatPercentage.trim() == "" ||
      snacksDescription.trim() == ""
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
      setForm2State(false);
      setForm1State(false);
      setForm3State(true);
    }
  };

  //! Form 3 Handler...
  const form3Handler = (e) => {
    e.preventDefault();
    if (
      imagesArr.length < 1 ||
      imagesArr.length > 10 ||
      selectedFiles == null
    ) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Cannot process your entry!",
        text: "Please upload Bike photos, Maximum length of Bike Images is 10",
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
        bikeName.trim(),
        dealerId,
        bikeType.trim(),
        seats.trim(),
        doors.trim(),
        funDesertActivities.trim(),
        safetyGearAndTraining.trim(),
        foodAndBeverages.trim(),
        statusValue,
        pricePerHour.trim(),
        priceTwoHour.trim(),
        snacksPrice.trim(),
        vatPercentage.trim(),
        snacksDescription.trim(),
        metaDescription.trim(),
        metaKeywords
      );
    }
  };

  //! Handler for onChange for uploading images....
  const onChangeImage = (e) => {
    if (e.target.files.length < 1 || e.target.files.length > 10) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Cannot process your entry!",
        text: "Please upload Bike photos, Maximum length of Bike Images is 10",
        showConfirmButton: true,
        timer: 3000,
        customClass: {
          confirmButton: 'btn btn-info'
        },
      });
    } else {
      let files = e.target.files;
      setSelectedFiles(files);

      let filesArr = [];
      for (let i = 0; i < files.length; i++) {
        filesArr.push(files[i]);
      }
      setImagesArr(filesArr);
    }
  };

  const callingDealersApi = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `${host[0].hostUrl}/api/get/data/venders`,
      });
      // console.log(response);
      if (response.status == 200) {
        setDealerData(response.data.data);
        setDealerId(response.data.data[0].id);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching dealers api: ", error);
    }
  };

  useEffect(() => {
    callingDealersApi();
    setBikeType("Buggy");
    setSeats("1");
    setDoors("1");
    setFunDesertActivities("Yes");
    setSafetyGearAndTraining("Yes");
    setFoodAndBeverages("No");
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quad Biking</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Quad Biking
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Quad Bike
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card wizard clearfix">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Quad Bike</h3>
            </div>
            {/* Steps */}
            <div
              className="steps clearfix border-bottom"
              style={{ backgroundColor: "none" }}
            >
              <ul role="tablist">
                <li
                  role="tab"
                  className="first current"
                  aria-disabled="false"
                  aria-selected="true"
                >
                  <a id="wizard1-t-0" aria-controls="wizard1-p-0">
                    <span
                      className="number"
                      style={{
                        backgroundColor:
                          form1State == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      1
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form1State == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Bike Details & SEO
                    </span>
                  </a>
                </li>
                <li
                  role="tab"
                  className="done"
                  aria-disabled="false"
                  aria-selected="false"
                >
                  <a id="wizard1-t-1" aria-controls="wizard1-p-1">
                    <span
                      className="number"
                      style={{
                        backgroundColor:
                          form2State == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      2
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form2State == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Prices & Snacks
                    </span>
                  </a>
                </li>
                <li
                  role="tab"
                  className="last done"
                  aria-disabled="false"
                  aria-selected="false"
                >
                  <a id="wizard1-t-2" aria-controls="wizard1-p-2">
                    <span
                      className="number"
                      style={{
                        backgroundColor:
                          form3State == true ? "#82c035" : "#13bfa6",
                      }}
                    >
                      3
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form3State == true ? "#82c035" : "#13bfa6",
                      }}
                    >
                      Uplaod Bike Photos
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Form 1*/}
            <div
              className="card-body"
              style={{ display: form1State == true ? "block" : "none" }}
            >
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                  Bike Details:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Bike Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={bikeName}
                      onChange={(e) => {
                        setBikeName(e.target.value);
                      }}
                      style={{
                        borderColor:
                          bikeName.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {bikeName.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter bike name
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
                  {/* DropDown */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Dealer Company
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={dealerId}
                      onChange={(e) => {
                        setDealerId(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      {dealerData.length > 0
                        ? dealerData.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.companyName}
                            </option>
                          );
                        })
                        : ""}
                    </select>
                    {dealerId.length < 1 ? (
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Bike Type
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={bikeType}
                      onChange={(e) => {
                        setBikeType(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Buggy</option>
                      <option>Sports</option>
                    </select>
                    {bikeType.trim().length < 3 ? (
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Seats
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={seats}
                      onChange={(e) => {
                        setSeats(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                    {seats.trim().length < 1 ? (
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Doors
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={doors}
                      onChange={(e) => {
                        setDoors(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                    {doors.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select doors
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Fun Desert Activities
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={funDesertActivities}
                      onChange={(e) => {
                        setFunDesertActivities(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    {funDesertActivities.trim().length < 2 ? (
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Safety Gear And Training
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={safetyGearAndTraining}
                      onChange={(e) => {
                        setSafetyGearAndTraining(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    {safetyGearAndTraining.trim().length < 2 ? (
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Food And Beverages
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={foodAndBeverages}
                      onChange={(e) => {
                        setFoodAndBeverages(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    {foodAndBeverages.trim().length < 2 ? (
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
                </div>

                <h4 style={{ color: '#8fbd56', marginBottom: -5 }}>Seo Details (Optional):</h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="col-md-8">
                    <label htmlFor="validationCustom01" className="form-label">
                      Meta Description (Optional)
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={metaDescription}
                      onChange={(e) => {
                        setMetaDescription(e.target.value);
                      }}
                      style={{
                        resize: 'none',
                        height: 150,
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Meta Keywords (Optional)
                    </label>
                    <TagsInput className="tag-input" value={metaKeywords} onChange={(e) => { setMetaKeywords(e) }} />
                  </div>
                </div>

                {/* Button */}
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/quadBikeTable"}>Cancel</Link>
                  </div>
                  <div className="btn btn-primary" onClick={form1Handler}>
                    Next
                  </div>
                </div>
              </form>
            </div>

            {/* Form 2 */}
            <div
              className="card-body"
              style={{ display: form2State == true ? "block" : "none" }}
            >
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                  Prices & Snacks:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Per Hour Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={pricePerHour}
                      onChange={(e) => {
                        setPricePerHour(e.target.value);
                      }}
                      style={{
                        borderColor:
                          pricePerHour.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {pricePerHour.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter per hour price
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
                      Two Hour Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={priceTwoHour}
                      onChange={(e) => {
                        setPriceTwoHour(e.target.value);
                      }}
                      style={{
                        borderColor:
                          priceTwoHour.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {priceTwoHour.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter 2 hour price
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
                      Snacks Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={snacksPrice}
                      onChange={(e) => {
                        setSnacksPrice(e.target.value);
                      }}
                      style={{
                        borderColor:
                          snacksPrice.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {snacksPrice.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter snacks price
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
                      Vat Percentage
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={vatPercentage}
                      onChange={(e) => {
                        setVatPercentage(e.target.value);
                      }}
                      style={{
                        borderColor:
                          vatPercentage.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {vatPercentage.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter vat percentage
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
                  <div className="col-md-12">
                    <label htmlFor="validationCustom01" className="form-label">
                      Snacks Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={snacksDescription}
                      onChange={(e) => {
                        setSnacksDescription(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        height: 70,
                        borderColor:
                          snacksDescription.trim().length < 5
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {snacksDescription.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter snacks description
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

                {/* Button */}
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setForm2State(false);
                      setForm3State(false);
                      setForm1State(true);
                    }}
                  >
                    Previous
                  </div>
                  <div className="btn btn-primary" onClick={form2Handler}>
                    Next
                  </div>
                </div>
              </form>
            </div>

            {/* Form 3 */}
            <div
              className="card-body"
              style={{ display: form3State == true ? "block" : "none" }}
            >
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  // flexDirection: "column",
                }}
              >
                {/* Photos Upload */}
                <div className="col-md-6">
                  <h4
                    style={{
                      color: "#8fbd56",
                      // marginBottom: -5,
                      paddingLeft: 10,
                    }}
                  >
                    Upload Bike Photos:
                  </h4>
                  <div style={{ backgroundColor: "none" }}>
                    <div
                      className="col-md-12"
                      style={{ backgroundColor: "none" }}
                    >
                      <div className="fileBox">
                        <img src={uploadIcon} className="uploadIcon" />
                        <p className="uplaodBtnText">
                          Drag and drop a file here or click
                        </p>
                        <input
                          type="file"
                          className="customImageBtn"
                          id="validationCustom02"
                          // accept=" image/jpeg, image/png, text/html, application/zip, text/css, text/js"
                          required
                          multiple
                          onChange={onChangeImage}
                           accept="image/png, image/jpeg"
                        />
                      </div>
                    </div>

                    <div
                      className="col-md-12"
                      style={{
                        marginTop: 10,
                        // backgroundColor: "red",
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent:'center',
                      }}
                    >
                      {imagesArr.length > 0 ? (
                        imagesArr.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(item)}
                                style={{
                                  height: 80,
                                  width: 130,
                                  borderRadius: 10,
                                  margin: 5,
                                  cursor: "pointer",
                                }}
                                alt={item.name}
                                title={item.name}
                              />
                            </div>
                          );
                        })
                      ) : (
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "gray",
                            paddingLeft: 10,
                          }}
                        >
                          No file chosen
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Video Uplaod */}
                <div className="col-md-6">
                  <h4
                    style={{
                      color: "#8fbd56",
                      paddingLeft: 10,
                    }}
                  >
                    Upload Bike Video (Optional)
                  </h4>
                  <div style={{ backgroundColor: "none" }}>
                    <div
                      className="col-md-12"
                      style={{ backgroundColor: "none" }}
                    >
                      <div className="fileBox">
                        <img src={uploadIcon} className="uploadIcon" />
                        <p className="uplaodBtnText">
                          Drag and drop a file here or click
                        </p>
                        <input
                          type="file"
                          className="customImageBtn"
                          id="validationCustom02"
                          name="video"
                          accept=".mp4, .mkv"
                          required
                          onChange={(e) => {
                            setVideoFile(e.target.files[0]);
                          }}
                        />
                      </div>
                      {videoFile == null ? (
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "gray",
                            paddingLeft: 10,
                            marginTop: 10,
                          }}
                        >
                          No file chosen
                        </p>
                      ) : (
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "#8fbd56",
                            paddingLeft: 10,
                            marginTop: 10,
                          }}
                        >
                          {videoFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div
                  className="col-12"
                  style={{ marginTop: 30, marginLeft: 20 }}
                >
                  <div
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setForm3State(false);
                      setForm1State(false);
                      setForm2State(true);
                    }}
                  >
                    Previous
                  </div>
                  <button className="btn btn-primary" onClick={form3Handler} disabled={btnDisable}>
                    {
                      btnDisable ?
                        <>
                          <span className="spinner-grow spinner-grow-sm mt-1 me-1" aria-hidden="true" />
                          <span role="status">Loading...</span>
                        </>
                        :
                        'Submit & Finish'
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

export default QuadBikeForm;
