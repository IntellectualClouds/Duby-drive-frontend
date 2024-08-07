import React, { useState, useEffect } from "react";

//! Importing axios for fetching api...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate, useLocation, json } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

const InvoiceTable = () => {
  let location = useLocation();
  let navigation = useNavigate();

  //! States...
  const [data, setData] = useState([]);

  //! Fetching Customers List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/customers`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      console.log(response);
      if (response.status == 200) {
        setData(response.data.data.reverse());
      }
    } catch (error) {
      console.log("Something went wrong while fetching api:", error);
    }
  };

  //! Function for deleting Row...
  const deleteRow = async (id) => {
    console.log(`Item ID: ${id}`);

    //! Calling Api for deleting Row By ID...
    let apiUrl = `${host[0].hostUrl}/api/delete/data/customer/row/byId`;

    try {
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
        data: { id },
      });
      console.log(response);
      if (response.status == 200) {
        fetchingApi();
      }
    } catch (error) {
      console.log(
        "Something went wrong while deleting row from dataBase: ",
        error
      );
    }
  };

  const sendInvoice = async () => {
    let invoice = document.getElementById('invoice-card');
    let invoiceCode = invoice.innerHTML;

    try {
      let response = await axios({
        method: 'POST',
        url: `${host[0].hostUrl}/api/post/invoice/code`,
        data: { invoiceCode }
      });
      console.log(response);
      if (response.status == 200) {
        alert('Email sended successfully');
      }
    } catch (error) {
      console.log('Failed while calling api for sending email: ', error);
    }

  };

  useEffect(() => {
    // fetchingApi();
    console.log(location.state.data);
  }, []);

  return (
    <>
      <div className="row" style={{ marginTop: 20 }}>
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card" id="invoice-card">
              <div
                style={{
                  display: "flex",
                  // justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <img
                  src="https://app.khasdigital.com/image_2024-02-09_184303269.png"
                  // src={require("../../../../../assets/logo/logo-no background.png")}
                  style={{ height: 70, width: 70, marginRight: 10 }}
                />
                <h1 style={{ fontWeight: "500" }}>Duby Drive</h1>
              </div>
              {/* <div>
                  <h1 style={{ fontWeight: "bold",textAlign:'center' }}>Invoice</h1>
                </div> */}
              <div
                className="card-header border-bottom"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <h5 style={{ marginBottom: 2, fontWeight: "bold" }}>
                    Ms. {location.state.data.dealerName}
                  </h5>
                  <h5 style={{ marginBottom: 2 }}>
                    <span style={{ fontWeight: "bold" }}>Contact No: </span>{" "}
                    {location.state.data.contactNumber}
                  </h5>
                  <h5 style={{ marginBottom: 2 }}>
                    <span style={{ fontWeight: "bold" }}>Email: </span>{" "}
                    {location.state.data.emailAddress}
                  </h5>
                </div>

                <div>
                  <h1 style={{ fontWeight: "bold" }}>Invoice</h1>
                </div>

                <div>
                  <h5 style={{ marginBottom: 2 }}>
                    Invoice No. {location.state.data.id}
                  </h5>
                  <h5 style={{ marginBottom: 2 }}>
                    Invoice Date: {location.state.data.expiryDate}
                  </h5>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive export-table">
                  <table
                    id="editable-file-datatable"
                    className="table editable-table table-nowrap table-bordered table-edit wp-100"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: 100 }}>ID</th>
                        <th style={{ width: 300 }}>Package Details</th>
                        <th style={{ width: 100 }}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr data-id="1">
                        <td>#1</td>
                        <td>
                          Diamond Package, expiry 2024-01-21, cars limit. 12
                        </td>
                        <td>2300</td>
                      </tr>

                      <tr data-id="1">
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr data-id="1">
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr data-id="1">
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                      <tr data-id="1">
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                      <tr data-id="1">
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>

                      <tr data-id="1">
                        <th></th>
                        <th>Total:</th>
                        <th>2300 AED</th>
                      </tr>
                      <tr data-id="1">
                        <th>In words:</th>
                        <th colSpan={2}>Twenty Three Hundred Only</th>
                      </tr>
                      <tr data-id="1" id="btnRow">
                        <td
                          colSpan={3}
                          align="end"
                          style={{ backgroundColor: "none" }}
                        >
                          <div
                            className="btn btn-default"
                            style={{ marginRight: 5, float: 'left' }}
                            onClick={() => {
                              navigation('/carDealerTable');
                            }}
                          >
                            Back
                          </div>
                          <div
                            className="btn btn-primary"
                            style={{ marginRight: 5 }}
                          >
                            Pay Now
                          </div>
                          <div
                            className="btn btn-primary"
                            style={{ marginRight: 5 }}
                            onClick={() => {
                              document.getElementById(
                                "btnRow"
                              ).style.visibility = "hidden";
                              window.print();
                              document.getElementById(
                                "btnRow"
                              ).style.visibility = "visible";
                            }}
                          >
                            Print
                          </div>
                          {/* <div className="btn btn-primary">
                            Download PDF
                          </div> */}
                          <div
                            className="btn btn-primary"
                            style={{ marginRight: 5 }}
                            onClick={sendInvoice}
                          >
                            Send Invoice
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTable;





