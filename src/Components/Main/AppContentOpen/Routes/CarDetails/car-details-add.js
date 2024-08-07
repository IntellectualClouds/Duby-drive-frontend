import React, { useEffect, useState, useRef } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Text Editor Form...
import JoditEditor from "jodit-react";

//! Importing Multi Select DropDown...
import Multiselect from "multiselect-react-dropdown";

//! Importing Age Numbers...
import numbers from "../../../../../dummyData/Numbers/numbers";

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

const CarDetailsForm = () => {
  let navigation = useNavigate();

  //! Forms States...
  const [form1State, setForm1State] = useState(true);
  const [form2State, setForm2State] = useState(false);
  const [form3State, setForm3State] = useState(false);
  const [form4State, setForm4State] = useState(false);
  const [form5State, setForm5State] = useState(false);

  const [btnDisable, setBtnDisable] = useState(false);

  //! Api Data States...
  const [carBrandData, setCarBrandData] = useState([]);
  const [carTypeData, setCarTypeData] = useState([]);
  const [carFeaturesData, setCarFeaturesData] = useState([]);
  const [dealerCompanyData, setDealerCompanyData] = useState([]);

  const [carDetailsInfo, setCarDetailsInfo] = useState(null);

  //! Form 1 Inputs/Selects States...
  const [carModelNumber, setCarModelNumber] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carBrandId, setCarBrandId] = useState(Number);
  const [carTypeId, setCarTypeId] = useState(Number);
  const [dealerCompanyId, setDealerCompanyId] = useState(Number);
  const [status, setStatus] = useState(true);
  const [carDescription, setCarDescription] = useState("");

  //* Featured Image State...
  const [file, setFile] = useState(null);

  //* Multiple Features State...
  const [multipleFeaturesState, setMultipleFeaturesState] = useState([]);

  //! Form 2 Inputs/Selects States...
  const [rentalAvailableFor, setRentalAvailableFor] = useState("");
  const [carDoors, setCarDoors] = useState("");
  const [carSeats, setCarSeats] = useState("");
  const [luggage, setLuggage] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [gccSpecs, setGccSpecs] = useState("");
  const [autoTransmission, setAutoTransmission] = useState("");

  //! Form 3 Inputs/Selects States...
  const [interiorColor, setInteriorColor] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [additionalMilageCharges, setAdditionalMilageCharges] = useState("");
  const [toolsCharges, setToolsCharges] = useState("");
  const [additionalDriverInsurance, setAdditionalDriverInsurance] =
    useState("");
  const [insuranceType, setInsuranceType] = useState("");
  //* Table Form States...
  const [perDayMilagelimit, setPerDayMilageLimit] = useState("");
  const [perDayRentalCost, setPerDayRentalCost] = useState("");

  const [weeklyMilageLimit, setWeeklyMilageLimit] = useState("");
  const [weeklyRentalCost, setWeeklyRentalCost] = useState("");

  const [monthlyMilageLimit, setMonthlyMilageLimit] = useState("");
  const [monthlyRentalCost, setMonthLyRentalCost] = useState("");

  const [discountPercentage, setDiscountPercentage] = useState("");
  const [offerExpiryDate, setOfferExpiryDate] = useState("");

  //! Form 4 Inputs States...
  const [minimumDriverAge, setMinimumDriverAge] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [refundedIn, setRefundedIn] = useState("");

  const [metaKeywords, setMetaKeywords] = useState([]);
  const [metaDescription, setMetaDescription] = useState("");

  //! Form 5 Images States...
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imagesArr, setImagesArr] = useState([]);

  //!* Video File State...
  const [videoFile, setVideoFile] = useState(null);

  const editor = useRef(null);

  //! Age Numbers State...
  const [ageNumbers, setAgeNumbers] = useState(numbers);

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

      let apiUrl = `${host[0].hostUrl}/api/upload/video/carDetails`;

      try {
        let response = await axios({
          method: "POST",
          url: apiUrl,
          data: formData,
        });
        // console.log(response);
        if (response.status == 200) {
          setCarModelNumber("");
          setCarLicensePlate("");
          setCarBrandId("");
          setCarTypeId("");
          setMultipleFeaturesState([]);
          setDealerCompanyData("");
          setStatus(true);
          setCarDescription("");

          setRentalAvailableFor("");
          setCarDoors("");
          setCarSeats("");
          setLuggage("");
          setFuelType("");
          setGccSpecs("");
          setAutoTransmission("");

          setInteriorColor("");
          setExteriorColor("");
          setAdditionalMilageCharges("");
          setToolsCharges("");
          setAdditionalDriverInsurance("");
          setInsuranceType("");

          setPerDayMilageLimit("");
          setPerDayRentalCost("");
          setWeeklyMilageLimit("");
          setWeeklyRentalCost("");
          setMonthlyMilageLimit("");
          setMonthLyRentalCost("");

          setDiscountPercentage("");
          setOfferExpiryDate("");

          setMinimumDriverAge("");
          setSecurityDeposit("");
          setRefundedIn("");

          setMetaDescription("");
          setMetaKeywords([]);

          setSelectedFiles(null);
          setImagesArr([]);
          setVideoFile(null);

          // setForm1State(true);
          // setForm2State(false);
          // setForm3State(false);
          // setForm4State(false);
          // setForm5State(false);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Congraulations!",
            text: "Car Details is added successfully",
            showConfirmButton: true,
            timer: 2000,
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            willClose: () => {
              setBtnDisable(false);
              navigation("/carDetailsTable");
            },
          });
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

  //! Function for uploading car images into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("images", file);
    }

    let apiUrl = `${host[0].hostUrl}/api/upload/image/carDetails`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });
      // console.log(response);
      if (response.status == 200) {
        if (videoFile !== null) {
          uploadVideo();
        } else {
          setCarModelNumber("");
          setCarLicensePlate("");
          setCarBrandId("");
          setCarTypeId("");
          setMultipleFeaturesState([]);
          setDealerCompanyData("");
          setStatus(true);
          setCarDescription("");

          setRentalAvailableFor("");
          setCarDoors("");
          setCarSeats("");
          setLuggage("");
          setFuelType("");
          setGccSpecs("");
          setAutoTransmission("");

          setInteriorColor("");
          setExteriorColor("");
          setAdditionalMilageCharges("");
          setToolsCharges("");
          setAdditionalDriverInsurance("");
          setInsuranceType("");

          setPerDayMilageLimit("");
          setPerDayRentalCost("");
          setWeeklyMilageLimit("");
          setWeeklyRentalCost("");
          setMonthlyMilageLimit("");
          setMonthLyRentalCost("");

          setDiscountPercentage("");
          setOfferExpiryDate("");

          setMinimumDriverAge("");
          setSecurityDeposit("");
          setRefundedIn("");

          setMetaDescription("");
          setMetaKeywords([]);

          setSelectedFiles(null);
          setImagesArr([]);
          setVideoFile(null);

          // setForm1State(true);
          // setForm2State(false);
          // setForm3State(false);
          // setForm4State(false);
          // setForm5State(false);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Congraulations!",
            text: "Car Details is added successfully",
            showConfirmButton: true,
            timer: 2000,
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            willClose: () => {
              setBtnDisable(false);
              navigation("/carDetailsTable");
            },
          });
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

  //! Function for uploading image into folder...
  const uploadFeaturedImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = `${host[0].hostUrl}/api/upload/image/carDetails/featured`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      // console.log(response);
      if (response.status == 200) {
        uploadImage();
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

  //! Calling Api for adding new car details data...
  const apiCall = async (
    carModelNo,
    carLicense,
    carBrandId,
    carTypeId,
    dealerCompanyId,
    carFeatures,
    rentalAvailableFor,
    carDoors,
    carSeats,
    carLuggage,
    carFuelType,
    gccSpecs,
    autoTransmission,
    carInteriorColor,
    carExteriorColor,
    additionalMilageCharges,
    carToolsCharges,
    additionalDriverInsurance,
    insuranceType,
    perDayMilagelimit,
    perDayRentalCost,
    weeklyMilageLimit,
    weeklyRentalCost,
    monthlyMilageLimit,
    monthlyRentalCost,
    discountOffer,
    offerExpiryDate,
    minimumDriverAge,
    securityDeposit,
    refundedIn,
    metaDescription,
    metaKeywords,
    status,
    carDescription
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/carDetails`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          carModelNo,
          carLicense,
          carBrandId,
          carTypeId,
          dealerCompanyId,
          carFeatures,
          rentalAvailableFor,
          carDoors,
          carSeats,
          carLuggage,
          carFuelType,
          gccSpecs,
          autoTransmission,
          carInteriorColor,
          carExteriorColor,
          additionalMilageCharges,
          carToolsCharges,
          additionalDriverInsurance,
          insuranceType,
          perDayMilagelimit,
          perDayRentalCost,
          weeklyMilageLimit,
          weeklyRentalCost,
          monthlyMilageLimit,
          monthlyRentalCost,
          discountOffer,
          offerExpiryDate,
          minimumDriverAge,
          securityDeposit,
          refundedIn,
          metaDescription,
          metaKeywords,
          status,
          carDescription,
        },
      });
      // console.log(response);
      if (response.status == 200) {
        // uploadImage();
        uploadFeaturedImage();
      }
    } catch (error) {
      console.log(
        "Something went wrong while adding data in dataBase: ",
        error
      );
      if (error.response) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Cannot process your entry!",
          text: `${error.response.data.message}`,
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
      else {
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

  //! Form 1 Handler...
  const checkForm1Validations = () => {
    if (
      carModelNumber.trim() == "" ||
      carLicensePlate.trim() == "" ||
      !carBrandId ||
      !carTypeId ||
      !dealerCompanyId ||
      multipleFeaturesState.length < 1 ||
      carDescription.trim() == "" ||
      file == null
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
      setForm4State(false);
      setForm5State(false);
      setForm2State(true);
    }
  };
  //! Form 2 Handler...
  const checkForm2Validations = () => {
    if (
      rentalAvailableFor.trim() == "" ||
      carDoors.trim() == "" ||
      carSeats.trim() == "" ||
      luggage.trim() == "" ||
      fuelType.trim() == "" ||
      gccSpecs.trim() == "" ||
      autoTransmission.trim() == ""
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
      setForm4State(false);
      setForm5State(false);
      setForm3State(true);
    }
  };
  //! Form 3 Handler...
  const checkForm3Validations = () => {
    if (
      additionalMilageCharges.trim() == "" ||
      toolsCharges.trim() == "" ||
      additionalDriverInsurance.trim() == "" ||
      insuranceType.trim() == "" ||
      perDayMilagelimit.trim() == "" ||
      perDayRentalCost.trim() == "" ||
      weeklyMilageLimit.trim() == "" ||
      weeklyRentalCost.trim() == "" ||
      monthlyMilageLimit.trim() == "" ||
      monthlyRentalCost.trim() == "" ||
      discountPercentage.trim() == "" ||
      offerExpiryDate.trim() == ""
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
      setForm3State(false);
      setForm2State(false);
      setForm1State(false);
      setForm5State(false);
      setForm4State(true);
    }
  };
  //! Form 4 Handler...
  const checkForm4Validations = () => {
    if (
      minimumDriverAge.trim() == "" ||
      securityDeposit.trim() == "" ||
      refundedIn.trim() == ""
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
      setForm2State(false);
      setForm3State(false);
      setForm4State(false);
      setForm5State(true);
    }
  };
  //! Form 5 Handler or add data handler...
  const checkForm5Validations = (e) => {
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
        text: "Please upload car photos, Maximum length of Car Images is 10",
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
        carModelNumber.trim(),
        carLicensePlate.trim(),
        carBrandId,
        carTypeId,
        dealerCompanyId,
        multipleFeaturesState,
        rentalAvailableFor.trim(),
        carDoors.trim(),
        carSeats.trim(),
        luggage.trim(),
        fuelType.trim(),
        gccSpecs.trim(),
        autoTransmission.trim(),
        interiorColor.trim(),
        exteriorColor.trim(),
        additionalMilageCharges.trim(),
        toolsCharges.trim(),
        additionalDriverInsurance.trim(),
        insuranceType.trim(),
        perDayMilagelimit.trim(),
        perDayRentalCost.trim(),
        weeklyMilageLimit.trim(),
        weeklyRentalCost.trim(),
        monthlyMilageLimit.trim(),
        monthlyRentalCost.trim(),
        discountPercentage.trim(),
        offerExpiryDate.trim(),
        minimumDriverAge.trim(),
        securityDeposit.trim(),
        refundedIn.trim(),
        metaDescription.trim(),
        metaKeywords,
        statusValue,
        carDescription.trim()
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
        text: "Please upload car photos, Maximum length of Car Images is 10",
        showConfirmButton: true,
        timer: 3000,
        customClass: {
          confirmButton: 'btn btn-info'
        },
      });
    } else {
      let files = e.target.files;
      // setSelectedFiles(files[0]);
      setSelectedFiles(files);

      // console.log("foles", files);

      let filesArr = [];
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);
        filesArr.push(files[i]);
      }
      // console.log(filesArr);
      // setFile(filesArr);
      setImagesArr(filesArr);
    }
  };

  //! Calling car brand api...
  const callBrandApi = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `${host[0].hostUrl}/api/get/data/carBrands`,
      });
      // console.log(response);
      if (response.status == 200) {
        setCarBrandId(response.data.data[0].id);
        setCarBrandData(response.data.data);
      }
    } catch (error) {
      // console.log(
      //   "Something went wrong while fetching car brand names api: ",
      //   error
      // );
    }
  };

  //! Calling car type api...
  const callCarTypeApi = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `${host[0].hostUrl}/api/get/data/carTypes`,
      });
      // console.log(response);
      if (response.status == 200) {
        setCarTypeId(response.data.data[0].id);
        setCarTypeData(response.data.data);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching car type api:", error);
    }
  };

  //! Calling car features api...
  const callFeaturesApi = async () => {
    let arr = [];
    try {
      let response = await axios({
        method: "GET",
        url: `${host[0].hostUrl}/api/get/data/carFeatures`,
      });
      // console.log(response);
      if (response.status == 200) {
        for (let i = 0; i < response.data.data.length; i++) {
          // console.log(response.data.data[i].carFeature);
          arr.push(response.data.data[i].carFeature);
          // let data = response.data.data[i].carFeature;
          // carFeaturesData.push(response.data.data[i].carFeature);
        }
        // console.log(arr);
        setCarFeaturesData(arr);
      }
    } catch (error) {
      // console.log(
      //   "Something went wrong while fetching car features api: ",
      //   error
      // );
    }
  };

  //! Calling car dealers api...
  const callDealersApi = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `${host[0].hostUrl}/api/get/data/venders`,
      });
      // console.log(response);
      if (response.status == 200) {
        setDealerCompanyData(response.data.data);
        setDealerCompanyId(response.data.data[0].id);
      }
    } catch (error) {
      // console.log(
      //   "Something went wrong while fetching car brand names api: ",
      //   error
      // );
    }
  };

  //! Calling car details info api...
  const fetchingCarDetailsInfoApi = async (dealerId) => {
    try {
      let response = await axios({
        method: "POST",
        url: `${host[0].hostUrl}/api/check/dealer/car/limit`,
        data: { dealerId }
      });
      // console.log(response);
      if (response.status == 200) {
        setCarDetailsInfo(response.data.data);
      }
    } catch (error) {
      // console.log(
      //   "Something went wrong while fetching car brand names api: ",
      //   error
      // );
    }
  };

  useEffect(() => {
    callBrandApi();
    callCarTypeApi();
    callFeaturesApi();
    callDealersApi();
    setMinimumDriverAge(ageNumbers[0]);
    setRefundedIn("7 Days");

    setRentalAvailableFor("1");
    setCarDoors("2");
    setCarSeats("2");
    setLuggage("Yes");
    setFuelType("Petrol");
    setGccSpecs("Yes");
    setAutoTransmission("Yes");

    setAdditionalDriverInsurance("No");
    setInsuranceType("Basic");
  }, []);

  useEffect(() => {
    if (dealerCompanyId) {
      fetchingCarDetailsInfoApi(dealerCompanyId);
    }
  }, [dealerCompanyId]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Car Details</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Car Details
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Car Details
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card wizard clearfix">
            <div className="card-header border-bottom" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 className="card-title">Add New Car Details</h3>
              {
                carDetailsInfo !== null ?
                  <h3 className="card-title">Added Cars: {carDetailsInfo.length} || Allowed Cars: {carDetailsInfo.allowed} || Active Cars: {carDetailsInfo.activeCars}</h3>
                  :
                  ''
              }
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
                      Car Details
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
                      Car Specs
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
                      Pricing and Extras
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
                          form4State == true ? "#82c035" : " #13bfa6",
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
                      Requirements & SEO
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
                      Uplaod Car Photos
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
                  Car Details:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="col-md-3">
                    <label htmlFor="validationCustom02" className="form-label">
                      Upload Featured Image
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
                        Please upload car featured image
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
                      Car Model No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carModelNumber}
                      onChange={(e) => {
                        setCarModelNumber(e.target.value);
                      }}
                      style={{
                        borderColor:
                          carModelNumber.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {carModelNumber.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter car model number
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
                      Car License Plate
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carLicensePlate}
                      onChange={(e) => {
                        setCarLicensePlate(e.target.value);
                      }}
                      style={{
                        borderColor:
                          carLicensePlate.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {carLicensePlate.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter car license
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
                      Select Car Brand
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={carBrandId}
                      onChange={(e) => {
                        setCarBrandId(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      {carBrandData.length > 0 ? (
                        carBrandData.map((item, index) => {
                          return <option key={index} value={item.id}>{item.brandName}</option>;
                        })
                      ) : (
                        <option></option>
                      )}
                    </select>
                    {carBrandId.length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select car brand
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
                      Select Car Type
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={carTypeId}
                      onChange={(e) => {
                        setCarTypeId(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      {carTypeData.length > 0 ? (
                        carTypeData.map((item, index) => {
                          return <option key={index} value={item.id}>{item.carType}</option>;
                        })
                      ) : (
                        <option></option>
                      )}
                    </select>
                    {carTypeId.length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select car type
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
                  {/* Multi Select */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Car Features
                    </label>
                    <Multiselect
                      placeholder="Search Car Features"
                      isObject={false}
                      showCheckbox={true}
                      onSelect={(e) => {
                        // console.log(e);
                        setMultipleFeaturesState(e);
                      }}
                      onRemove={(e) => {
                        // console.log(e);
                        setMultipleFeaturesState(e);
                      }}
                      options={carFeaturesData}
                      // selectedValues={}
                      hideSelectedList={false}
                    />
                    {multipleFeaturesState.length == 0 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select Car Features
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
                      Select Dealer Company
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={dealerCompanyId}
                      onChange={async (e) => {
                        setDealerCompanyId(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      {dealerCompanyData.length > 0 ? (
                        dealerCompanyData.map((item, index) => {
                          return <option key={index} value={item.id}>{item.companyName}</option>;
                        })
                      ) : (
                        <option></option>
                      )}
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
                  {/* Status */}
                  <div
                    className="col-md-2"
                    style={{ backgroundColor: "none", marginLeft: 10 }}
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
                  {/* description */}
                  {/* <div className="col-md-12">
                    <label htmlFor="validationCustom01" className="form-label">
                      Car Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carDescription}
                      onChange={(e) => {
                        setCarDescription(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        height: 70,
                        borderColor:
                          carDescription.trim().length < 5 ? "red" : "#8fbd56",
                      }}
                    />
                    {carDescription.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Car Description
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

                  {/* car description */}
                  <div className="col-md-12" style={{ marginTop: 10, marginBottom: 20 }}>
                    <h4 style={{ color: "#8fbd56" }}>Car Description:</h4>
                    <JoditEditor
                      ref={editor}
                      value={carDescription}
                      onChange={(e) => {
                        setCarDescription(e);
                      }}
                    />
                  </div>
                </div>

                {/* Button */}
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/carDetailsTable"}>Cancel</Link>
                  </div>
                  {/* <div className="btn btn-primary" onClick={addNewCarType}> */}
                  <div
                    className="btn btn-primary"
                    onClick={checkForm1Validations}
                  >
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
                  Car Specs Details:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {/* rentalAvailableFor */}
                      <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Rental Available For
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={rentalAvailableFor}
                      onChange={(e) => {
                        setRentalAvailableFor(e.target.value);
                      }}
                    // size={3}
                    >
                      {ageNumbers.length > 0 ? (
                        ageNumbers.map((item, index) => {
                          return <option key={index}> {item}</option>;
                        })
                      ) : (
                        <option></option>
                      )}
                    </select>
                    {rentalAvailableFor.trim().length < 1 ? (
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
                      Select Car Doors
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={carDoors}
                      onChange={(e) => {
                        setCarDoors(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                    {carDoors.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select car doors
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
                      Select Car Seats
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={carSeats}
                      onChange={(e) => {
                        setCarSeats(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                      <option>24</option>
                      <option>25</option>
                      <option>26</option>
                      <option>27</option>
                      <option>28</option>
                      <option>29</option>
                      <option>30</option>
                      <option>31</option>
                      <option>32</option>
                      <option>33</option>
                      <option>34</option>
                      <option>35</option>
                      <option>36</option>
                      <option>37</option>
                      <option>38</option>
                      <option>39</option>
                      <option>40</option>
                      <option>41</option>
                      <option>42</option>
                      <option>43</option>
                      <option>44</option>
                      <option>45</option>
                      <option>46</option>
                      <option>47</option>
                      <option>48</option>
                      <option>49</option>
                      <option>50</option>
                    </select>
                    {carSeats.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select car seats
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
                      Luggage
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={luggage}
                      onChange={(e) => {
                        setLuggage(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    {luggage.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select luggage
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
                      Select Fuel Type
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={fuelType}
                      onChange={(e) => {
                        setFuelType(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Petrol</option>
                      <option>Diesel</option>
                      <option>Electirc</option>
                    </select>
                    {fuelType.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select fuel type
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
                      GSS Specs
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={gccSpecs}
                      onChange={(e) => {
                        setGccSpecs(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    {gccSpecs.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select at least 1 option
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
                      Auto Transmission
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={autoTransmission}
                      onChange={(e) => {
                        setAutoTransmission(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    {autoTransmission.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select at least 1 option
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
                  <div
                    className="btn btn-primary"
                    onClick={checkForm2Validations}
                  >
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
                {/* Extras */}
                <div className="col-md-6">
                  {/* <h4 style={{ color: "#8fbd56", marginBottom: -5 }}> */}
                  <h4 style={{ color: "#8fbd56" }}>Extra Details:</h4>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      backgroundColor: "none",
                    }}
                  >
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Additional Milage Charges
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        required
                        value={additionalMilageCharges}
                        onChange={(e) => {
                          setAdditionalMilageCharges(e.target.value);
                        }}
                        style={{
                          borderColor:
                            additionalMilageCharges.trim().length < 1
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                      {additionalMilageCharges.trim().length < 1 ? (
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                          style={{
                            color: "red",
                            fontWeight: "400",
                            paddingLeft: 10,
                          }}
                        >
                          Please enter milage charges
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
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Salik / Toll Charges
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        required
                        value={toolsCharges}
                        onChange={(e) => {
                          setToolsCharges(e.target.value);
                        }}
                        style={{
                          borderColor:
                            toolsCharges.trim().length < 1 ? "red" : "#8fbd56",
                        }}
                      />
                      {toolsCharges.trim().length < 1 ? (
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                          style={{
                            color: "red",
                            fontWeight: "400",
                            paddingLeft: 10,
                          }}
                        >
                          Please enter toll charges
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
                      <label
                        htmlFor="validationCustom04"
                        className="form-label"
                      >
                        Additional Driver Insurance
                      </label>
                      <select
                        className="form-select"
                        id="validationCustom04"
                        required
                        value={additionalDriverInsurance}
                        onChange={(e) => {
                          setAdditionalDriverInsurance(e.target.value);
                        }}
                      >
                        <option disabled>Select</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                      {additionalDriverInsurance.trim().length < 2 ? (
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                          style={{
                            color: "red",
                            fontWeight: "400",
                            paddingLeft: 10,
                          }}
                        >
                          Please select at least 1 option
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
                      <label
                        htmlFor="validationCustom04"
                        className="form-label"
                      >
                        Insurance Type
                      </label>
                      <select
                        className="form-select"
                        id="validationCustom04"
                        required
                        value={insuranceType}
                        onChange={(e) => {
                          setInsuranceType(e.target.value);
                        }}
                      >
                        <option disabled>Select</option>
                        <option>Basic</option>
                        <option>Comprehensive</option>
                      </select>
                      {insuranceType.trim().length < 3 ? (
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                          style={{
                            color: "red",
                            fontWeight: "400",
                            paddingLeft: 10,
                          }}
                        >
                          Please select Insurance type
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
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Interior Color
                      </label>
                      <input
                        type="color"
                        id="validationCustom01"
                        required
                        value={interiorColor}
                        onChange={(e) => {
                          setInteriorColor(e.target.value);
                        }}
                        style={{ width: 90 }}
                      />
                      {interiorColor.trim().length < 2 ? (
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            paddingLeft: 5,
                            marginTop: -5,
                          }}
                        >
                          *
                        </label>
                      ) : (
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                          style={{
                            color: "#8fbd56",
                            fontWeight: "400",
                            paddingLeft: 5,
                            marginTop: -3,
                          }}
                        >
                          Looks good
                        </label>
                      )}
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Exterior Color
                      </label>
                      <input
                        type="color"
                        id="validationCustom01"
                        required
                        value={exteriorColor}
                        onChange={(e) => {
                          setExteriorColor(e.target.value);
                        }}
                        style={{ width: 90 }}
                      />
                      {exteriorColor.trim().length < 2 ? (
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            paddingLeft: 5,
                            marginTop: -5,
                          }}
                        >
                          *
                        </label>
                      ) : (
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                          style={{
                            color: "#8fbd56",
                            fontWeight: "400",
                            paddingLeft: 5,
                            marginTop: -3,
                          }}
                        >
                          Looks good
                        </label>
                      )}
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                  </div>
                </div>
                {/* Pricing */}
                <div className="col-md-6">
                  {/* <h4 style={{ color: "#8fbd56", marginBottom: -5 }}> */}
                  <h4 style={{ color: "#8fbd56", marginBottom: 20 }}>
                    Pricing Details:
                  </h4>
                  <table
                    id="editable-file-datatable"
                    className="table editable-table table-nowrap table-bordered table-edit wp-100"
                  >
                    <thead>
                      <tr>
                        <th>Rental Period</th>
                        <th>Milage Limit (KM)</th>
                        <th>Rental Cost (AED)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr data-id="0">
                        <th data-field="id">Day Basis</th>
                        <td data-field="name">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={perDayMilagelimit}
                            onChange={(e) => {
                              setPerDayMilageLimit(e.target.value);
                            }}
                            style={{
                              borderColor:
                                perDayMilagelimit.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                        <td data-field="age">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={perDayRentalCost}
                            onChange={(e) => {
                              setPerDayRentalCost(e.target.value);
                            }}
                            style={{
                              borderColor:
                                perDayRentalCost.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                      </tr>
                      <tr data-id="1">
                        <th data-field="id">Weekly</th>
                        <td data-field="name">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={weeklyMilageLimit}
                            onChange={(e) => {
                              setWeeklyMilageLimit(e.target.value);
                            }}
                            style={{
                              borderColor:
                                weeklyMilageLimit.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                        <td data-field="age">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={weeklyRentalCost}
                            onChange={(e) => {
                              setWeeklyRentalCost(e.target.value);
                            }}
                            style={{
                              borderColor:
                                weeklyRentalCost.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                      </tr>
                      <tr data-id="2">
                        <th data-field="id">Monthly</th>
                        <td data-field="name">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={monthlyMilageLimit}
                            onChange={(e) => {
                              setMonthlyMilageLimit(e.target.value);
                            }}
                            style={{
                              borderColor:
                                monthlyMilageLimit.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                        <td data-field="age">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={monthlyRentalCost}
                            onChange={(e) => {
                              setMonthLyRentalCost(e.target.value);
                            }}
                            style={{
                              borderColor:
                                monthlyRentalCost.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                      </tr>
                      <tr data-id="3">
                        <th data-field="id">Discount Offer</th>
                        <td data-field="name">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={discountPercentage}
                            placeholder="20% Discount"
                            onChange={(e) => {
                              setDiscountPercentage(e.target.value);
                            }}
                            style={{
                              borderColor:
                                discountPercentage.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                        <td data-field="age">
                          <input
                            type="date"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={offerExpiryDate}
                            onChange={(e) => {
                              setOfferExpiryDate(e.target.value);
                            }}
                            style={{
                              borderColor:
                                offerExpiryDate.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Button */}
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setForm3State(false);
                      setForm4State(false);
                      setForm1State(false);
                      setForm5State(false);
                      setForm2State(true);
                    }}
                  >
                    Previous
                  </div>
                  {/* <div className="btn btn-primary" onClick={addNewCarType}> */}
                  <div
                    className="btn btn-primary"
                    onClick={checkForm3Validations}
                  >
                    Next
                  </div>
                </div>
              </form>
            </div>

            {/* Form 4 */}
            <div
              className="card-body"
              style={{ display: form4State == true ? "block" : "none" }}
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
                  Driver Requirements:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Security Deposit
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={securityDeposit}
                      onChange={(e) => {
                        setSecurityDeposit(e.target.value);
                      }}
                      style={{
                        borderColor:
                          securityDeposit.trim().length < 1 ? "red" : "#8fbd56",
                      }}
                    />
                    {securityDeposit.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter security deposit
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
                  <div className="col-md-4">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Refunded In
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={refundedIn}
                      onChange={(e) => {
                        setRefundedIn(e.target.value);
                      }}
                    >
                      <option>7 Days</option>
                      <option>14 Days</option>
                      <option>21 Days</option>
                      <option>28 Days</option>
                      <option>1 Month</option>
                      <option>3 Month</option>
                      <option>5 Month</option>
                    </select>
                    {refundedIn.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select at least 1 option
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
                  {/* Age DropDown */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Minimum Driver Age
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={minimumDriverAge}
                      onChange={(e) => {
                        setMinimumDriverAge(e.target.value);
                      }}
                    // size={3}
                    >
                      {ageNumbers.length > 0 ? (
                        ageNumbers.map((item, index) => {
                          return <option key={index}> {item}</option>;
                        })
                      ) : (
                        <option></option>
                      )}
                    </select>
                    {minimumDriverAge.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select minimum age
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
                  <div
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setForm4State(false);
                      setForm2State(false);
                      setForm1State(false);
                      setForm5State(false);
                      setForm3State(true);
                    }}
                  >
                    Previous
                  </div>
                  {/* <div className="btn btn-primary" onClick={addNewCarType}> */}
                  <div
                    className="btn btn-primary"
                    onClick={checkForm4Validations}
                  >
                    Next
                  </div>
                </div>
              </form>
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
                    Upload Car Photos:
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
                          // className="form-control"
                          className="customImageBtn"
                          id="validationCustom02"
                          // name="files"
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
                              {/* <p style={{ fontWeight: "500" }}>{item.name}</p> */}
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
                    Upload Car Video (Optional)
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
                      setForm5State(false);
                      setForm1State(false);
                      setForm2State(false);
                      setForm3State(false);
                      setForm4State(true);
                    }}
                  >
                    Previous
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={checkForm5Validations}
                    disabled={btnDisable}
                  >
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

export default CarDetailsForm;
