import React, { useEffect, useState } from "react";
import "../../../../../index.css";
import Swal from "sweetalert2";

//! Import Link from React Router Dom...
import { Link, useNavigate, useLocation } from "react-router-dom";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const RoleEditForm = () => {
    let location = useLocation();
    let navigation = useNavigate();

    //! Form States...
    const [roleName, setRoleName] = useState("");
    const [status, setStatus] = useState(true);
    const [rowID, setRowID] = useState(Number);

    const [btnDisable, setBtnDisable] = useState(false);

    //! Calling Api for edit car feature data...
    const apiCall = async (role, status, id) => {
        let apiUrl = `${host[0].hostUrl}/api/put/data/role/update/byId`;

        try {
            let response = await axios({
                method: "PUT",
                url: apiUrl,
                data: { role, status, id },
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
                        setRoleName("");
                        setStatus(true);
                        setRowID(Number);
                        navigation("/roleTable");
                    },
                });
            }
        } catch (error) {
            // console.log(
            //   "Something went wrong while updating data in dataBase: ",
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

    //! Fucntion for update data in dataBase...
    const editRoleData = async (e) => {
        e.preventDefault();
        if (roleName.trim() == "" || !rowID) {
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
            let statusValue;
            if (status == true) {
                statusValue = "active";
            } else {
                statusValue = "inActive";
            }
            setBtnDisable(true);
            apiCall(roleName.trim(), statusValue, rowID);
        }
    };

    useEffect(() => {
        // console.log(location.state.data);
        setRowID(location.state.data.id);
        setRoleName(location.state.data.roleName);
    }, []);

    return (
        <>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Roles</h1>
                </div>
                <div className="ms-auto pageheader-btn">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
                            Roles
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit Form
                        </li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="card">
                        <div className="card-header border-bottom">
                            <h3 className="card-title">Edit Form</h3>
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
                                <div className="col-md-6">
                                    <label htmlFor="validationCustom01" className="form-label">
                                        Edit Role Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="validationCustom01"
                                        required
                                        value={roleName}
                                        onChange={(e) => {
                                            setRoleName(e.target.value);
                                        }}
                                        style={{
                                            borderColor:
                                                roleName.trim().length < 2 ? "red" : "#8fbd56",
                                        }}
                                    />
                                    {roleName.trim().length < 2 ? (
                                        <label
                                            htmlFor="validationCustom01"
                                            className="form-label"
                                            style={{
                                                color: "red",
                                                fontWeight: "400",
                                                paddingLeft: 10,
                                            }}
                                        >
                                            Please enter updated role name
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
                                <div className="col-12">
                                    <div className="btn btn-default" style={{ marginRight: 10 }}>
                                        <Link to={"/roleTable"}>Cancel</Link>
                                    </div>
                                    <button className="btn btn-primary" onClick={editRoleData} disabled={btnDisable}>
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

export default RoleEditForm;
