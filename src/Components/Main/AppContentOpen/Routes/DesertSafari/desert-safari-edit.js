import React, { useState, useRef, useMemo, useEffect } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Importing Text Editor Form...
import JoditEditor from "jodit-react";

//! Importing Multi Select DropDown...
import Multiselect from "multiselect-react-dropdown";

//! Import Link from React Router Dom...
import { Link, useNavigate, useLocation } from "react-router-dom";

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

const DesertSafariEditForm = () => {
  let propsLocation = useLocation();
  let navigation = useNavigate();

  const [dealerData, setDealerData] = useState([]);
  const [areasData, setAreasData] = useState([]);

  //! Forms States...
  const [form1State, setForm1State] = useState(true);
  const [form2State, setForm2State] = useState(false);
  const [form3State, setForm3State] = useState(false);
  const [form4State, setForm4State] = useState(false);
  const [form5State, setForm5State] = useState(false);

  const [btnDisable, setBtnDisable] = useState(false);

  //! Api Data States...
  const [packagesData, setPackagesData] = useState([]);

  //! Data States...
  const [rowID, setRowID] = useState(Number);
  const [desertPhotosData, setDesertPhotosData] = useState([]);

  //! Form 1 Inputs/Selects States...
  const [desertSafariName, setDesertSafariName] = useState("");
  const [adultPrice, setAdultPrice] = useState("");
  const [childPrice, setChildPrice] = useState("");
  const [infantPrice, setInfantPrice] = useState("");
  const [discountOffer, setDiscountOffer] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [transferType, setTransferType] = useState("");
  const [dealerId, setDealerId] = useState(Number);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [status, setStatus] = useState(true);

  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState([]);

  //! Form 2 Checkboxes States...
  const [hotelPickAndDrop, setHotelPickAndDrop] = useState(true);
  const [duneBashing, setDuneBashing] = useState(true);
  const [camelRiding, setCamelRiding] = useState(true);
  const [sandBoarding, setSandBoarding] = useState(true);
  const [unlimitedRefreshment, setUnlimitedRefreshment] = useState(true);
  const [bbqDinner, setBbqDinner] = useState(true);
  const [nonVegDishes, setNonVegDishes] = useState(true);
  const [sheesha, setSheesha] = useState(true);
  const [separateWashrooms, setSeparateWashrooms] = useState(true);
  const [photography, setPhotography] = useState(true);
  const [tanuraShow, setTanuraShow] = useState(true);
  const [bellyDance, setBellyDance] = useState(true);
  const [accommodation, setAccommodation] = useState(true);
  const [welcomeDrink, setWelcomeDrink] = useState(true);
  const [tickets, setTickets] = useState(true);

  //! Form 3 States...
  const [aboutTour, setAboutTour] = useState("");
  const [highlightsOrPackagesDetails, setHighlightsOrPackagesDetails] =
    useState("");

  //! Form 4 States...
  const [inclusions, setInclusions] = useState("");
  const [impPoints, setImpPoints] = useState("");

  //! Form 5 Images States...
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imagesArr, setImagesArr] = useState([]);

  //!* Video File State...
  const [videoFile, setVideoFile] = useState(null);

  const editor = useRef(null);

  //! Function for toogle success modal after 200 response of Api...
  const toogleSuccessModal = () => {
    setDesertSafariName("");
    setAdultPrice("");
    setChildPrice("");
    setInfantPrice("");
    setDiscountOffer("");
    setStartTime("");
    setEndTime("");
    setTransferType("");
    setDealerId(Number);
    setPickupPoints([]);
    setStatus(true);

    setMetaDescription("");
    setMetaKeywords([]);

    setHotelPickAndDrop(true);
    setDuneBashing(true);
    setCamelRiding(true);
    setSandBoarding(true);
    setUnlimitedRefreshment(true);
    setBbqDinner(true);
    setNonVegDishes(true);
    setSheesha(true);
    setSeparateWashrooms(true);
    setPhotography(true);
    setTanuraShow(true);
    setBellyDance(true);

    setAccommodation(true);
    setWelcomeDrink(true);
    setTickets(true);

    setAboutTour("");
    setHighlightsOrPackagesDetails("");

    setInclusions("");
    setImpPoints("");

    setSelectedFiles(null);
    setImagesArr([]);
    setVideoFile(null);

    setRowID(Number);
    setDesertPhotosData([]);

    setForm5State(false);
    setForm4State(false);
    setForm3State(false);
    setForm2State(false);
    setForm1State(true);

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
        navigation("/desertSafariTable");
      },
    });
  };

  //! Function for uploading video into folder or saving video name into dataBase...
  const uploadVideo = async () => {
    if (videoFile == null) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Failed while updating",
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

      let apiUrl = `${host[0].hostUrl}/api/upload/video/desertSafari`;

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
    }
  };

  //! Function for uploading desert images into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("images", file);
    }

    let apiUrl = `${host[0].hostUrl}/api/upload/image/desertSafari`;

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

  //! Calling Api for updating desert safari data...
  const apiCall = async (
    desertSafariName,
    adultPrice,
    childPrice,
    infantPrice,
    discountOffer,
    startTime,
    endTime,
    transferType,
    dealerId,
    pickupPoints,
    statusValue,
    metaDescription,
    metaKeywords,
    hotelPickAndDrop,
    duneBashing,
    camelRiding,
    sandBoarding,
    unlimitedRefreshment,
    bbqDinner,
    nonVegDishes,
    sheesha,
    separateWashrooms,
    photography,
    tanuraShow,
    bellyDance,
    accommodation,
    welcomeDrink,
    tickets,
    aboutTour,
    highlightsOrPackagesDetails,
    inclusions,
    impPoints,
    id
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/put/data/desertSafari/update/byId`;
    let desertPhotosDataStatus;

    if (selectedFiles !== null) {
      desertPhotosDataStatus = "yes";
    } else {
      desertPhotosDataStatus = "no";
    }

    try {
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: {
          desertSafariName,
          adultPrice,
          childPrice,
          infantPrice,
          discountOffer,
          startTime,
          endTime,
          transferType,
          dealerId,
          pickupPoints,
          statusValue,
          metaDescription,
          metaKeywords,
          hotelPickAndDrop,
          duneBashing,
          camelRiding,
          sandBoarding,
          unlimitedRefreshment,
          bbqDinner,
          nonVegDishes,
          sheesha,
          separateWashrooms,
          photography,
          tanuraShow,
          bellyDance,
          accommodation,
          welcomeDrink,
          tickets,
          aboutTour,
          highlightsOrPackagesDetails,
          inclusions,
          impPoints,
          id,
          desertPhotosData,
          desertPhotosDataStatus,
        },
      });
      // console.log(response);
      if (response.status == 200) {
        if (selectedFiles !== null) {
          uploadImage();
        } else if (videoFile !== null) {
          uploadVideo();
        } else {
          toogleSuccessModal();
        }
      }
    } catch (error) {
      // console.log(
      //   "Something went wrong while adding data in dataBase: ",
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

  //! Form 1 Handler...
  const form1Handler = () => {
    if (
      desertSafariName.trim() == "" ||
      adultPrice.trim() == "" ||
      childPrice.trim() == "" ||
      infantPrice.trim() == "" ||
      discountOffer.trim() == "" ||
      startTime.trim() == "" ||
      endTime.trim() == "" ||
      transferType.trim() == "" ||
      !dealerId ||
      pickupPoints.length < 1
    ) {
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
      setForm1State(false);
      setForm3State(false);
      setForm4State(false);
      setForm5State(false);
      setForm2State(true);
    }
  };
  //! Form 2 Handler...
  const form2Handler = () => {
    setForm2State(false);
    setForm1State(false);
    setForm4State(false);
    setForm5State(false);
    setForm3State(true);
  };
  //! Form 3 Handler...
  const form3Handler = () => {
    if (aboutTour.trim() == "" || highlightsOrPackagesDetails.trim() == "") {
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
      setForm3State(false);
      setForm1State(false);
      setForm2State(false);
      setForm5State(false);
      setForm4State(true);
    }
  };
  //! Form 4 Handler...
  const form4Handler = () => {
    if (inclusions.trim() == "" || impPoints.trim() == "") {
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
      setForm4State(false);
      setForm1State(false);
      setForm2State(false);
      setForm3State(false);
      setForm5State(true);
    }
  };
  //! Form 5 Handler...
  const form5Handler = (e) => {
    e.preventDefault();
    if (!rowID) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed while updating",
        text: "Something went wrong, Please try again later",
        showConfirmButton: true,
        timer: 4000,
        customClass: {
          confirmButton: 'btn btn-danger'
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
        desertSafariName.trim(),
        adultPrice.trim(),
        childPrice.trim(),
        infantPrice.trim(),
        discountOffer.trim(),
        startTime.trim(),
        endTime.trim(),
        transferType.trim(),
        dealerId,
        pickupPoints,
        statusValue,
        metaDescription.trim(),
        metaKeywords,
        hotelPickAndDrop,
        duneBashing,
        camelRiding,
        sandBoarding,
        unlimitedRefreshment,
        bbqDinner,
        nonVegDishes,
        sheesha,
        separateWashrooms,
        photography,
        tanuraShow,
        bellyDance,
        accommodation,
        welcomeDrink,
        tickets,
        aboutTour,
        highlightsOrPackagesDetails,
        inclusions,
        impPoints,
        rowID
      );
    }
  };

  //! Handler for onChange for uploading images....
  const onChangeImage = (e) => {
    if (e.target.files.length < 1 || e.target.files.length > 10) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Failed while updating",
        text: "Please upload tour places photos, Maximum length of Images is 10",
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

  const fetchingAllDealers = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `${host[0].hostUrl}/api/get/data/venders`,
      });
      // console.log(response);
      if (response.status == 200) {
        setDealerData(response.data.data);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching dealers api: ", error);
    }
  };

  //! Fetching Cities Areas Api...
  const fetchingAreasApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/area`;
    let arr = [];

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log(response);
      if (response.status == 200) {
        // setAreasData(response.data.data);
        for (let i = 0; i < response.data.data.length; i++) {
          arr.push({ id: response.data.data[i].id, areaName: response.data.data[i].areaName });
        }
        setAreasData(arr);
      }
    } catch (error) {
      // console.log(`Something went wrong while fecthing area Api: `, error);
    }
  };

  useEffect(() => {
    fetchingAllDealers();
    fetchingAreasApi();

    setRowID(propsLocation.state.data.id);
    setDesertPhotosData(propsLocation.state.data.desertPhotosArray);

    setDesertSafariName(propsLocation.state.data.desertSafariName);
    setAdultPrice(propsLocation.state.data.adultPrice);
    setChildPrice(propsLocation.state.data.childPrice);
    setInfantPrice(propsLocation.state.data.infantPrice);
    setDiscountOffer(propsLocation.state.data.discountOffer);
    setStartTime(propsLocation.state.data.startTime);
    setEndTime(propsLocation.state.data.endTime);
    setTransferType(propsLocation.state.data.transferType);
    setDealerId(propsLocation.state.data.dealerId);
    // setPickupPoints(propsLocation.state.data.pickupPoints);

    setMetaDescription(propsLocation.state.data.metaDescription);
    setMetaKeywords(propsLocation.state.data.metaKeywords);

    setAboutTour(propsLocation.state.data.aboutTour);
    setHighlightsOrPackagesDetails(propsLocation.state.data.highlightsOrPackagesDetails);

    setInclusions(propsLocation.state.data.inclusions);
    setImpPoints(propsLocation.state.data.impPoints);

    // console.log("Props: ", propsLocation.state.data);
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tour Package</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Tour Package
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Form
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card wizard clearfix">
            <div className="card-header border-bottom">
              <h3 className="card-title">Edit Form</h3>
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
                      Tour Package Details & SEO
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
                      Features
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
                          form3State == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      3
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form3State == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      About Tour
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
                          form4State == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      4
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form4State == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Inclusion & Important Points
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
                          form5State == true ? "#82c035" : "#13bfa6",
                      }}
                    >
                      5
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form5State == true ? "#82c035" : "#13bfa6",
                      }}
                    >
                      Uploads Photos
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
                  Edit Tour Package Details:
                </h4>

                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Edit Tour Package Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={desertSafariName}
                      onChange={(e) => {
                        setDesertSafariName(e.target.value);
                      }}
                      style={{
                        borderColor:
                          desertSafariName.trim().length < 3
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {desertSafariName.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter tour name
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

                  {/* Adult Price */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Edit Adult Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={adultPrice}
                      onChange={(e) => {
                        setAdultPrice(e.target.value);
                      }}
                      style={{
                        borderColor:
                          adultPrice.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {adultPrice.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter adult price
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
                  {/* Child Price */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Edit Child Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={childPrice}
                      onChange={(e) => {
                        setChildPrice(e.target.value);
                      }}
                      style={{
                        borderColor:
                          childPrice.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {childPrice.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter child price
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
                  {/* Infant Price */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Edit Infant Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={infantPrice}
                      onChange={(e) => {
                        setInfantPrice(e.target.value);
                      }}
                      style={{
                        borderColor:
                          infantPrice.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {infantPrice.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter infant price
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
                      Edit Discount Offer
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={discountOffer}
                      onChange={(e) => {
                        setDiscountOffer(e.target.value);
                      }}
                      style={{
                        borderColor:
                          discountOffer.trim().length < 1
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {discountOffer.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter discount offer
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

                  {/* Start Time */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Edit Start Time
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
                        Please select start time
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
                      Edit End Time
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
                        Please select end time
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

                  {/* Multi Select */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Pickup Points
                    </label>
                    <Multiselect
                      placeholder="Select Pickup Points"
                      isObject={true}
                      showCheckbox={true}
                      onSelect={(e) => {
                        // console.log(e);
                        const arr = [];
                        for (let i = 0; i < e.length; i++) {
                          arr.push(e[i].id);
                        }
                        // console.log(arr);
                        setPickupPoints(arr);
                      }}
                      onRemove={(e) => {
                        // console.log(e);
                        const arr = [];
                        for (let i = 0; i < e.length; i++) {
                          arr.push(e[i].id);
                        }
                        // console.log(arr);
                        setPickupPoints(arr);
                      }}
                      options={areasData}
                      // selectedValues={pickupPoints}
                      hideSelectedList={!true}
                      displayValue="areaName"
                    />
                    {pickupPoints.length == 0 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select pickup points
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
                      {dealerData.length > 0 ? (
                        dealerData.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.companyName}
                            </option>
                          );
                        })
                      ) : (
                        <option></option>
                      )}
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

                  {/* DropDown */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Transfer Type
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={transferType}
                      onChange={(e) => {
                        setTransferType(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Shared</option>
                      <option>Private</option>
                      <option>None</option>
                    </select>
                    {transferType.trim().length < 3 ? (
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
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Active/Inactive
                    </label>
                    <div className="form-group" style={{ marginTop: 10 }}>
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

                <h4 style={{ color: '#8fbd56', marginBottom: -5 }}>Edit Seo Details (Optional):</h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="col-md-8">
                    <label htmlFor="validationCustom01" className="form-label">
                      Edit Meta Description (Optional)
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
                      Edit Meta Keywords (Optional)
                    </label>
                    <TagsInput className="tag-input" value={metaKeywords} onChange={(e) => { setMetaKeywords(e) }} />
                  </div>
                </div>

                {/* Button */}
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/desertSafariTable"}>Cancel</Link>
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
                  Edit Features:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Hotel Pick & Drop
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
                              setHotelPickAndDrop(!hotelPickAndDrop);
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
                            {hotelPickAndDrop == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Dune Bashing
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
                              setDuneBashing(!duneBashing);
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
                            {duneBashing == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Camel Riding
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
                              setCamelRiding(!camelRiding);
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
                            {camelRiding == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Sand Boarding
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-6"
                            defaultChecked={true}
                            onClick={() => {
                              setSandBoarding(!sandBoarding);
                            }}
                          />
                          <label
                            htmlFor="checkbox-6"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {sandBoarding == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Unlimited Refreshment
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-7"
                            defaultChecked={true}
                            onClick={() => {
                              setUnlimitedRefreshment(!unlimitedRefreshment);
                            }}
                          />
                          <label
                            htmlFor="checkbox-7"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {unlimitedRefreshment == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      BBQ Dinner
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-8"
                            defaultChecked={true}
                            onClick={() => {
                              setBbqDinner(!bbqDinner);
                            }}
                          />
                          <label
                            htmlFor="checkbox-8"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {bbqDinner == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Non Veg Dishes
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-9"
                            defaultChecked={true}
                            onClick={() => {
                              setNonVegDishes(!nonVegDishes);
                            }}
                          />
                          <label
                            htmlFor="checkbox-9"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {nonVegDishes == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Sheesha
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-10"
                            defaultChecked={true}
                            onClick={() => {
                              setSheesha(!sheesha);
                            }}
                          />
                          <label
                            htmlFor="checkbox-10"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {sheesha == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Separate Washrooms
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-11"
                            defaultChecked={true}
                            onClick={() => {
                              setSeparateWashrooms(!separateWashrooms);
                            }}
                          />
                          <label
                            htmlFor="checkbox-11"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {separateWashrooms == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Photography
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-12"
                            defaultChecked={true}
                            onClick={() => {
                              setPhotography(!photography);
                            }}
                          />
                          <label
                            htmlFor="checkbox-12"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {photography == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Tanura Show
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-13"
                            defaultChecked={true}
                            onClick={() => {
                              setTanuraShow(!tanuraShow);
                            }}
                          />
                          <label
                            htmlFor="checkbox-13"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {tanuraShow == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Belly Dance
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-14"
                            defaultChecked={true}
                            onClick={() => {
                              setBellyDance(!bellyDance);
                            }}
                          />
                          <label
                            htmlFor="checkbox-14"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {bellyDance == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Accommodation
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-15"
                            defaultChecked={true}
                            onClick={() => {
                              setAccommodation(!accommodation);
                            }}
                          />
                          <label
                            htmlFor="checkbox-15"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {accommodation == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Welcome Drink
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-16"
                            defaultChecked={true}
                            onClick={() => {
                              setWelcomeDrink(!welcomeDrink);
                            }}
                          />
                          <label
                            htmlFor="checkbox-16"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {welcomeDrink == true ? "Yes" : ""}
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
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Tickets
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-17"
                            defaultChecked={true}
                            onClick={() => {
                              setTickets(!tickets);
                            }}
                          />
                          <label
                            htmlFor="checkbox-17"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {tickets == true ? "Yes" : ""}
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
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setForm2State(false);
                      setForm3State(false);
                      setForm4State(false);
                      setForm5State(false);
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
              {/* About Tour */}
              <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                Edit About Tour:
              </h4>
              <div style={{ marginTop: 10, marginBottom: 20 }}>
                <JoditEditor
                  ref={editor}
                  value={aboutTour}
                  // config={config}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(e) => {
                    setAboutTour(e);
                  }}
                />
              </div>

              {/* Highlights Or Packages Details */}
              <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                Edit Highlights or Packages Details:
              </h4>
              <div style={{ marginTop: 10 }}>
                <JoditEditor
                  ref={editor}
                  value={highlightsOrPackagesDetails}
                  // config={config}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(e) => {
                    setHighlightsOrPackagesDetails(e);
                  }}
                />
              </div>

              {/* Button */}
              <div className="col-12" style={{ marginTop: 30 }}>
                <div
                  className="btn btn-default"
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    setForm3State(false);
                    setForm4State(false);
                    setForm5State(false);
                    setForm1State(false);
                    setForm2State(true);
                  }}
                >
                  Previous
                </div>
                <div className="btn btn-primary" onClick={form3Handler}>
                  Next
                </div>
              </div>
            </div>

            {/* Form 4 */}
            <div
              className="card-body"
              style={{ display: form4State == true ? "block" : "none" }}
            >
              {/* Inclusions */}
              <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                Edit Inclusions:
              </h4>
              <div style={{ marginTop: 10, marginBottom: 20 }}>
                <JoditEditor
                  ref={editor}
                  value={inclusions}
                  // config={config}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(e) => {
                    setInclusions(e);
                  }}
                />
              </div>

              {/* Important Points to Consider */}
              <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                Edit Important Points to Consider:
              </h4>
              <div style={{ marginTop: 10 }}>
                <JoditEditor
                  ref={editor}
                  value={impPoints}
                  // config={config}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(e) => {
                    setImpPoints(e);
                  }}
                />
              </div>

              {/* Button */}
              <div className="col-12" style={{ marginTop: 30 }}>
                <div
                  className="btn btn-default"
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    setForm4State(false);
                    setForm5State(false);
                    setForm1State(false);
                    setForm2State(false);
                    setForm3State(true);
                  }}
                >
                  Previous
                </div>
                <div className="btn btn-primary" onClick={form4Handler}>
                  Next
                </div>
              </div>
            </div>

            {/* Form 5 */}
            <div
              className="card-body"
              style={{ display: form5State == true ? "block" : "none" }}
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
                    Upload Tour Photos:
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
                         accept="image/png, image/jpeg"
                          required
                          multiple
                          onChange={onChangeImage}
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
                          <span style={{ color: "red", fontWeight: "500" }}>
                            {" "}
                            (Upload Photos if you want to update it)
                          </span>
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
                    Upload Tour Video (Optional)
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
                          <span style={{ color: "red", fontWeight: "500" }}>
                            {" "}
                            (Upload Video if you want to update it)
                          </span>
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
                      setForm5State(false);
                      setForm1State(false);
                      setForm2State(false);
                      setForm3State(false);
                      setForm4State(true);
                    }}
                  >
                    Previous
                  </div>
                  <button className="btn btn-primary" onClick={form5Handler} disabled={btnDisable}>
                    {
                      btnDisable ?
                        <>
                          <span className="spinner-grow spinner-grow-sm mt-1 me-1" aria-hidden="true" />
                          <span role="status">Loading...</span>
                        </>
                        :
                        'Update & Finish'
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

export default DesertSafariEditForm;
