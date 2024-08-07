import React, { useEffect, useState } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Importing dummy data...
import countryList from "../../../../../dummyData/Countries/countries";
import deliveryAndPickupList from "../../../../../dummyData/Delivery&Pickup/delivery-pickup";
import languagesList from "../../../../../dummyData/Languages/languages";
import paymentModesList from "../../../../../dummyData/Payment-Modes/payment-modes";

//! Importing Multi Select DropDown...
import Multiselect from "multiselect-react-dropdown";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

import TagsInput from "react-tagsinput";

const DealerForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);

  const [btnDisable, setBtnDisable] = useState(false);

  //! Data States...
  const [countries, setCountries] = useState(countryList);
  const [deliveryAndPickupData, setDeliveryAndPickupData] = useState(deliveryAndPickupList);
  const [languagesData, setLanguagesData] = useState(languagesList);
  const [paymentModesData, setPaymentModesData] = useState(paymentModesList);

  //? Api Data State...
  const [packagesData, setPackagesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [areasData, setAreasData] = useState([]);

  //! Form 1 States...
  const [dealerCompanyName, setDealerCompanyName] = useState("");
  const [dealerEmailAddress, setDealerEmailAddress] = useState("");
  const [dealerContactNumber, setDealerContactNumber] = useState("");
  const [dealerWhatsappNumber, setDealerWhatsappNumber] = useState("");
  const [dealerNationality, setDealerNationality] = useState("");
  const [packageId, setPackageId] = useState(Number);
  const [expiryDate, setExpiryDate] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [dealerDateOfBirth, setDealerDateOfBirth] = useState("");
  const [dealerEmiratesId, setDealerEmiratesId] = useState("");
  const [dealerLicenseNumber, setDealerLicenseNumber] = useState("");
  const [dealerVatNumber, setDealerVatNumber] = useState("");
  const [dealerMapLink, setDealerMapLink] = useState("");
  const [dealerCities, setDealerCities] = useState([]);

  const [deliveryAndPickup, setDeliveryAndPickup] = useState([]);
  const [languageSpoken, setLanguageSpoken] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);
  const [fastDeliveryLocations, setFastDeliveryLocations] = useState([]);

  const [dealerDescription, setDealerDescription] = useState("");
  const [dealerAddress, setDealerAddress] = useState("");
  const [status, setStatus] = useState(true);

  //* Image State...
  const [file, setFile] = useState(null);

  //! Form 2 States...
  const [faceBookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState([]);

  //! Form 3 States...
  const [vatDocFile, setVatDocFile] = useState(null);
  const [ejariDocFile, setEjariDocFile] = useState(null);
  const [insuranceDocFile, setInsuranceDocFile] = useState(null);
  const [idCard, setIdCard] = useState(null);

  //! Function for uploading id card pdf into folder...
  const uploadingIdCardPdf = async () => {
    const formData = new FormData();
    formData.append("idCardFile", idCard);

    let apiUrl = `${host[0].hostUrl}/api/upload/pdf/venders/idCardPdf`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      // console.log(response);
    } catch (error) {
      // console.log("Something went wrong while uploading pdf: ", error);
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

  //! Function for uploading insurance pdf into folder...
  const uploadingInsurancePdf = async () => {
    const formData = new FormData();
    formData.append("insuranceFile", insuranceDocFile);

    let apiUrl = `${host[0].hostUrl}/api/upload/pdf/venders/insurancePdf`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      // console.log(response);
    } catch (error) {
      // console.log("Something went wrong while uploading pdf: ", error);
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

  //! Function for uploading ejari pdf into folder...
  const uploadingEjariPdf = async () => {
    const formData = new FormData();
    formData.append("ejariFile", ejariDocFile);

    let apiUrl = `${host[0].hostUrl}/api/upload/pdf/venders/ejariPdf`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      // console.log(response);
    } catch (error) {
      // console.log("Something went wrong while uploading pdf: ", error);
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

  //! Function for uploading vat pdf into folder...
  const uploadingVatPdf = async () => {
    const formData = new FormData();
    formData.append("vatFile", vatDocFile);

    let apiUrl = `${host[0].hostUrl}/api/upload/pdf/venders/vatPdf`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      // console.log(response);
    } catch (error) {
      // console.log("Something went wrong while uploading pdf: ", error);
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
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = `${host[0].hostUrl}/api/upload/image/venders`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      // console.log(response);
      if (response.status == 200) {
        if (vatDocFile !== null) {
          uploadingVatPdf();
        }
        if (ejariDocFile !== null) {
          uploadingEjariPdf();
        }
        if (insuranceDocFile !== null) {
          uploadingInsurancePdf();
        }
        if (idCard !== null) {
          uploadingIdCardPdf();
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Congraulations!",
          text: "Dealer added successfully",
          showConfirmButton: true,
          timer: 2000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          willClose: () => {
            setBtnDisable(false);
            setDealerCompanyName("");
            setDealerEmailAddress("");
            setFile(null);
            setDealerContactNumber("");
            setDealerWhatsappNumber("");
            setDealerNationality("");
            setPackageId(Number);
            setExpiryDate("");
            setTotalDays("");
            setDealerDateOfBirth("");
            setDealerEmiratesId("");
            setDealerLicenseNumber("");
            setDealerVatNumber("");
            setDealerMapLink("");
            setDealerCities([]);
            setDeliveryAndPickup([]);
            setLanguageSpoken([]);
            setPaymentModes([]);
            setFastDeliveryLocations([]);
            setDealerDescription("");
            setDealerAddress("");
            setStatus(true);

            setVatDocFile(null);
            setEjariDocFile(null);
            setInsuranceDocFile(null);
            setIdCard(null);

            setFacebookUrl("");
            setInstagramUrl("");
            setTwitterUrl("");
            setYoutubeUrl("");
            setTiktokUrl("");
            setLinkedInUrl("");

            setMetaDescription("");
            setMetaKeywords([]);

            navigation("/dealerTable");
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

  //! Calling Api for adding new car dealer data...
  const apiCall = async (
    companyName,
    emailAddress,
    contactNumber,
    whatsAppNumber,
    nationality,
    packageId,
    expiryDate,
    totalDays,
    dateOfBirth,
    emiratesId,
    licenseNumber,
    vatNumber,
    dealerMapLink,
    cities,
    deliveryAndPickup,
    languageSpoken,
    paymentModes,
    fastDeliveryLocations,
    description,
    address,
    status,
    faceBookUrl,
    instagramUrl,
    twitterUrl,
    youtubeUrl,
    tiktokUrl,
    linkedinUrl,
    metaDescription,
    metaKeywords
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/vender`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          companyName,
          emailAddress,
          contactNumber,
          whatsAppNumber,
          nationality,
          packageId,
          expiryDate,
          totalDays,
          dateOfBirth,
          emiratesId,
          licenseNumber,
          vatNumber,
          dealerMapLink,
          cities,
          deliveryAndPickup,
          languageSpoken,
          paymentModes,
          fastDeliveryLocations,
          description,
          address,
          status,
          faceBookUrl,
          instagramUrl,
          twitterUrl,
          youtubeUrl,
          tiktokUrl,
          linkedinUrl,
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

  //! Function for checking form 1 Validations...
  const form1CheckValidations = async () => {
    if (
      dealerCompanyName.trim() == "" ||
      dealerEmailAddress.trim() == "" ||
      file == null ||
      dealerContactNumber.trim() == "" ||
      dealerWhatsappNumber.trim() == "" ||
      dealerNationality.trim() == "" ||
      !packageId ||
      dealerMapLink.trim() == "" ||
      dealerCities.length < 1 ||
      deliveryAndPickup.length < 1 ||
      languageSpoken.length < 1 ||
      paymentModes.length < 1 ||
      fastDeliveryLocations.length < 1 ||
      dealerDescription.trim() == "" ||
      dealerAddress.trim() == ""
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
    } else if (
      dealerCompanyName.trim().length < 3 ||
      dealerEmailAddress.trim().length < 5 ||
      dealerContactNumber.trim().length < 9 ||
      dealerWhatsappNumber.trim().length < 9 ||
      dealerNationality.trim().length < 2 ||
      !packageId ||
      dealerMapLink.trim().length < 5 ||
      dealerCities.length < 1 ||
      deliveryAndPickup.length < 1 ||
      languageSpoken.length < 1 ||
      paymentModes.length < 1 ||
      fastDeliveryLocations.length < 1 ||
      dealerDescription.trim().length < 5 ||
      dealerAddress.trim().length < 5
    ) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Cannot process your entry!",
        text: "Please enter valid details, Make sure you entered correct details",
        showConfirmButton: true,
        timer: 3000,
        customClass: {
          confirmButton: 'btn btn-info'
        },
      });
    } else {
      setForm1(false);
      setForm3(false);
      setForm2(true);
    }
  };

  //! Function for adding new data in dataBase...
  const addNewDealerData = async (e) => {
    e.preventDefault();
    if (
      dealerCompanyName.trim() == "" ||
      dealerEmailAddress.trim() == "" ||
      file == null ||
      dealerContactNumber.trim() == "" ||
      dealerWhatsappNumber.trim() == "" ||
      dealerNationality.trim() == "" ||
      !packageId ||
      dealerMapLink.trim() == "" ||
      dealerCities.length < 1 ||
      deliveryAndPickup.length < 1 ||
      languageSpoken.length < 1 ||
      paymentModes.length < 1 ||
      fastDeliveryLocations.length < 1 ||
      dealerDescription.trim() == "" ||
      dealerAddress.trim() == ""
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
    } else if (
      dealerCompanyName.trim().length < 3 ||
      dealerEmailAddress.trim().length < 5 ||
      dealerContactNumber.trim().length < 9 ||
      dealerWhatsappNumber.trim().length < 9 ||
      dealerNationality.trim().length < 2 ||
      !packageId ||
      dealerMapLink.trim().length < 5 ||
      dealerCities.length < 1 ||
      deliveryAndPickup.length < 1 ||
      languageSpoken.length < 1 ||
      paymentModes.length < 1 ||
      fastDeliveryLocations.length < 1 ||
      dealerDescription.trim().length < 5 ||
      dealerAddress.trim().length < 5
    ) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Cannot process your entry!",
        text: "Please enter valid details, Make sure you entered correct details",
        showConfirmButton: true,
        timer: 3000,
        customClass: {
          confirmButton: 'btn btn-info'
        },
      });
    } else if (vatDocFile !== null && vatDocFile.type !== "application/pdf" || ejariDocFile !== null && ejariDocFile.type !== "application/pdf" || insuranceDocFile !== null && insuranceDocFile.type !== "application/pdf" || idCard !== null && idCard.type !== "application/pdf"
    ) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Cannot process your entry!",
        text: "Please upload PDF only, You are uploading another type file",
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
        dealerCompanyName.trim(),
        dealerEmailAddress.trim(),
        dealerContactNumber.trim(),
        dealerWhatsappNumber.trim(),
        dealerNationality.trim(),
        packageId,
        expiryDate,
        totalDays,
        dealerDateOfBirth.trim(),
        dealerEmiratesId.trim(),
        dealerLicenseNumber.trim(),
        dealerVatNumber.trim(),
        dealerMapLink.trim(),
        dealerCities,
        deliveryAndPickup,
        languageSpoken,
        paymentModes,
        fastDeliveryLocations,
        dealerDescription.trim(),
        dealerAddress.trim(),
        statusValue,
        faceBookUrl,
        instagramUrl,
        twitterUrl,
        youtubeUrl,
        tiktokUrl,
        linkedInUrl,
        metaDescription.trim(),
        metaKeywords,
      );
    }
  };

  //! Fetching Package Type Api...
  const fetchingPackagesApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/packages`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log("packages api", response.data.data);
      if (response.status == 200) {
        setPackagesData(response.data.data);
        setPackageId(response.data.data[0].id);
      }
    } catch (error) {
      // console.log(`Something went wrong while fecthing packages Api: `, error);
    }
  };

  //! Fetching Cities Type Api...
  const fetchingCitiesApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/cities`;
    let arr = [];

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log(response);
      if (response.status == 200) {
        // setCitiesData(response.data.data);
        for (let i = 0; i < response.data.data.length; i++) {
          arr.push({ id: response.data.data[i].id, cityName: response.data.data[i].cityName });
        }
        setCitiesData(arr);
      }
    } catch (error) {
      // console.log(`Something went wrong while fecthing cities Api: `, error);
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
    let selectedPackage = packagesData.find(({ id }) => (id == packageId));

    if (selectedPackage) {
      let packageDuration = Number(selectedPackage.packageDuration);
      let currentDate = new Date();
      let packageExpiryDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + packageDuration, currentDate.getDate()).toLocaleDateString();
      setExpiryDate(packageExpiryDate);

      // Calculatiing left days...
      const changeDateFormat = packageExpiryDate.split('/').reverse(); // ['2024','06','27']
      var expDate = new Date(Number(changeDateFormat[0]), Number(changeDateFormat[1]) - 1, Number(changeDateFormat[2]));
      var timeDifference = expDate.getTime() - currentDate.getTime();

      const packageTotalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setTotalDays(packageTotalDays);
    }
  }, [packageId]);

  useEffect(() => {
    fetchingPackagesApi();
    fetchingCitiesApi();
    fetchingAreasApi();
    setDealerNationality("United Arab Emirates");
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dealers</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Dealers
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Dealer
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          {/* <div className="card"> */}
          <div className="card wizard clearfix">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Dealer</h3>
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
                          form1 == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      1
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form1 == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Dealer Details
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
                          form2 == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      2
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form2 == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Social Media Links & SEO
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
                          form3 == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      3
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form3 == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Upload Dealer Documents
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="card-body">
              {/* Form 1 */}
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  flexDirection: "column",
                  display: form1 == true ? "flex" : "none",
                }}
              >
                <div style={{ display: "flex" }}>
                  {/* Name */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Dealer Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={dealerCompanyName}
                      onChange={(e) => {
                        setDealerCompanyName(e.target.value);
                      }}
                      style={{
                        borderColor:
                          dealerCompanyName.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {dealerCompanyName.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter dealer company name
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
                  {/* Email Address */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={dealerEmailAddress}
                      onChange={(e) => {
                        setDealerEmailAddress(e.target.value);
                      }}
                      style={{
                        borderColor:
                          dealerEmailAddress.trim().length < 5 ? "red" : "#8fbd56",
                      }}
                    />
                    {dealerEmailAddress.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter dealer email address
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
                {/* Image Upload */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    Upload Dealer Company logo
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
                      Please upload dealer company logo
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
                    backgroundColor: "none",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Contact */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={dealerContactNumber}
                      onChange={(e) => {
                        setDealerContactNumber(e.target.value);
                      }}
                      style={{
                        borderColor:
                          dealerContactNumber.trim().length < 9
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {dealerContactNumber.trim().length < 9 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter contact number
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
                  {/* WhatsApp Number */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      WhatsApp Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={dealerWhatsappNumber}
                      onChange={(e) => {
                        setDealerWhatsappNumber(e.target.value);
                      }}
                      style={{
                        borderColor:
                          dealerWhatsappNumber.trim().length < 9
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {dealerWhatsappNumber.trim().length < 9 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter whatsapp number
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
                  {/* Nationality */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Nationality
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={dealerNationality}
                      onChange={(e) => {
                        setDealerNationality(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      {countries.length > 0 ? (
                        countries.map((item, index) => {
                          return <option key={index}>{item}</option>;
                        })
                      ) : (
                        <option></option>
                      )}
                    </select>
                    {dealerNationality.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select nationality
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
                  {/* Package Type */}
                  <div className="col-md-3">
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
                      {packagesData.length > 0 ? (
                        packagesData.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.packageName}
                            </option>
                          );
                        })
                      ) : (
                        <option></option>
                      )}
                    </select>
                    {packageId.length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select dealer package
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
                {/*  */}
                <div style={{ display: "flex" }}>
                  {/* Date Of Birth */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-calendar text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="datepicker-date"
                        placeholder="YYYY-MM-DD"
                        type="date"
                        required
                        value={dealerDateOfBirth}
                        onChange={(e) => {
                          setDealerDateOfBirth(e.target.value);
                        }}
                        style={{
                          borderColor:
                            dealerDateOfBirth.trim().length < 8
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {dealerDateOfBirth.trim().length < 8 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter dealer D.O.B (Optional)
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
                  </div>
                  {/* Emirates Id */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        ID
                      </div>
                      <input
                        className="form-control"
                        placeholder="Emirates-Id"
                        type="text"
                        required
                        value={dealerEmiratesId}
                        onChange={(e) => {
                          setDealerEmiratesId(e.target.value);
                        }}
                        style={{
                          borderColor:
                            dealerEmiratesId.trim().length < 3
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {dealerEmiratesId.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter emirates id (Optional)
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
                  </div>
                  {/* License Number */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        License
                      </div>
                      <input
                        className="form-control"
                        placeholder="License number"
                        type="text"
                        required
                        value={dealerLicenseNumber}
                        onChange={(e) => {
                          setDealerLicenseNumber(e.target.value);
                        }}
                        style={{
                          borderColor:
                            dealerLicenseNumber.trim().length < 2
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {dealerLicenseNumber.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter license number (Optional)
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
                  </div>
                  {/* VAT Number */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        VAT
                      </div>
                      <input
                        className="form-control"
                        placeholder="VAT number"
                        type="text"
                        required
                        value={dealerVatNumber}
                        onChange={(e) => {
                          setDealerVatNumber(e.target.value);
                        }}
                        style={{
                          borderColor:
                            dealerVatNumber.trim().length < 2
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {dealerVatNumber.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter VAT number (Optional)
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
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  {/* Google Map Link */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        Map Link
                      </div>
                      <input
                        className="form-control"
                        placeholder="Google Map Link"
                        type="text"
                        required
                        value={dealerMapLink}
                        onChange={(e) => {
                          setDealerMapLink(e.target.value);
                        }}
                        style={{
                          borderColor:
                            dealerMapLink.trim().length < 5
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {dealerMapLink.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter google map link
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
                  </div>
                  {/* Multi Select */}
                  <div className="col-md-3">
                    <Multiselect
                      placeholder="Search Cities"
                      isObject={true}
                      showCheckbox={true}
                      onSelect={(e) => {
                        // console.log(e);
                        const arr = [];
                        for (let i = 0; i < e.length; i++) {
                          arr.push(e[i].id);
                        }
                        // console.log(arr);
                        setDealerCities(arr);
                      }}
                      onRemove={(e) => {
                        // console.log(e);
                        const arr = [];
                        for (let i = 0; i < e.length; i++) {
                          arr.push(e[i].id);
                        }
                        // console.log(arr);
                        setDealerCities(arr);
                      }}
                      options={citiesData}
                      // selectedValues={}
                      hideSelectedList={!true}
                      displayValue="cityName"
                    />
                    {dealerCities.length == 0 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select dealer cities
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
                    <Multiselect
                      placeholder="Delivery & Pickup"
                      isObject={false}
                      showCheckbox={true}
                      onSelect={(e) => {
                        // console.log(e);
                        setDeliveryAndPickup(e);
                      }}
                      onRemove={(e) => {
                        // console.log(e);
                        setDeliveryAndPickup(e);
                      }}
                      options={deliveryAndPickupData}
                      // selectedValues={}
                      hideSelectedList={false}
                    />
                    {deliveryAndPickup.length == 0 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select delivery & pickup
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
                    <Multiselect
                      placeholder="Spoken Languages"
                      isObject={false}
                      showCheckbox={true}
                      onSelect={(e) => {
                        // console.log(e);
                        setLanguageSpoken(e);
                      }}
                      onRemove={(e) => {
                        // console.log(e);
                        setLanguageSpoken(e);
                      }}
                      options={languagesData}
                      // selectedValues={}
                      hideSelectedList={false}
                    />
                    {languageSpoken.length == 0 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select languages
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
                {/* new start */}
                <div style={{ display: "flex" }}>
                  {/* Multi Select */}
                  <div className="col-md-3">
                    <Multiselect
                      placeholder="Payment Modes"
                      isObject={false}
                      showCheckbox={true}
                      onSelect={(e) => {
                        // console.log(e);
                        setPaymentModes(e);
                      }}
                      onRemove={(e) => {
                        // console.log(e);
                        setPaymentModes(e);
                      }}
                      options={paymentModesData}
                      // selectedValues={}
                      hideSelectedList={false}
                    />
                    {paymentModes.length == 0 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select payment modes
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
                    <Multiselect
                      placeholder="Fast Delivery Locations"
                      isObject={true}
                      showCheckbox={true}
                      onSelect={(e) => {
                        // console.log(e);
                        const arr = [];
                        for (let i = 0; i < e.length; i++) {
                          arr.push(e[i].id);
                        }
                        // console.log(arr);
                        setFastDeliveryLocations(arr);
                      }}
                      onRemove={(e) => {
                        // console.log(e);
                        const arr = [];
                        for (let i = 0; i < e.length; i++) {
                          arr.push(e[i].id);
                        }
                        // console.log(arr);
                        setFastDeliveryLocations(arr);
                      }}
                      options={areasData}
                      // selectedValues={}
                      hideSelectedList={!true}
                      displayValue="areaName"
                    />
                    {fastDeliveryLocations.length == 0 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select fast delivery locations
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
                  <div className="col-md-2" style={{ marginLeft: 10, backgroundColor: 'none', marginTop: -15 }}>
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
                {/* new end */}
                <div style={{ display: "flex", marginTop: 5, flexWrap: 'wrap' }}>
                  {/* Description */}
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      Dealer Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={dealerDescription}
                      onChange={(e) => {
                        setDealerDescription(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        height: 70,
                        // width:790,
                        borderColor:
                          dealerDescription.trim().length < 5
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {dealerDescription.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter dealer description
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
                  {/* Address */}
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      Dealer Address
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={dealerAddress}
                      onChange={(e) => {
                        setDealerAddress(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        height: 70,
                        // height: 100,
                        // width:790,
                        borderColor:
                          dealerAddress.trim().length < 5
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {dealerAddress.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter dealer address
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
                {/* Buttons */}
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/dealerTable"}>Cancel</Link>
                  </div>
                  <div
                    className="btn btn-primary"
                    onClick={form1CheckValidations}
                  >
                    Next
                  </div>
                </div>
              </form>

              {/* Form 2 */}
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  flexDirection: "column",
                  display: form2 == true ? "flex" : "none",
                }}
              >

                <h4 style={{ color: '#8fbd56', marginBottom: -5 }}>Social Media Links:</h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {/* facebook */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="faceBookUrl" className="form-label">
                      Facebook Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-facebook text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="faceBookUrl"
                        placeholder="https://www.facebook.com"
                        type="text"
                        required
                        value={faceBookUrl}
                        onChange={(e) => {
                          setFacebookUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            faceBookUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                  {/* instagram */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="instagramUrl" className="form-label">
                      Instagram Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-instagram text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="instagramUrl"
                        placeholder="https://www.instagram.com"
                        type="text"
                        required
                        value={instagramUrl}
                        onChange={(e) => {
                          setInstagramUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            instagramUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                  {/* twitter */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="twitterUrl" className="form-label">
                      Twitter Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-twitter text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="twitterUrl"
                        placeholder="https://www.twitter.com"
                        type="text"
                        required
                        value={twitterUrl}
                        onChange={(e) => {
                          setTwitterUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            twitterUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                  {/* youtube */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="youtubeUrl" className="form-label">
                      Youtube Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-play text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="youtubeUrl"
                        placeholder="https://www.youtube.com"
                        type="text"
                        required
                        value={youtubeUrl}
                        onChange={(e) => {
                          setYoutubeUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            youtubeUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                  {/* tiktok */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="youtubeUrl" className="form-label">
                      TikTok Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-music text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="tiktokUrl"
                        placeholder="https://www.tiktok.com"
                        type="text"
                        required
                        value={tiktokUrl}
                        onChange={(e) => {
                          setTiktokUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            tiktokUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                  {/* linkedin */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="linkedinUrl" className="form-label">
                      Linkedin Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-linkedin text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="linkedinUrl"
                        placeholder="https://www.linkedin.com"
                        type="text"
                        required
                        value={linkedInUrl}
                        onChange={(e) => {
                          setLinkedInUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            linkedInUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
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

                {/* Add Buttons */}
                <div className="col-12">
                  <div
                    className="btn btn-default"
                    onClick={() => {
                      setForm2(false);
                      setForm3(false);
                      setForm1(true);
                    }}
                    style={{ marginRight: 10 }}
                  >
                    Previous
                  </div>
                  <div
                    className="btn btn-primary"
                    onClick={() => {
                      setForm2(false);
                      setForm1(false);
                      setForm3(true);
                    }}
                  >
                    Next to upload Docs
                  </div>
                </div>
              </form>

              {/* Form 3 */}
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  flexDirection: "column",
                  display: form3 == true ? "flex" : "none",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {/* Vat Document Upload */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Upload Vat Document (PDF)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      required
                      accept="application/pdf"
                      onChange={(e) => {
                        setVatDocFile(e.target.files[0]);
                      }}
                      style={{
                        borderColor: vatDocFile == null ? "red" : "#8fbd56",
                      }}
                    />
                    {vatDocFile == null ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please upload vat document (Optional)
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
                  {/* Ejari Document Upload */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Upload Ejari Document (PDF)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      required
                      accept="application/pdf"
                      onChange={(e) => {
                        setEjariDocFile(e.target.files[0]);
                      }}
                      style={{
                        borderColor: ejariDocFile == null ? "red" : "#8fbd56",
                      }}
                    />
                    {ejariDocFile == null ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please upload ejari document (Optional)
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
                  {/* Insurance Document Upload */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Upload Insurance Document (PDF)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      required
                      accept="application/pdf"
                      onChange={(e) => {
                        setInsuranceDocFile(e.target.files[0]);
                      }}
                      style={{
                        borderColor:
                          insuranceDocFile == null ? "red" : "#8fbd56",
                      }}
                    />
                    {insuranceDocFile == null ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please upload insurance document (Optional)
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
                  {/* ID Card Upload */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Upload ID Card (PDF)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      required
                      accept="application/pdf"
                      onChange={(e) => {
                        setIdCard(e.target.files[0]);
                      }}
                      style={{
                        borderColor: idCard == null ? "red" : "#8fbd56",
                      }}
                    />
                    {idCard == null ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please upload id card (Optional)
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

                {/* Add Buttons */}
                <div className="col-12">
                  <div
                    className="btn btn-default"
                    onClick={() => {
                      setForm3(false);
                      setForm1(false);
                      setForm2(true);
                    }}
                    style={{ marginRight: 10 }}
                  >
                    Previous
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={addNewDealerData}
                    disabled={btnDisable}
                  >
                    {
                      btnDisable ?
                        <>
                          <span className="spinner-grow spinner-grow-sm mt-1 me-1" aria-hidden="true" />
                          <span role="status">Loading...</span>
                        </>
                        :
                        'Upload Docs & Submit'
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

export default DealerForm;
