import React, { useEffect, useState, useRef } from "react";
import "../../../index.css";
import Swal from "sweetalert2";

//! Importing Phone Number Input...
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//! Importing axios for fetching api...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../assets/icons/404-error.png";
import successIcon from "../../../assets/icons/success-icon.png";

//! Importing Firebase reCaptcha & more for phone number verification...
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase/setup";

const ForgetPassScreen = () => {
  let navigation = useNavigate();

  //! States...
  const [email, setEmail] = useState("");
  const [userContactNumber, setUserContactNumber] = useState("");

  const [emailFindData, setEmailFindData] = useState(null);

  //! Phone Number Verification states....
  const [userConfirmation, setUserConfirmation] = useState(null);
  const [userOtp, setUserOtp] = useState("");
  const [userOtpSendStatus, setUserOtpSendStatus] = useState("");

  //! Login Button State for disable...
  const [btnDisabled, setBtnDisabled] = useState(true);

  //! Function for sending otp to user phone number using firebase...
  const sendOtp = async (e) => {
    e.preventDefault();
    if (userContactNumber.trim().length == 13) {
      if (userContactNumber.trim() == emailFindData.userContactNumber) {
        try {
          const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
          const confirmation = await signInWithPhoneNumber(
            auth,
            userContactNumber,
            recaptcha
          );
          // console.log("Confirmation: ", confirmation);
          setUserConfirmation(confirmation);
          setUserOtpSendStatus("success");
        } catch (error) {
          // console.log(
          //   "Something went wrong while sending otp to user phone number: ",
          //   error
          // );
          setUserOtpSendStatus("failed");
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Incorrect Phone number, The phone number you entered is not associated with your account",
          text: "Please enter correct phone number which is associated to your account",
          showConfirmButton: true,
          timer: 4000,
          customClass: {
            confirmButton: 'btn btn-danger'
          },
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Cannot process your entry!",
        text: "Please enter valid phone number or select your country code",
        showConfirmButton: true,
        timer: 4000,
        customClass: {
          confirmButton: 'btn btn-danger'
        },
      });
    }
  };

  //! Function for verifying user otp...
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      let verifyOtp = await userConfirmation.confirm(userOtp);
      // console.log("Otp verified: ", verifyOtp);
      if (verifyOtp) {
        alert("otp verified successfully");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Cannot process your entry!",
          text: "Something went wrong while verifying your OTP, Please try again later",
          showConfirmButton: true,
          timer: 4000,
          customClass: {
            confirmButton: 'btn btn-danger'
          },
        });
      }
    } catch (error) {
      // console.log(`Something went wrong while verifying otp: `, error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Cannot process your entry!",
        text: "Failed while verifying your OTP, Invalid OTP or expired",
        showConfirmButton: true,
        timer: 4000,
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        willClose: () => {
          setBtnDisabled(false);
        },
      });
    }
  };

  //! Calling Api for searching email...
  const apiCall = async (email) => {
    let apiUrl = `${host[0].hostUrl}/api/search/email/for/forget/Pass`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { email },
      });
      // console.log(response);
      if (response.status == 200) {
        setEmail("");
        alert(response.data.message);
        setEmailFindData(response.data.data);
      }
    } catch (error) {
      //   console.log(
      //     "Something went wrong while finding user at this email: ",
      //     error
      //   );
      if (error.response) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to find your account!",
          text: `${error.response.data.message} Please enter correct email`,
          showConfirmButton: true,
          timer: 4000,
          customClass: {
            confirmButton: 'btn btn-danger'
          },
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to find your account!",
          text: "Something went wrong from server site",
          showConfirmButton: true,
          timer: 4000,
          customClass: {
            confirmButton: 'btn btn-danger'
          },
        });
      }
    }
  };

  //! Function for login account...
  const searchEmail = (e) => {
    e.preventDefault();

    if (email.trim() == "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to find your email!",
        text: "Please enter valid email, Make sure you will enter valid details",
        showConfirmButton: true,
        timer: 4000,
        customClass: {
          confirmButton: 'btn btn-danger'
        },
      });
    } else {
      apiCall(email.trim());
    }
  };

  useEffect(() => {
    // console.log("Upated confirmation: ", userConfirmation);
  }, [userConfirmation]);

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(143, 189, 86, 0.9)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          // position: "absolute",
          width: "100%",
        }}
      >
        <img
          src={require("../../../assets/logo/logo.png")}
          className="header-brand-img"
          alt="logo"
          style={{ height: 80, width: 80, marginBottom: 20 }}
        />
        {/* Forget Pass Screen */}
        <div className="row" style={{ backgroundColor: "none" }}>
          <div className="col col-login mx-auto">
            <form
              className="card shadow-none"
              method="post"
              style={{ backgroundColor: "none" }}
            >
              <div className="card-body" style={{ backgroundColor: "none" }}>
                <div className="text-center">
                  <span className="login100-form-title">
                    {emailFindData == null ? "Forgot Password" : "Verification"}
                  </span>
                  {userOtpSendStatus !== "success" ? (
                    <p className="text-muted">
                      {emailFindData == null
                        ? "Enter the email address registered on your account"
                        : "Enter the phone number associated with your account"}
                    </p>
                  ) : (
                    <p className="text-muted">
                      Enter the 6 digits OTP to verify your account
                    </p>
                  )}
                </div>
                <div className="pt-3" id="forgot">
                  <div
                    className="form-group"
                    style={{
                      display: emailFindData !== null ? "none" : "block",
                    }}
                  >
                    <label className="form-label" htmlFor="eMail">
                      Email:
                    </label>
                    <input
                      className="form-control"
                      id="eMail"
                      placeholder="Enter Your Email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  {userConfirmation == null ? (
                    <>
                      {/* Phone number */}
                      <div
                        className="form-group"
                        style={{
                          display: emailFindData == null ? "none" : "block",
                        }}
                      >
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                        >
                          Phone Number
                        </label>
                        <div
                          style={{
                            backgroundColor: "none",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <PhoneInput
                            country={"pk"}
                            value={userContactNumber}
                            onlyCountries={["pk", "us", "ae"]}
                            containerStyle={{
                              width: "75%",
                            }}
                            inputStyle={{ width: "100%" }}
                            dropdownStyle={{
                              marginLeft: 200,
                            }}
                            onChange={(e) => {
                              setUserContactNumber("+" + e);
                            }}
                          />
                          {/* Send Otp Button */}
                          <button
                            className="btn btn-default"
                            onClick={(e) => {
                              sendOtp(e);
                            }}
                            id="otpSendBtn"
                            disabled={
                              userContactNumber.length < 13 ? true : false
                            }
                            style={{
                              cursor:
                                userContactNumber.length !== 13
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            Send Otp
                          </button>
                        </div>
                        {userContactNumber.trim().length < 13 ? (
                          <label
                            htmlFor="validationCustom01"
                            className="form-label"
                            style={{
                              color: "red",
                              fontWeight: "400",
                              paddingLeft: 10,
                            }}
                          >
                            Select your country & enter number
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
                            {userOtpSendStatus == ""
                              ? "Looks good"
                              : "Failed while sending OTP"}
                          </label>
                        )}
                        <div className="valid-feedback">Looks good!</div>
                      </div>
                      {/* reacptcha */}
                      <div
                        id="recaptcha"
                        style={{
                          backgroundColor: "none",
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: 10,
                        }}
                      ></div>
                    </>
                  ) : (
                    <>
                      {/* Otp Verify */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="eMail">
                          Enter 6 digits OTP
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="validationCustom01"
                          required
                          value={userOtp}
                          onChange={(e) => {
                            setUserOtp(e.target.value);
                          }}
                        />
                        {userOtp.trim().length < 6 ? (
                          <label
                            htmlFor="validationCustom01"
                            className="form-label"
                            style={{
                              color: "red",
                              fontWeight: "400",
                              paddingLeft: 10,
                            }}
                          >
                            Please enter correct otp
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
                    </>
                  )}

                  {/* Button */}
                  <div
                    className="submit"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {emailFindData == null ? (
                      <button
                        className="btn btn-primary p-1"
                        style={{ width: "100%" }}
                        onClick={(e) => {
                          searchEmail(e);
                        }}
                        disabled={email.trim().length < 8 ? true : false}
                      >
                        Search Email
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary p-2"
                        style={{ width: "80%" }}
                        onClick={(e) => {
                          verifyOtp(e);
                        }}
                        disabled={userOtpSendStatus == "success" ? false : true}
                      >
                        Verify Otp
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="card-footer">
                <div className="text-center mt-2">
                  <p className="text-dark mb-2" style={{ cursor: "pointer" }}>
                    Go back to
                    <a
                      className="text-primary ms-1"
                      onClick={() => navigation("/")}
                    >
                      Login Screen ?
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassScreen;
