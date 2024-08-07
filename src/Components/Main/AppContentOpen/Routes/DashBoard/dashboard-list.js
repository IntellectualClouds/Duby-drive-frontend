import React, { useEffect, useState } from "react";
import "../../../../../index.css";

//! Importing axios for fetching api...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing 404 Error Icon for image...
import imageErrorIcon from "../../../../../assets/icons/error.png";

const DashBoardTable = () => {
  //! States...
  const [data, setData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [dealerData, setDealerData] = useState([]);
  const [carTypeData, setCarTypeData] = useState([]);

  //! Modal States...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [photosModalStatus, setPhotosModalStatus] = useState(false);
  const [photosModalData, setPhotosModalData] = useState([]);
  const [modalImageNumber, setModalImageNumber] = useState(0);

  //! Fetching Car Details List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/carDetails`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log(response);
      if (response.status == 200) {
        setData(response.data.data.slice(0, 10));
      }
    } catch (error) {
      // console.log("Something went wrong while fetching api:", error);
    }
  };

  const fetchingCarBrandsApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/carBrands`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log(response);
      if (response.status == 200) {
        setBrandsData(response.data.data);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching api:", error);
    }
  };

  const fetchingDealersApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/venders`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log(response);
      if (response.status == 200) {
        setDealerData(response.data.data);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching api:", error);
    }
  };

  const fetchingCarTypesApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/carTypes`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log(response);
      if (response.status == 200) {
        setCarTypeData(response.data.data);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching api:", error);
    }
  };

  useEffect(() => {
    fetchingApi();
    fetchingCarBrandsApi();
    fetchingDealersApi();
    fetchingCarTypesApi();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Dashboard
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Table
            </li>
          </ol>
        </div>
      </div>

      {/* Cards */}
      <div className="row">
        <div className="col-lg-6 col-sm-12 col-md-6 col-xl-3">
          <div className="card overflow-hidden">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h3 className="mb-2 fw-semibold">03</h3>
                  <p className="text-muted fs-13 mb-0">Upcoming Orders</p>
                </div>
                <div className="col col-auto top-icn dash">
                  <div className="counter-icon bg-primary dash ms-auto box-shadow-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white"
                      enableBackground="new 0 0 24 24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12,8c-2.2091675,0-4,1.7908325-4,4s1.7908325,4,4,4c2.208252-0.0021973,3.9978027-1.791748,4-4C16,9.7908325,14.2091675,8,12,8z M12,15c-1.6568604,0-3-1.3431396-3-3s1.3431396-3,3-3c1.6561279,0.0018311,2.9981689,1.3438721,3,3C15,13.6568604,13.6568604,15,12,15z M21.960022,11.8046875C19.9189453,6.9902344,16.1025391,4,12,4s-7.9189453,2.9902344-9.960022,7.8046875c-0.0537109,0.1246948-0.0537109,0.2659302,0,0.390625C4.0810547,17.0097656,7.8974609,20,12,20s7.9190063-2.9902344,9.960022-7.8046875C22.0137329,12.0706177,22.0137329,11.9293823,21.960022,11.8046875z M12,19c-3.6396484,0-7.0556641-2.6767578-8.9550781-7C4.9443359,7.6767578,8.3603516,5,12,5s7.0556641,2.6767578,8.9550781,7C19.0556641,16.3232422,15.6396484,19,12,19z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 col-md-6 col-xl-3">
          <div className="card overflow-hidden">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h3 className="mb-2 fw-semibold">12</h3>
                  <p className="text-muted fs-13 mb-0">Coupons</p>
                </div>
                <div className="col col-auto top-icn dash">
                  <div className="counter-icon bg-secondary dash ms-auto box-shadow-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white"
                      enableBackground="new 0 0 24 24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.5,7H16V5.9169922c0-2.2091064-1.7908325-4-4-4s-4,1.7908936-4,4V7H4.5C4.4998169,7,4.4996338,7,4.4993896,7C4.2234497,7.0001831,3.9998169,7.223999,4,7.5V19c0.0018311,1.6561279,1.3438721,2.9981689,3,3h10c1.6561279-0.0018311,2.9981689-1.3438721,3-3V7.5c0-0.0001831,0-0.0003662,0-0.0006104C19.9998169,7.2234497,19.776001,6.9998169,19.5,7z M9,5.9169922c0-1.6568604,1.3431396-3,3-3s3,1.3431396,3,3V7H9V5.9169922z M19,19c-0.0014038,1.1040039-0.8959961,1.9985962-2,2H7c-1.1040039-0.0014038-1.9985962-0.8959961-2-2V8h3v2.5C8,10.776123,8.223877,11,8.5,11S9,10.776123,9,10.5V8h6v2.5c0,0.0001831,0,0.0003662,0,0.0005493C15.0001831,10.7765503,15.223999,11.0001831,15.5,11c0.0001831,0,0.0003662,0,0.0006104,0C15.7765503,10.9998169,16.0001831,10.776001,16,10.5V8h3V19z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 col-md-6 col-xl-3">
          <div className="card overflow-hidden">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h3 className="mb-2 fw-semibold">58</h3>
                  <p className="text-muted fs-13 mb-0">Total Orders</p>
                  {/* <p className="text-muted mb-0 mt-2 fs-12">
                    <span className="icn-box text-success fw-semibold fs-13 me-1">
                      <i className="fa fa-long-arrow-up"></i>
                      27%
                    </span>
                    since last month
                  </p> */}
                </div>
                <div className="col col-auto top-icn dash">
                  <div className="counter-icon bg-info dash ms-auto box-shadow-info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white"
                      enableBackground="new 0 0 24 24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.5,12C7.223877,12,7,12.223877,7,12.5v5.0005493C7.0001831,17.7765503,7.223999,18.0001831,7.5,18h0.0006104C7.7765503,17.9998169,8.0001831,17.776001,8,17.5v-5C8,12.223877,7.776123,12,7.5,12z M19,2H5C3.3438721,2.0018311,2.0018311,3.3438721,2,5v14c0.0018311,1.6561279,1.3438721,2.9981689,3,3h14c1.6561279-0.0018311,2.9981689-1.3438721,3-3V5C21.9981689,3.3438721,20.6561279,2.0018311,19,2z M21,19c-0.0014038,1.1040039-0.8959961,1.9985962-2,2H5c-1.1040039-0.0014038-1.9985962-0.8959961-2-2V5c0.0014038-1.1040039,0.8959961-1.9985962,2-2h14c1.1040039,0.0014038,1.9985962,0.8959961,2,2V19z M12,6c-0.276123,0-0.5,0.223877-0.5,0.5v11.0005493C11.5001831,17.7765503,11.723999,18.0001831,12,18h0.0006104c0.2759399-0.0001831,0.4995728-0.223999,0.4993896-0.5v-11C12.5,6.223877,12.276123,6,12,6z M16.5,10c-0.276123,0-0.5,0.223877-0.5,0.5v7.0005493C16.0001831,17.7765503,16.223999,18.0001831,16.5,18h0.0006104C16.7765503,17.9998169,17.0001831,17.776001,17,17.5v-7C17,10.223877,16.776123,10,16.5,10z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 col-md-6 col-xl-3">
          <div className="card overflow-hidden">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h3 className="mb-2 fw-semibold">24</h3>
                  <p className="text-muted fs-13 mb-0">Cancel Orders</p>
                </div>
                <div className="col col-auto top-icn dash">
                  <div className="counter-icon bg-warning dash ms-auto box-shadow-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white"
                      enableBackground="new 0 0 24 24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9,10h2.5c0.276123,0,0.5-0.223877,0.5-0.5S11.776123,9,11.5,9H10V8c0-0.276123-0.223877-0.5-0.5-0.5S9,7.723877,9,8v1c-1.1045532,0-2,0.8954468-2,2s0.8954468,2,2,2h1c0.5523071,0,1,0.4476929,1,1s-0.4476929,1-1,1H7.5C7.223877,15,7,15.223877,7,15.5S7.223877,16,7.5,16H9v1.0005493C9.0001831,17.2765503,9.223999,17.5001831,9.5,17.5h0.0006104C9.7765503,17.4998169,10.0001831,17.276001,10,17v-1c1.1045532,0,2-0.8954468,2-2s-0.8954468-2-2-2H9c-0.5523071,0-1-0.4476929-1-1S8.4476929,10,9,10z M21.5,12H17V2.5c0.000061-0.0875244-0.0228882-0.1735229-0.0665283-0.2493896c-0.1375732-0.2393188-0.4431152-0.3217773-0.6824951-0.1842041l-3.2460327,1.8603516L9.7481079,2.0654297c-0.1536865-0.0878906-0.3424072-0.0878906-0.4960938,0l-3.256897,1.8613281L2.7490234,2.0664062C2.6731567,2.0227661,2.5871582,1.9998779,2.4996338,1.9998779C2.2235718,2.000061,1.9998779,2.223938,2,2.5v17c0.0012817,1.380188,1.119812,2.4987183,2.5,2.5H19c1.6561279-0.0018311,2.9981689-1.3438721,3-3v-6.5006104C21.9998169,12.2234497,21.776001,11.9998169,21.5,12z M4.5,21c-0.828064-0.0009155-1.4990845-0.671936-1.5-1.5V3.3623047l2.7412109,1.5712891c0.1575928,0.0872192,0.348877,0.0875854,0.5068359,0.0009766L9.5,3.0761719l3.2519531,1.8583984c0.157959,0.0866089,0.3492432,0.0862427,0.5068359-0.0009766L16,3.3623047V19c0.0008545,0.7719116,0.3010864,1.4684448,0.7803345,2H4.5z M21,19c0,1.1045532-0.8954468,2-2,2s-2-0.8954468-2-2v-6h4V19z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Car Details Table */}
      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-bottom">
                <h3 className="card-title">Car Details List</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive export-table">
                  <table
                    id="editable-file-datatable"
                    className="table editable-table table-nowrap table-bordered table-edit wp-100"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Model No.</th>
                        <th>Car</th>
                        <th>Car Brand</th>
                        <th>Dealer Company</th>
                        <th>Car Type</th>
                        <th>Exterior Color</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => {
                          return (
                            <tr data-id="1" key={index}>
                              <td
                                data-field="id"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                #{item.id}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.carModelNo}
                              </td>
                              {
                                item.carPhotosArray !== null ?
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setPhotosModalStatus(true);
                                      setPhotosModalData(item.carPhotosArray);
                                    }}
                                  >
                                    <img
                                      src={`${host[0].hostUrl}/images/cars-images/${item.carPhotosArray[0]}`}
                                      alt={item.carPhotosArray[0]}
                                      onError={(e) => {
                                        e.target.src = imageErrorIcon;
                                      }}
                                      height={50}
                                      width={100}
                                      style={{ borderRadius: 5 }}
                                    />
                                  </td>
                                  :
                                  <td data-field="age">
                                    <img
                                      src={imageErrorIcon}
                                      alt={imageErrorIcon}
                                      height={50}
                                      width={100}
                                      style={{ borderRadius: 5 }}
                                    />
                                  </td>
                              }
                              <td
                                data-field="name"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {brandsData.length > 0 ?
                                  brandsData.map((brand, key) => {
                                    return (
                                      brand.id == item.carBrandId ? brand.brandName : ''
                                    );
                                  })
                                  :
                                  `#${item.carBrandId}`
                                }
                              </td>
                              <td
                                data-field="name"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {dealerData.length > 0 ?
                                  dealerData.map((dealer, key) => {
                                    return (
                                      dealer.id == item.dealerCompanyId ? dealer.companyName : ''
                                    );
                                  })
                                  :
                                  `#${item.dealerCompanyId}`
                                }
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {carTypeData.length > 0 ?
                                  carTypeData.map((carType, key) => {
                                    return (
                                      carType.id == item.carTypeId ? carType.carType : ''
                                    );
                                  })
                                  :
                                  `#${item.carTypeId}`
                                }
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.carExteriorColor}
                              </td>
                              <td
                                data-field="gender"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.isActive == "active" ? (
                                  <span
                                    className="badge bg-success my-1"
                                    style={{
                                      fontWeight: "bold",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.isActive}
                                  </span>
                                ) : (
                                  <span
                                    className="badge bg-danger my-1"
                                    style={{
                                      fontWeight: "bold",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.isActive}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr data-id="0">
                          <td data-field="id">No data</td>
                          <td data-field="name">No data</td>
                          <td data-field="age">No data</td>
                          <td data-field="gender">No data</td>
                          <td data-field="gender">No data</td>
                          <td data-field="gender">No data</td>
                          <td data-field="gender">No data</td>
                          <td data-field="gender">No data</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <div
        className="modal fade show"
        id="largemodal"
        tabIndex="-1"
        style={{
          display: modalStatus == true ? "flex" : "none",
          backgroundColor: "none",
          alignItems: "center",
        }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg " role="document">
          <div
            className="modal-content"
            style={{ backgroundColor: "none", width: 800 }}
          >
            <div className="modal-header">
              <h6 className="modal-title">
                {
                  modalData !== null ?
                    <div>
                      {
                        modalData.category.verified == 'verified' ?
                          <span className="mb-0 badge bg-primary me-1">Verified</span>
                          :
                          ''
                      }
                      {
                        modalData.category.featured == 'featured' ?
                          <span className="mb-0 badge bg-warning me-1">Featured</span>
                          :
                          ''
                      }
                      {
                        modalData.category.premium == 'premium' ?
                          <span className="mb-0 badge bg-dark">Premium</span>
                          :
                          ''
                      }
                    </div>
                    :
                    ""
                }
              </h6>
              <button
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalStatus(false);
                  setModalData(null);
                }}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {modalStatus == true ? (
              <div className="modal-body">
                {
                  modalData.carPhotosArray !== null ?
                    <img
                      src={`${host[0].hostUrl}/images/cars-images/${modalData.carPhotosArray[0]}`}
                      alt={modalData.carPhotosArray[0]}
                      onError={(e) => {
                        e.target.src = imageErrorIcon;
                      }}
                      height={70}
                      width={140}
                      style={{ borderRadius: 5, float: "right" }}
                    />
                    :
                    <img
                      src={imageErrorIcon}
                      alt={imageErrorIcon}
                      height={70}
                      width={140}
                      style={{ borderRadius: 5, float: "right" }}
                    />
                }
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // marginBottom: 30,
                  }}
                >
                  <b>Dealer Company:</b>
                  <p>
                    {dealerData.length > 0 ?
                      dealerData.map((dealer, key) => {
                        return (
                          dealer.id == modalData.dealerCompanyId ? dealer.companyName : ''
                        );
                      })
                      :
                      `#${modalData.dealerCompanyId}`
                    }
                  </p>
                </label>

                <div style={{ backgroundColor: "none", marginTop: 20 }}>
                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Details
                  </h6>
                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "green",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b>Car Brand:</b>
                      <p>
                        {brandsData.length > 0 ?
                          brandsData.map((brand, key) => {
                            return (
                              brand.id == modalData.carBrandId ? brand.brandName : ''
                            );
                          })
                          :
                          `#${modalData.carBrandId}`
                        }
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Car Type:</b>
                      <p>
                        {carTypeData.length > 0 ?
                          carTypeData.map((carType, key) => {
                            return (
                              carType.id == modalData.carTypeId ? carType.carType : ''
                            );
                          })
                          :
                          `#${modalData.carTypeId}`
                        }
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "yellow",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Model No:</b>
                      <p>{modalData.carModelNo}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>License No:</b>
                      <p>{modalData.carLicense}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Car Specs
                  </h6>
                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b> Exterior Color:</b>
                      <p>{modalData.carExteriorColor}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Interior Color:</b>
                      <p>{modalData.carInteriorColor}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Fuel Type:</b>
                      <p>{modalData.carFuelType}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Luggage:</b>
                      <p>{modalData.carLuggage}</p>
                    </label>
                  </div>

                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b>Car Doors:</b>
                      <p>{modalData.carDoors}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Car Seats:</b>
                      <p>{modalData.carSeats}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Auto Transmission:</b>
                      <p>{modalData.autoTransmission}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> GSS Specs:</b>
                      <p>{modalData.gccSpecs}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Additional Charges & Insurance
                  </h6>
                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b>Additional Charges (Km):</b>
                      <p>{modalData.additionalMilageCharges}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Tools Charges:</b>
                      <p>{modalData.carToolsCharges}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Driver Insurance:</b>
                      <p>{modalData.additionalDriverInsurance}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>Insurance Type:</b>
                      <p>{modalData.insuranceType}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Discount & Security Deposit
                  </h6>
                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                      }}
                    >
                      <b> Discount Offer:</b>
                      <p>{modalData.discountOffer}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Offer Expiry:</b>
                      <p>{modalData.offerExpiryDate}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Security Deposit:</b>
                      <p>{modalData.securityDeposit}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Refunded In:</b>
                      <p>{modalData.refundedIn}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Rental Cost & Milage Limit
                  </h6>
                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b>Per Day Milage:</b>
                      <p>{modalData.perDayMilagelimit}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Per Day Rental Cost:</b>
                      <p>{modalData.perDayRentalCost}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Weekly Milage:</b>
                      <p>{modalData.weeklyMilageLimit}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>Weekly Rental Cost:</b>
                      <p>{modalData.weeklyRentalCost}</p>
                    </label>
                  </div>

                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        // marginLeft: 70,
                      }}
                    >
                      <b> Monthly Milage:</b>
                      <p>{modalData.monthlyMilageLimit}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Monthly Rental Cost:</b>
                      <p>{modalData.monthlyRentalCost}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>Minimum Driver Age:</b>
                      <p>{modalData.minimumDriverAge}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>Video:</b>
                      <p>
                        {modalData.carVideoName == null
                          ? "-"
                          : modalData.carVideoName}
                      </p>
                    </label>
                  </div>

                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // marginTop: 10,
                      // backgroundColor: "red",
                    }}
                  >
                    {/* <b> Description:</b> */}
                    <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                      Description
                    </h6>
                    <p>{modalData.description}</p>
                  </label>
                </div>
              </div>
            ) : (
              <div className="modal-body">
                <p>NO data</p>
              </div>
            )}
            <div
              className="modal-footer"
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "none",
                justifyContent: "end",
              }}
            >
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalStatus(false);
                  setModalData(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photos Modal */}
      <div
        className="modal fade show"
        id="largemodal"
        tabIndex="-1"
        style={{
          display: photosModalStatus == true ? "flex" : "none",
          backgroundColor: "none",
          alignItems: "center",
        }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg " role="document">
          <div
            className="modal-content"
            style={{ backgroundColor: "none", width: 800 }}
          >
            <div className="modal-header">
              <h6 className="modal-title">Car Photos</h6>
              <button
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  setPhotosModalStatus(false);
                  setPhotosModalData([]);
                  setModalImageNumber(0);
                }}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div
              className="modal-body"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  // backgroundColor: "red",
                  width: "100%",
                  height: 400,
                }}
              >
                {photosModalData.length > 0 ? (
                  <img
                    src={`${host[0].hostUrl}/images/cars-images/${photosModalData[modalImageNumber]}`}
                    alt={photosModalData[modalImageNumber]}
                    onError={(e) => {
                      e.target.src = imageErrorIcon;
                    }}
                    className="carImages"
                    height={"100%"}
                    width={"100%"}
                    style={{ borderRadius: 10 }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <b>Oops, Something went wrong</b>
                  </div>
                )}
              </div>
            </div>

            <div
              className="modal-footer"
              style={{
                display: "flex",
                flexDirection: "row",
                // backgroundColor: "yellow",
                justifyContent: "end",
              }}
            >
              <button
                className="btn btn-default"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalImageNumber(modalImageNumber - 1);
                  // console.log(photosModalData.length);
                }}
                style={{ margin: 5 }}
                disabled={modalImageNumber == 0 ? true : false}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalImageNumber(modalImageNumber + 1);
                }}
                disabled={
                  modalImageNumber == photosModalData.length - 1 ? true : false
                }
                style={{ margin: 5 }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardTable;
