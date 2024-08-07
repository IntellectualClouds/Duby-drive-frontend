import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

//! Import Link from React Router Dom...
import { Link } from "react-router-dom";

//! Importing axios for fetching api...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing 404 Error Icon for image...
import imageErrorIcon from "../../../../../assets/icons/error.png";

const PackagesTable = () => {
  //! States...
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  //! Fetching Packages List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/packages`;

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

  //! Function for deleting Row...
  const deleteRow = async (id, logo) => {
    //! Calling Api for deleting Row By ID...

    let apiUrl = `${host[0].hostUrl}/api/delete/data/packages/row/byId`;

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
            data: { id, logo },
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
      const filterData = data.filter(({ id,packageName }) => (packageName.toLowerCase().includes(inputValue) || id.toString().includes(inputValue)));
      if (filterData.length > 0) {
        setFilterData(filterData);
      }
      else {
        setFilterData([]);
      }
    }
  };


  useEffect(() => {
    fetchingApi();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Packages</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Packages
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Packages List
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
          <Link to={"/packagesForm"} style={{ color: "white" }}>
            Add New Package
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
            <div className="card-header border-bottom" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 className="card-title">Packages List</h3>
                {
                  data.length > 0 ?
                    <div className="main-header-center ms-3 d-none d-xl-block" style={{ position: 'relative' }}>
                      <input autoCorrect="on" className="form-control" onChange={onChangeHandler} placeholder="Search Package..." type="search" style={{ paddingRight: 40 }} />
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
                        <th>Package Name</th>
                        <th>Description</th>
                        <th>Picture</th>
                        <th>Features</th>
                        <th>Currency</th>
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
                                <td data-field="id">{`#${item.id}`}</td>
                                <td
                                  data-field="name"
                                  style={{
                                    backgroundColor: "none",
                                    position: "relative",
                                  }}
                                >
                                  {item.packageName}
                                  <br/>
                                  ({item.packageDuration} Month)
                                </td>
                                <td
                                  data-field="age"
                                  style={{ width: 300, overflow: "hidden" }}
                                >
                                  {item.packageDescription}
                                </td>
                                <td data-field="age">
                                  <img
                                    src={`${host[0].hostUrl}/images/package-images/${item.logoUrl}`}
                                    alt={item.logoUrl}
                                    onError={(e) => {
                                      e.target.src = imageErrorIcon;
                                    }}
                                    height={60}
                                    // width={100}
                                  />
                                </td>
                                <td data-field="age">
                                  <tr>
                                    <th style={{ border: "none" }}>Car Limit:</th>
                                    <td style={{ border: "none" }}>
                                      {item.carLimit}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>Verified:</th>
                                    <td style={{ border: "none" }}>
                                      {item.verified == "verified" ? "Yes" : "No"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>Featured:</th>
                                    <td style={{ border: "none" }}>
                                      {item.featured == "featured" ? "Yes" : "No"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>Premium:</th>
                                    <td style={{ border: "none" }}>
                                      {item.premium == "premium" ? "Yes" : "No"}
                                    </td>
                                  </tr>
                                </td>
                                <td data-field="age">
                                  <tr>
                                    <th style={{ border: "none" }}>
                                      Sell Price:
                                    </th>
                                    <td style={{ border: "none" }}>
                                      {item.packageSellPrice}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>
                                      Offer Price:
                                    </th>
                                    <td style={{ border: "none" }}>
                                      {item.packageOfferPrice}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>Type:</th>
                                    <td style={{ border: "none" }}>
                                      {item.currencyType}
                                    </td>
                                  </tr>
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
                                      to="/packagesEditForm"
                                      state={{ data: item }}
                                    ></Link>
                                  </div>
                                  <a
                                    className="btn btn-red fs-14 text-white trash-icn"
                                    title="trash"
                                    style={{ marginLeft: 10 }}
                                    onClick={() => {
                                      deleteRow(item.id, item.logoUrl);
                                    }}
                                  >
                                    <i className="fe fe-trash"></i>
                                  </a>
                                </td>
                              </tr>
                              )
                            })
                            :
                            <tr data-id="1">
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
                                <tr data-id="1" key={index}>
                                <td data-field="id">{`#${item.id}`}</td>
                                <td
                                  data-field="name"
                                  style={{
                                    backgroundColor: "none",
                                    position: "relative",
                                  }}
                                >
                                  {item.packageName}
                                  <br/>
                                  ({item.packageDuration} Month)
                                </td>
                                <td
                                  data-field="age"
                                  style={{ width: 300, overflow: "hidden" }}
                                >
                                  {item.packageDescription}
                                </td>
                                <td data-field="age">
                                  <img
                                    src={`${host[0].hostUrl}/images/package-images/${item.logoUrl}`}
                                    alt={item.logoUrl}
                                    onError={(e) => {
                                      e.target.src = imageErrorIcon;
                                    }}
                                    height={60}
                                    // width={100}
                                  />
                                </td>
                                <td data-field="age">
                                  <tr>
                                    <th style={{ border: "none" }}>Car Limit:</th>
                                    <td style={{ border: "none" }}>
                                      {item.carLimit}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>Verified:</th>
                                    <td style={{ border: "none" }}>
                                      {item.verified == "verified" ? "Yes" : "No"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>Featured:</th>
                                    <td style={{ border: "none" }}>
                                      {item.featured == "featured" ? "Yes" : "No"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>Premium:</th>
                                    <td style={{ border: "none" }}>
                                      {item.premium == "premium" ? "Yes" : "No"}
                                    </td>
                                  </tr>
                                </td>
                                <td data-field="age">
                                  <tr>
                                    <th style={{ border: "none" }}>
                                      Sell Price:
                                    </th>
                                    <td style={{ border: "none" }}>
                                      {item.packageSellPrice}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>
                                      Offer Price:
                                    </th>
                                    <td style={{ border: "none" }}>
                                      {item.packageOfferPrice}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ border: "none" }}>Type:</th>
                                    <td style={{ border: "none" }}>
                                      {item.currencyType}
                                    </td>
                                  </tr>
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
                                      to="/packagesEditForm"
                                      state={{ data: item }}
                                    ></Link>
                                  </div>
                                  <a
                                    className="btn btn-red fs-14 text-white trash-icn"
                                    title="trash"
                                    style={{ marginLeft: 10 }}
                                    onClick={() => {
                                      deleteRow(item.id, item.logoUrl);
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
    </>
  );
};

export default PackagesTable;
