import React, { useState, useEffect } from "react";
import "../../../../../index.css";
import Swal from 'sweetalert2'

//! Importing axios for fetching api...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing 404 Error Icon for image...
import imageErrorIcon from "../../../../../assets/icons/error.png";

const YachtTable = () => {
  //! States...
  const [data, setData] = useState([]);
  const [dealerData, setDealerData] = useState([]);

  const [filterData, setFilterData] = useState([]);

  //! Modal States...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [photosModalStatus, setPhotosModalStatus] = useState(false);
  const [photosModalData, setPhotosModalData] = useState([]);
  const [modalImageNumber, setModalImageNumber] = useState(0);

  //! Fetching Car Details List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/yachtDetails`;

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

  //! Function for deleting Row...
  const deleteRow = async (id, photosArray, videoName) => {
    //! Calling Api for deleting Row By ID...
    let apiUrl = `${host[0].hostUrl}/api/delete/data/yachtDetails/row/byId`;

    let videoStatus;
    if (videoName == null) {
      videoStatus = "no";
    } else {
      videoStatus = "yes";
    }

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
            data: { id, photosArray, videoName, videoStatus },
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
      const dealer = dealerData.find((data) => (data.companyName.toLowerCase().includes(inputValue)));

      const filterData = data.filter(({ id, yachtName,yachtType }) => (yachtName.toLowerCase().includes(inputValue) || id.toString().includes(inputValue) || yachtType.toLowerCase().includes(inputValue)));
      if (filterData.length > 0) {
        setFilterData(filterData);
      }
      else if (dealer) {
        const filteredByDealer = data.filter(({ dealerCompanyId }) => (dealerCompanyId == dealer.id));
        if (filteredByDealer.length > 0) {
          setFilterData(filteredByDealer);
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

  useEffect(() => {
    fetchingApi();
    fetchingDealersApi();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Yacht</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Yacht
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Yacht List
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
          <Link to={"/yachtForm"} style={{ color: "white" }}>
            Add More Yacht
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-bottom" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 className="card-title">Yacht List</h3>
                {
                  data.length > 0 ?
                    <div className="main-header-center ms-3 d-none d-xl-block" style={{ position: 'relative' }}>
                      <input autoCorrect="on" className="form-control" onChange={onChangeHandler} placeholder="Search Yacht or Boat..." type="search" style={{ paddingRight: 40 }} />
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
                        <th>Yacht Name</th>
                        <th>Yacht</th>
                        <th>Yacht Type</th>
                        <th>Dealer Company</th>
                        <th>Capacity</th>
                        <th>Size</th>
                        <th>Rooms</th>
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
                                    data-field="name"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.yachtName}
                                  </td>
                                  {
                                    item.yachtPhotosArray !== null ?
                                      <td
                                        data-field="age"
                                        onClick={() => {
                                          setPhotosModalStatus(true);
                                          setPhotosModalData(item.yachtPhotosArray);
                                        }}
                                      >
                                        <img
                                          src={`${host[0].hostUrl}/images/yacht-images/${item.yachtPhotosArray[0]}`}
                                          alt={item.yachtPhotosArray[0]}
                                          onError={(e) => {
                                            e.target.src = imageErrorIcon;
                                          }}
                                          height={50}
                                          width={100}
                                          style={{ borderRadius: 5 }}
                                        />
                                      </td>
                                      :
                                      <td
                                        data-field="age"
                                      >
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
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.yachtType}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {
                                      dealerData.length > 0 ?
                                        dealerData.map((data, key) => {
                                          return (
                                            <React.Fragment key={key}>{data.id == item.dealerCompanyId ? data.companyName : ''}</React.Fragment>
                                          )
                                        })
                                        :
                                        item.dealerCompanyId
                                    }
                                  </td>
                                  <td
                                    data-field="name"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.capacity}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.yachtSize}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.yachtRoom}
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
                                        to="/yachtEditForm"
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
                                          item.yachtPhotosArray,
                                          item.yachtVideoName
                                        );
                                      }}
                                    >
                                      <i className="fe fe-trash"></i>
                                    </a>
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
                              <td data-field="gender">No data</td>
                              <td data-field="gender">No data</td>
                              <td style={{ width: 120 }}>No data</td>
                            </tr>
                          :
                          filterData.length > 0 ?
                            filterData.map((item, index) => {
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
                                    data-field="name"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.yachtName}
                                  </td>
                                  {
                                    item.yachtPhotosArray !== null ?
                                      <td
                                        data-field="age"
                                        onClick={() => {
                                          setPhotosModalStatus(true);
                                          setPhotosModalData(item.yachtPhotosArray);
                                        }}
                                      >
                                        <img
                                          src={`${host[0].hostUrl}/images/yacht-images/${item.yachtPhotosArray[0]}`}
                                          alt={item.yachtPhotosArray[0]}
                                          onError={(e) => {
                                            e.target.src = imageErrorIcon;
                                          }}
                                          height={50}
                                          width={100}
                                          style={{ borderRadius: 5 }}
                                        />
                                      </td>
                                      :
                                      <td
                                        data-field="age"
                                      >
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
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.yachtType}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {
                                      dealerData.length > 0 ?
                                        dealerData.map((data, key) => {
                                          return (
                                            <React.Fragment key={key}>{data.id == item.dealerCompanyId ? data.companyName : ''}</React.Fragment>
                                          )
                                        })
                                        :
                                        item.dealerCompanyId
                                    }
                                  </td>
                                  <td
                                    data-field="name"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.capacity}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.yachtSize}
                                  </td>
                                  <td
                                    data-field="age"
                                    onClick={() => {
                                      setModalStatus(true);
                                      setModalData(item);
                                    }}
                                  >
                                    {item.yachtRoom}
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
                                        to="/yachtEditForm"
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
                                          item.yachtPhotosArray,
                                          item.yachtVideoName
                                        );
                                      }}
                                    >
                                      <i className="fe fe-trash"></i>
                                    </a>
                                  </td>
                                </tr>
                              )
                            })
                            :
                            <tr data-id="0">
                              <td data-field="id" colSpan={10} className="text-center p-5"><h4>No Record Found !</h4></td>
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
                {modalData !== null
                  ? `Yacht Details ID: ${modalData.id}`
                  : "Yacht Details"}
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
                  modalData.yachtPhotosArray !== null ?
                    <img
                      src={`${host[0].hostUrl}/images/yacht-images/${modalData.yachtPhotosArray[0]}`}
                      alt={modalData.yachtPhotosArray[0]}
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
                  <b>Yacht Name:</b>
                  <p>{modalData.yachtName}</p>
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
                      <b> Yacht Type:</b>
                      <p>{modalData.yachtType}</p>
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
                      <b> Dealer Company:</b>
                      <p>{
                        dealerData.length > 0 ?
                          dealerData.map((data, key) => {
                            return (
                              <React.Fragment key={key}>{data.id == modalData.dealerCompanyId ? data.companyName : ''}</React.Fragment>
                            )
                          })
                          :
                          modalData.dealerCompanyId
                      }</p>
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
                      <b>Captain Included:</b>
                      <p>{modalData.captainIncluded}</p>
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
                      <b>Locations:</b>
                      <p>{modalData.location}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Yacht Specs
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
                      <b>Capacity:</b>
                      <p>{modalData.capacity}</p>
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
                      <b>Yacht Size:</b>
                      <p>{modalData.yachtSize}</p>
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
                      <b>Yacht Rooms:</b>
                      <p>{modalData.yachtRoom}</p>
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
                      <b>Crew Members:</b>
                      <p>{modalData.crewMembers == true ? "Yes" : "No"}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Inclusions
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
                        flexDirection: "row",
                      }}
                    >
                      <b>Free Fuel:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.freeFuel == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Towels:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.towels == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Bbq & Services:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.bbqEquipmentAndServices == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "row",
                        marginLeft: 50,
                      }}
                    >
                      <b>Kids Welcome:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.kidsWelcome == true ? "Y" : "N"}
                      </p>
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
                        flexDirection: "row",
                      }}
                    >
                      <b>Ice & Beverages:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.iceWaterAndSoftDrinks == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Free Refreshment:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.freeRefreshment == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Fishing Equipment:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.fishingEquipment == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Safety Equipment:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.safetyEquipment == true ? "Y" : "N"}
                      </p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Amenities
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
                        flexDirection: "row",
                        textAlign: "start",
                      }}
                    >
                      <b>Bluetooth:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.bluetooth == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>USB Port:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.usbPort == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>AUX Cable:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.auxCable == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Microwave:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.microwave == true ? "Y" : "N"}
                      </p>
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
                        flexDirection: "row",
                        textAlign: "start",
                      }}
                    >
                      <b>Pillows & Blankets:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.pillowsAndBlankets == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Air Conditioning:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.airConditioning == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Shower:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.shower == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Cooler:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.cooler == true ? "Y" : "N"}
                      </p>
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
                        flexDirection: "row",
                        textAlign: "start",
                      }}
                    >
                      <b>Inside Speakers:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.insideSpeakers == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Outside Speakers:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.outsideSpeakers == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Audio System:</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.audioSystem == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Music System</b>
                      <p
                        style={{
                          color: "red",
                          paddingLeft: 3,
                          fontWeight: "500",
                        }}
                      >
                        {modalData.musicSystem == true ? "Y" : "N"}
                      </p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Rental Period & Pricing:
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
                      <b>Per Hour:</b>
                      <p>{modalData.perHourRentalCost}</p>
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
                      <b>Weekly Rental Cost:</b>
                      <p>{modalData.weeklyRentalCost}</p>
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
                        {modalData.yachtVideoName == null
                          ? "-"
                          : modalData.yachtVideoName}
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
                    {/* <b> OverView:</b> */}
                    <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                      Overview
                    </h6>
                    <p dangerouslySetInnerHTML={{ __html: modalData.yachtOverview }}></p>
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
              <h6 className="modal-title">Yacht Photos</h6>
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
                    src={`${host[0].hostUrl}/images/yacht-images/${photosModalData[modalImageNumber]}`}
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

export default YachtTable;
