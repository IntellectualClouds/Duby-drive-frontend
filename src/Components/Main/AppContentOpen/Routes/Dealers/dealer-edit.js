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
import { Link, useNavigate, useLocation } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

import TagsInput from "react-tagsinput";

const DealerEditForm = () => {
  let location = useLocation();
  let navigation = useNavigate();

  //! Form States...
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);

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
  const [rowID, setRowID] = useState(Number);

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
            setDealerCompanyName("");
            setDealerEmailAddress("");
            setFile(null);
            setDealerContactNumber("");
            setDealerWhatsappNumber("");
            setDealerNationality("");
            setPackageId(Number);
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
            setRowID(Number);

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

  //! Calling Api for updating dealer data...
  const apiCall = async (
    companyName,
    emailAddress,
    contactNumber,
    whatsAppNumber,
    nationality,
    packageId,
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
    metaKeywords,
    id
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/put/data/venders/update/byId`;

    try {
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: {
          companyName,
          emailAddress,
          contactNumber,
          whatsAppNumber,
          nationality,
          packageId,
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
          metaKeywords,
          id
        },
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
              setDealerCompanyName("");
              setDealerEmailAddress("");
              setFile(null);
              setDealerContactNumber("");
              setDealerWhatsappNumber("");
              setDealerNationality("");
              setPackageId(Number);
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
              setRowID(Number);

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

  //! Function for checking form 1 Validations...
  const form1CheckValidations = async () => {
    if (
      dealerCompanyName.trim() == "" ||
      dealerEmailAddress.trim() == "" ||
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
        title: "Failed while updating",
        text: "Please fill the the required fields or upload image if you want to update it",
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
        title: "Failed while updating",
        text: "Please enter valid details, Make sure you entered correct details",
        showConfirmButton: true,
        timer: 3000,
        customClass: {
          confirmButton: 'btn btn-info'
        },
      });
    } else {
      setForm1(false);
      setForm2(true);
    }
  };

  //! Function for edit data in dataBase...
  const editDealerData = async (e) => {
    e.preventDefault();
    if (
      dealerCompanyName.trim() == "" ||
      dealerEmailAddress.trim() == "" ||
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
      dealerAddress.trim() == "" ||
      !rowID
    ) {
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
    }
    else if (
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
        title: "Failed while updating",
        text: "Please enter valid details, Make sure you entered correct details",
        showConfirmButton: true,
        timer: 3000,
        customClass: {
          confirmButton: 'btn btn-info'
        },
      });
    }
    else {
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
        rowID
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
    fetchingPackagesApi();
    fetchingCitiesApi();
    fetchingAreasApi();
    // console.log(location.state.data);
    setRowID(location.state.data.id);
    setDealerCompanyName(location.state.data.companyName);
    setDealerEmailAddress(location.state.data.emailAddress);
    setDealerContactNumber(location.state.data.contactNumber);
    setDealerWhatsappNumber(location.state.data.whatsAppNumber);
    setDealerNationality(location.state.data.nationality);
    setPackageId(location.state.data.packageId);
    setDealerDateOfBirth(location.state.data.dateOfBirth);
    setDealerEmiratesId(location.state.data.emiratesId);
    setDealerLicenseNumber(location.state.data.licenseNumber);
    setDealerVatNumber(location.state.data.vatNumber);
    setDealerMapLink(location.state.data.dealerMapLink);

    // setDealerCities(location.state.data.cities);
    // console.log(location.state.data.cities);
    setDeliveryAndPickup(location.state.data.deliveryAndPickup);
    setLanguageSpoken(location.state.data.languageSpoken);
    setPaymentModes(location.state.data.paymentModes);
    // setFastDeliveryLocations(location.state.data.fastDeliveryLocations);

    setDealerDescription(location.state.data.description);
    setDealerAddress(location.state.data.address);

    setFacebookUrl(location.state.data.facebookUrl);
    setInstagramUrl(location.state.data.instagramUrl);
    setTwitterUrl(location.state.data.twitterUrl);
    setYoutubeUrl(location.state.data.youtubeUrl);
    setTiktokUrl(location.state.data.tiktokUrl);
    setLinkedInUrl(location.state.data.linkedinUrl);

    setMetaDescription(location.state.data.metaDescription);
    setMetaKeywords(location.state.data.metaKeywords);

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
              Edit Form
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          {/* <div className="card"> */}
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
                      Edit Dealer Company Name
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
                        Please enter updated company name
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
                      Edit Email Address
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
                          dealerEmailAddress.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {dealerEmailAddress.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter updated email address
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
                      Please upload company logo if you want to update it
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
                      Edit Contact Number
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
                        Please enter updated contact number
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
                  {/* Whatsapp Numeber */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Edit WhatsApp Number
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
                        Please enter updated whatsapp number
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
                  {/* Emirates ID */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        ID
                      </div>
                      <input
                        className="form-control"
                        placeholder="Emirates Id"
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
                        Please enter updated google map link
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
                      // selectedValues={dealerCities}
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
                        Please select updated dealer cities
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
                      selectedValues={deliveryAndPickup}
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
                      selectedValues={languageSpoken}
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
                      selectedValues={paymentModes}
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
                      // selectedValues={fastDeliveryLocations}
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
                     <div className="col-md-2" style={{ marginLeft: 10, backgroundColor: 'none',marginTop:-15 }}>
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
                <div style={{ display: "flex", marginTop: 5, flexWrap: 'wrap' }}>
                  {/* Description */}
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      Edit Description
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
                        Please enter updated description
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
                      Edit Address
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
                        Please enter updated address
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
                      Edit Facebook Url (Optional)
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
                      Edit Instagram Url (Optional)
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
                      Edit Twitter Url (Optional)
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
                      Edit Youtube Url (Optional)
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
                      Edit TikTok Url (Optional)
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
                      Edit Linkedin Url (Optional)
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

                {/* Add Buttons */}
                <div className="col-12">
                  <div
                    className="btn btn-default"
                    onClick={() => {
                      setForm2(false);
                      setForm1(true);
                    }}
                    style={{ marginRight: 10 }}
                  >
                    Previous
                  </div>
                  <button className="btn btn-primary" onClick={editDealerData} disabled={btnDisable}>
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

export default DealerEditForm;
