import React, { useEffect, useState } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const FaqForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [faqHeading, setFaqHeading] = useState("");
  const [faqType, setFaqType] = useState("");
  const [vendorId, setVendorId] = useState(Number);
  const [faqDescription, setFaqDescription] = useState("");
  const [status, setStatus] = useState(true);

  const [btnDisable, setBtnDisable] = useState(false);

  const [vendersData, setVendersData] = useState([]);

  //! Calling Api for adding new faq data...
  const apiCall = async (faqHeading, faqType, vendorId, faqDescription, status) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/fAQ`;

    if (faqType == 'Duby Drive') {
      vendorId = null;
    }

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { faqHeading, faqType, vendorId, faqDescription, status },
      });
      // console.log(response);
      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Congraulations!",
          text: "FAQ added successfully",
          showConfirmButton: true,
          timer: 2000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          willClose: () => {
            localStorage.setItem('faq_state', JSON.stringify({ faqType, vendorId }));

            setBtnDisable(false);
            setFaqHeading("");
            setFaqType("Vendor");
            setVendorId(Number);
            setFaqDescription("");
            setStatus(true);
            navigation("/faqTable");
          },
        });
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
  const addNewFaqData = async (e) => {
    e.preventDefault();
    if (
      faqHeading.trim() == "" ||
      faqType.trim() == "" ||
      faqDescription.trim() == ""
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
    }
    else if (faqType == 'Vendor' && !vendorId) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Cannot process your entry!",
        text: "Please select Vendor or Dealer",
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
        faqHeading.trim(),
        faqType.trim(),
        vendorId,
        faqDescription.trim(),
        statusValue
      );
    }
  };

  const fetchingVendersApi = async () => {
    try {
      let response = await axios({
        method: 'GET',
        url: `${host[0].hostUrl}/api/get/data/venders`,
      });
      // console.log(response);
      if (response.status == 200) {
        setVendersData(response.data.data);
        const faq_state = JSON.parse(localStorage.getItem('faq_state'));
        if (faq_state == null) {
          setFaqType("Vendor");
          setVendorId(response.data.data[0].id);
        }
        else {
          setFaqType(faq_state.faqType);
          if (faq_state.vendorId) {
            setVendorId(faq_state.vendorId);
          }
        };
      }
    } catch (error) {
      // console.log('Failed while fetching venders api: ', error);
    }
  };

  useEffect(() => {
    fetchingVendersApi();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Faq</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Faq
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Faq
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Faq</h3>
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
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Faq Heading
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={faqHeading}
                      onChange={(e) => {
                        setFaqHeading(e.target.value);
                      }}
                      style={{
                        borderColor:
                          faqHeading.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {faqHeading.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Faq Heading
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
                      Faq Type
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={faqType}
                      onChange={(e) => {
                        setFaqType(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Duby Drive</option>
                      <option>Vendor</option>
                    </select>
                    {faqType.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select Faq Type
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
                  <div className="col-md-4" style={{ display: faqType == 'Duby Drive' ? 'none' : faqType == 'Vendor' ? 'block' : 'none' }}>
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Vendor
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={vendorId}
                      onChange={(e) => {
                        setVendorId(e.target.value);
                      }}
                      disabled={faqType == 'Duby Drive' ? true : faqType == 'Vendor' ? false : true}
                    >
                      <option disabled>Select</option>
                      {
                        vendersData.length > 0 ?
                          vendersData.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>{item.companyName}</option>
                            )
                          })
                          :
                          ''
                      }
                    </select>
                    {vendorId.length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select Vendor
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
                  <div className="col-md-12">
                    <label htmlFor="validationCustom01" className="form-label">
                      Faq Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={faqDescription}
                      onChange={(e) => {
                        setFaqDescription(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        height: 150,
                        borderColor:
                          faqDescription.trim().length < 5 ? "red" : "#8fbd56",
                      }}
                    />
                    {faqDescription.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Faq Description
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

                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/faqTable"}>Cancel</Link>
                  </div>
                  <button className="btn btn-primary" onClick={addNewFaqData} disabled={btnDisable}>
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

export default FaqForm;
