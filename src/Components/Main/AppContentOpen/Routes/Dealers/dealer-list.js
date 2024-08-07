import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

//! Importing axios for fetching api...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing 404 Error Icon for image...
import imageErrorIcon from "../../../../../assets/icons/error.png";

const DealerTable = () => {
  //! States...
  const [data, setData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [packageData, setPackageData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  const [filterData, setFilterData] = useState([]);

  //! Day left bar States...
  const [leftDays, setLeftDays] = useState(Number);

  //! Fetching Car Dealers List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/venders`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log(response);
      if (response.status == 200) {
        setData(response.data.data);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching api: ", error);
    }
  };

  //! Function for deleting Row...
  const deleteRow = async (
    id,
    companyLogo,
    vatDocs,
    ejariDocs,
    insuranceDocs,
    idCardDocs
  ) => {
    //! Calling Api for deleting Row By ID...
    let apiUrl = `${host[0].hostUrl}/api/delete/data/venders/row/byId`;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-info m-1",
        cancelButton: "btn btn-danger m-1"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't to delete this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await axios({
            method: "DELETE",
            url: apiUrl,
            data: {
              id,
              companyLogo,
              vatDocs,
              ejariDocs,
              insuranceDocs,
              idCardDocs,
            },
          });
          // console.log(response);
          if (response.status == 200) {
            fetchingApi();
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Record has been deleted.",
              icon: "success"
            });
          }
        } catch (error) {
          // console.log(
          //   "Something went wrong while deleting row from dataBase: ",
          //   error
          // );
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Something went wrong while deleting this record:)",
            icon: "error"
          });
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your record is safe :)",
          icon: "error"
        });
      }
    });
  };

  //! Calling Package Api...
  const callPackageApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/packages`;
    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      // console.log(response);
      if (response.status == 200) {
        setPackageData(response.data.data);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching api: ", error);
    }
  };

  const callingCitiesApi = async (cities_id_arrary) => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/cities/by/id`;
    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { cities_id_arrary },
      });
      // console.log(response);
      if (response.status == 200) {
        setCitiesData(response.data.data);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching api: ", error);
    }
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const changePage = (page_number) => {
    setCurrentPage(page_number);
  };

  const [searchValue, setSearchValue] = useState("");

  const onChangeHandler = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue);

    if (inputValue.trim() == '') {
      setFilterData([]);
    }
    else {
      const packageType = packageData.find((data) => (data.packageName.toLowerCase().includes(inputValue)));

      const filterData = data.filter(({ id, companyName, emailAddress, contactNumber }) => (companyName.toLowerCase().includes(inputValue) || id.toString().includes(inputValue) || emailAddress.toLowerCase().includes(inputValue) || contactNumber.toLowerCase().includes(inputValue)));
      if (filterData.length > 0) {
        setFilterData(filterData);
      }
      else if (packageType) {
        const filteredByPackage = data.filter(({ packageId }) => (packageId == packageType.id));
        if (filteredByPackage.length > 0) {
          setFilterData(filteredByPackage);
        }
        else {
          setFilterData([]);
        }
      }
      else {
        setFilterData([]);
      }
    }
  };

  const calculateRemainingDays = (packageExpDate) => {
    const packageExpiryDate = packageExpDate.split('/').reverse(); // ['2024','06','27']
    var currentDate = new Date();
    var expiryDate = new Date(Number(packageExpiryDate[0]), Number(packageExpiryDate[1]) - 1, Number(packageExpiryDate[2]));
    var timeDifference = expiryDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return remainingDays;
  };

  const expHandler = (packageExpDate, packageTotalDays) => {
    const packageExpiryDate = packageExpDate.split('/').reverse(); // ['2024','06','27']
    var currentDate = new Date();
    var expiryDate = new Date(Number(packageExpiryDate[0]), Number(packageExpiryDate[1]) - 1, Number(packageExpiryDate[2]));
    var timeDifference = expiryDate.getTime() - currentDate.getTime();

    const totalDays = packageTotalDays;
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    // console.log('Total Days: ', totalDays);
    // console.log('Remaining Days: ', remainingDays);

    const calculatePercentage = (remainingDays / totalDays) * 100;

    return calculatePercentage;
  };

  useEffect(() => {
    fetchingApi();
    callPackageApi();
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
              Dealers List
            </li>
          </ol>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "none",
          width: "97%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <div className="btn btn-primary" style={{ marginBottom: 10 }}>
          <Link to={"/dealerForm"} style={{ color: "white" }}>
            Add New Dealer
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-bottom" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 className="card-title">Dealers List</h3>
                {
                  data.length > 0 ?
                    <div className="main-header-center ms-3 d-none d-xl-block" style={{ position: 'relative' }}>
                      <input autoCorrect="on" className="form-control" onChange={onChangeHandler} placeholder="Search Dealer or Vendor..." type="search" style={{ paddingRight: 40 }} />
                      <button className="btn" style={{ position: 'absolute' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"><path d="M21.2529297,17.6464844l-2.8994141-2.8994141c-0.0021973-0.0021973-0.0043945-0.0043945-0.0065918-0.0065918c-0.8752441-0.8721313-2.2249146-0.9760132-3.2143555-0.3148804l-0.8467407-0.8467407c1.0981445-1.2668457,1.7143555-2.887146,1.715332-4.5747681c0.0021973-3.8643799-3.1286621-6.9989014-6.993042-7.0011597S2.0092773,5.1315308,2.007019,8.9959106S5.1356201,15.994812,9,15.9970703c1.6889038,0.0029907,3.3114014-0.6120605,4.5789185-1.7111206l0.84729,0.84729c-0.6630859,0.9924316-0.5566406,2.3459473,0.3208618,3.2202759l2.8994141,2.8994141c0.4780884,0.4786987,1.1271973,0.7471313,1.8037109,0.7460938c0.6766357,0.0001831,1.3256226-0.2686768,1.803894-0.7472534C22.2493286,20.2558594,22.2488403,18.6417236,21.2529297,17.6464844z M9.0084229,14.9970703c-3.3120728,0.0023193-5.9989624-2.6807861-6.0012817-5.9928589S5.6879272,3.005249,9,3.0029297c1.5910034-0.0026855,3.1175537,0.628479,4.2421875,1.7539062c1.1252441,1.1238403,1.7579956,2.6486206,1.7590942,4.2389526C15.0036011,12.3078613,12.3204956,14.994751,9.0084229,14.9970703z M20.5458984,20.5413818c-0.604126,0.6066284-1.5856934,0.6087036-2.1923828,0.0045166l-2.8994141-2.8994141c-0.2913818-0.2910156-0.4549561-0.6861572-0.4544678-1.0979614C15.0006714,15.6928101,15.6951294,15,16.5507812,15.0009766c0.4109497-0.0005493,0.8051758,0.1624756,1.0957031,0.453125l2.8994141,2.8994141C21.1482544,18.9584351,21.1482544,19.9364624,20.5458984,20.5413818z" /></svg>
                      </button>
                    </div>
                    :
                    ''
                }
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
                        <th>Company Name</th>
                        <th>Logo</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th style={{ width: 200 }}>Days Left</th>
                        <th>Status</th>
                        <th>Buttons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        searchValue.trim() == "" ?
                          currentData.length > 0 ?
                            currentData.map((item, index) => {
                              return (
                                <tr
                                  data-id="1"
                                  key={index}
                                  style={{ cursor: "pointer" }}
                                >
                                  <td
                                    data-field="id"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    #{item.id}
                                  </td>
                                  <td
                                    data-field="name"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    {item.companyName} ({
                                      packageData.length > 0 ?
                                        packageData.map((data, key) => {
                                          return (
                                            <React.Fragment key={key}>{data.id == item.packageId ? data.packageName : ''}</React.Fragment>
                                          )
                                        })
                                        :
                                        item.packageId
                                    })

                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    <img
                                      src={`${host[0].hostUrl}/images/dealers-logo/${item.companyLogo}`}
                                      alt={item.companyLogo}
                                      onError={(e) => {
                                        e.target.src = imageErrorIcon;
                                      }}
                                      height={50}
                                      width={100}
                                      style={{ borderRadius: 5 }}
                                    />
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    {item.emailAddress}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    {item.contactNumber}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    <div className="progress mb-1">
                                      <div className={`progress-bar bg-info`} style={{ width: `${100 - expHandler(item.expiryDate, item.totalDays)}%` }}></div>
                                    </div>
                                    <span>
                                      {
                                        calculateRemainingDays(item.expiryDate) > 0
                                          ? `${calculateRemainingDays(item.expiryDate)} days left from ${item.totalDays}`
                                          : "Expired"
                                      }
                                    </span>
                                  </td>
                                  <td data-field="gender">
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
                                  <td style={{ width: 120 }}>
                                    <div
                                      className="btn btn-azure fs-14 text-white edit-icn"
                                      title="Edit"
                                    >
                                      <Link
                                        className="fe fe-edit"
                                        style={{ color: "white" }}
                                        to="/dealerEditForm"
                                        state={{ data: item }}
                                      ></Link>
                                    </div>
                                    <a
                                      className="btn btn-red fs-14 text-white trash-icn"
                                      title="trash"
                                      style={{ marginLeft: 10 }}
                                      onClick={() => {
                                        deleteRow(
                                          item.id,
                                          item.companyLogo,
                                          item.dealerVatDoc,
                                          item.dealerEjariDoc,
                                          item.dealerInsuranceDoc,
                                          item.dealerIdCard,
                                        );
                                      }}
                                    >
                                      <i className="fe fe-trash"></i>
                                    </a>
                                    {/* New Button */}
                                    <button
                                      className="btn btn-primary fs-14 text-white plus-icn"
                                      title="Add New Car"
                                      style={{ marginTop: 5 }}
                                      disabled
                                    >
                                      <Link
                                        className="fa fa-car"
                                        style={{ color: "white" }}
                                        to="/carDetailsForm"
                                        state={{ data: item }}
                                      ></Link>
                                    </button>
                                    {/* Invoice btn */}
                                    <div
                                      className="btn btn-gray fs-14 text-white file-icn"
                                      title="print invoice"
                                      style={{ marginTop: 5, marginLeft: 10 }}
                                    >
                                      <Link
                                        className="fa fa-print"
                                        style={{ color: "white" }}
                                        to="/invoiceTable"
                                        state={{ data: item }}
                                      ></Link>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })
                            :
                            <tr data-id="0">
                              <td data-field="id">No data</td>
                              <td data-field="name">No data</td>
                              <td data-field="age">No data</td>
                              <td data-field="gender">No data</td>
                              <td data-field="gender">No data</td>
                              <td data-field="gender">No data</td>
                              <td data-field="gender">No data</td>
                              <td style={{ width: 120 }}>No data</td>
                            </tr>
                          :
                          filterData.length > 0 ?
                            filterData.map((item, index) => {
                              return (
                                <tr
                                  data-id="1"
                                  key={index}
                                  style={{ cursor: "pointer" }}
                                >
                                  <td
                                    data-field="id"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    #{item.id}
                                  </td>
                                  <td
                                    data-field="name"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    {item.companyName} ({
                                      packageData.length > 0 ?
                                        packageData.map((data, key) => {
                                          return (
                                            <React.Fragment key={key}>{data.id == item.packageId ? data.packageName : ''}</React.Fragment>
                                          )
                                        })
                                        :
                                        item.packageId
                                    })

                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    <img
                                      src={`${host[0].hostUrl}/images/dealers-logo/${item.companyLogo}`}
                                      alt={item.companyLogo}
                                      onError={(e) => {
                                        e.target.src = imageErrorIcon;
                                      }}
                                      height={50}
                                      width={100}
                                      style={{ borderRadius: 5 }}
                                    />
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    {item.emailAddress}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    {item.contactNumber}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                      callingCitiesApi(item.cities);
                                    }}
                                  >
                                    <div className="progress mb-1">
                                      <div className={`progress-bar bg-info`} style={{ width: `${100 - expHandler(item.expiryDate, item.totalDays)}%` }}></div>
                                    </div>
                                    <span>
                                      {
                                        calculateRemainingDays(item.expiryDate) > 0
                                          ? `${calculateRemainingDays(item.expiryDate)} days left from ${item.totalDays}`
                                          : "Expired"
                                      }
                                    </span>
                                  </td>
                                  <td data-field="gender">
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
                                  <td style={{ width: 120 }}>
                                    <div
                                      className="btn btn-azure fs-14 text-white edit-icn"
                                      title="Edit"
                                    >
                                      <Link
                                        className="fe fe-edit"
                                        style={{ color: "white" }}
                                        to="/dealerEditForm"
                                        state={{ data: item }}
                                      ></Link>
                                    </div>
                                    <a
                                      className="btn btn-red fs-14 text-white trash-icn"
                                      title="trash"
                                      style={{ marginLeft: 10 }}
                                      onClick={() => {
                                        deleteRow(
                                          item.id,
                                          item.companyLogo,
                                          item.dealerVatDoc,
                                          item.dealerEjariDoc,
                                          item.dealerInsuranceDoc,
                                          item.dealerIdCard,
                                        );
                                      }}
                                    >
                                      <i className="fe fe-trash"></i>
                                    </a>
                                    {/* New Button */}
                                    <button
                                      className="btn btn-primary fs-14 text-white plus-icn"
                                      title="Add New Car"
                                      style={{ marginTop: 5 }}
                                      disabled
                                    >
                                      <Link
                                        className="fa fa-car"
                                        style={{ color: "white" }}
                                        to="/carDetailsForm"
                                        state={{ data: item }}
                                      ></Link>
                                    </button>
                                    {/* Invoice btn */}
                                    <div
                                      className="btn btn-gray fs-14 text-white file-icn"
                                      title="print invoice"
                                      style={{ marginTop: 5, marginLeft: 10 }}
                                    >
                                      <Link
                                        className="fa fa-print"
                                        style={{ color: "white" }}
                                        to="/invoiceTable"
                                        state={{ data: item }}
                                      ></Link>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })
                            :
                            <tr data-id="0">
                              <td data-field="id" colSpan={8} className="text-center p-5"><h4>No Record Found !</h4></td>
                            </tr>
                      }
                    </tbody>
                  </table>

                  {/* Pagination */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {
                      currentData.length > 0 && filterData.length < 1 && searchValue.trim() == "" ?
                        <>
                          <p style={{ marginBottom: 0 }}>{`Showing ${startIndex + 1} to ${endIndex > data.length ? data.length : endIndex} of ${data.length} entries`}</p>
                          <ul className="pagination">
                            <button
                              className={`paginate_button page-item previous ${currentPage == 1 ? 'disabled' : ''}`}
                              id="responsive-datatable_previous"
                              onClick={() => { changePage(currentPage - 1) }}
                              disabled={currentPage == 1 ? true : false}
                            >
                              <a
                                aria-controls="responsive-datatable"
                                data-dt-idx={0}
                                tabIndex={0}
                                className="page-link"
                              >
                                Previous
                              </a>
                            </button>

                            {Array.from({ length: totalPages }, (item, index) => (
                              <li className={`paginate_button page-item ${index + 1 == currentPage ? 'active' : ''}`} key={index} onClick={() => { changePage(index + 1) }}>
                                <a
                                  aria-controls="responsive-datatable"
                                  data-dt-idx={1}
                                  tabIndex={0}
                                  className="page-link"
                                >
                                  {index + 1}
                                </a>
                              </li>
                            ))}

                            <button
                              className={`paginate_button page-item next ${currentPage == totalPages ? 'disabled' : ''}`}
                              id="responsive-datatable_next"
                              onClick={() => { changePage(currentPage + 1) }}
                              disabled={currentPage == totalPages ? true : false}
                            >
                              <a
                                href="#"
                                aria-controls="responsive-datatable"
                                data-dt-idx={6}
                                tabIndex={0}
                                className="page-link"
                              >
                                Next
                              </a>
                            </button>
                          </ul>
                        </>
                        :
                        ''
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            style={{ backgroundColor: "none", width: 700 }}
          >
            <div
              className="modal-header"
              style={{
                backgroundColor: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h6 className="modal-title">Car Dealer details</h6>
              {modalData !== null ? (
                <div style={{ backgroundColor: "none" }}>
                  {modalData.facebookUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/facebook.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="fb-icon"
                      onClick={() => {
                        window.open(modalData.facebookUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {modalData.instagramUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/instagram.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="insta-icon"
                      onClick={() => {
                        window.open(modalData.instagramUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {modalData.twitterUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/twitter.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="twitter-icon"
                      onClick={() => {
                        window.open(modalData.twitterUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {modalData.youtubeUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/youtube.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="yt-icon"
                      onClick={() => {
                        window.open(modalData.youtubeUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {modalData.linkedinUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/linkedin.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="linkedin-icon"
                      onClick={() => {
                        window.open(modalData.linkedinUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {modalData.tiktokUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/tiktok.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="tiktok-icon"
                      onClick={() => {
                        window.open(modalData.tiktokUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
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
              )}
            </div>
            {modalStatus == true ? (
              <div className="modal-body">
                <img
                  src={`${host[0].hostUrl}/images/dealers-logo/${modalData.companyLogo}`}
                  alt={modalData.companyLogo}
                  onError={(e) => {
                    e.target.src = imageErrorIcon;
                  }}
                  height={50}
                  width={100}
                  style={{ borderRadius: 5, float: "right" }}
                />
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 30,
                  }}
                >
                  <b>Dealer Name:</b>
                  <p>{modalData.companyName}</p>
                </label>

                <div style={{ backgroundColor: "none", marginTop: 20 }}>
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
                      <b> Contact Number:</b>
                      <p>{modalData.contactNumber}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 70,
                      }}
                    >
                      <b> WhatsApp Number:</b>
                      <p>{modalData.whatsAppNumber}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        paddingLeft: 50,
                      }}
                    >
                      <b> Email Address:</b>
                      <p>{modalData.emailAddress}</p>
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
                      <b> Emirates ID:</b>
                      <p>{modalData.emiratesId == "" ? '-' : modalData.emiratesId}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 70,
                      }}
                    >
                      <b> Date Of Birth:</b>
                      <p>{modalData.dateOfBirth == "" ? '-' : modalData.dateOfBirth}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        paddingLeft: 50,
                      }}
                    >
                      <b> Nationality:</b>
                      <p>{modalData.nationality}</p>
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
                      <b> License Number:</b>
                      <p>{modalData.licenseNumber == '' ? '-' : modalData.licenseNumber}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 70,
                      }}
                    >
                      <b> Package Name:</b>
                      <p>
                        {
                          packageData.length > 0 ?
                            packageData.map((data, key) => {
                              return (
                                <React.Fragment key={key}>{data.id == modalData.packageId ? data.packageName : ''}</React.Fragment>
                              )
                            })
                            :
                            modalData.packageId
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
                        paddingLeft: 50,
                      }}
                    >
                      <b> Cars Limit:</b>
                      <p>{
                        packageData.length > 0 ?
                          packageData.map((data, key) => {
                            return (
                              <React.Fragment key={key}>{data.id == modalData.packageId ? data.carLimit : ''}</React.Fragment>
                            )
                          })
                          :
                          modalData.packageId
                      }</p>
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
                      <b> VAT Number:</b>
                      <p>{modalData.vatNumber == '' ? '-' : modalData.vatNumber}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 70,
                      }}
                    >
                      <b> Spoken Languages:</b>
                      <div style={{ display: "flex" }}>
                        {
                          modalData.languageSpoken.map((item, index) => {
                            return (
                              <p key={index} style={{ marginRight: 5 }}>
                                {item},
                              </p>
                            );
                          })
                        }
                      </div>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        paddingLeft: 50,
                      }}
                    >
                      <b> Expiry Date:</b>
                      <p>{modalData.expiryDate}</p>
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
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <b> Cities:</b>
                      <div style={{ display: "flex" }}>
                        {
                          citiesData.length > 0 ?
                            citiesData.map((item, index) => {
                              return (
                                <p key={index} style={{ marginRight: 5 }}>
                                  {item.cityName},
                                </p>
                              );
                            })
                            :
                            modalData.cities.map((item, index) => {
                              return (
                                <p key={index} style={{ marginRight: 5 }}>
                                  {item},
                                </p>
                              );
                            })
                        }
                      </div>
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
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <b> Delivery & Pickups:</b>
                      <div style={{ display: "flex" }}>
                        {
                          modalData.deliveryAndPickup.map((item, index) => {
                            return (
                              <p key={index} style={{ marginRight: 5 }}>
                                {item},
                              </p>
                            );
                          })
                        }
                      </div>
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
                    <b> Address:</b>
                    <p>{modalData.address}</p>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // marginTop: 10,
                      // backgroundColor: "red",
                    }}
                  >
                    <b> Description:</b>
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
                justifyContent: "space-between",
              }}
            >
              <div
                className="card my-1 custom-card mt-0 p-0 pb-0 mb-0 shadow-none"
                style={{ backgroundColor: "none", width: "50%" }}
              >
                {/* Porgress Bar */}

                {
                  modalData !== null ?
                    <>
                      <div className="progress mb-1">
                        <div className={`progress-bar bg-info`} style={{ width: `${100 - expHandler(modalData.expiryDate, modalData.totalDays)}%` }}></div>
                      </div>
                      <span>
                        {
                          calculateRemainingDays(modalData.expiryDate) > 0
                            ? `${calculateRemainingDays(modalData.expiryDate)} days left from ${modalData.totalDays}`
                            : "Expired"
                        }
                      </span>
                    </>
                    :
                    ''
                }

                {/* Porgress Bar */}
                {/* <div className="progress fileprogress h-auto ps-0 mb-2">
                  <div
                    className="progress-bar progress-bar-xs wd-15p"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      backgroundColor:
                        leftDays > 30
                          ? "green"
                          : leftDays > 60
                            ? "#59adec"
                            : leftDays > 90
                              ? "yellow"
                              : "red",
                      width: `${100 - leftDays}%`,
                    }}
                  ></div>
                </div> */}
                {/* <div className="text-muted font-weight-semibold tx-13 mb-1">
                  {leftDays > 0
                    ? `Dealer package expiry: only ${leftDays} days left`
                    : "Expired"}
                </div> */}
              </div>
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
    </>
  );
};

export default DealerTable;






