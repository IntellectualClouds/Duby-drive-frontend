import React, { useState, useRef } from "react";
import "../../../index.css";
import Swal from "sweetalert2";
import useApi from "../../../hooks/useApi";
import apiClient from "../../../api/apiClient";
import { useNavigate } from "react-router-dom";
import host from "../../../enviroment-file/enviroment-file";
import ReCAPTCHA from "react-google-recaptcha";

const LoginScreen = () => {
  let navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const captchaRef = useRef();

  const [btnDisabled, setBtnDisabled] = useState(true);

  const { request, loading, error } = useApi((submitData) =>
    apiClient.post("/api/auth/login", submitData)
  );

  const loginAccount = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "" || captchaValue === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to login your account!",
        text: "Please enter valid email or correct password",
        showConfirmButton: true,
        timer: 4000,
        customClass: {
          confirmButton: "btn btn-danger",
        },
        willClose: () => {
          setBtnDisabled(false);
        },
      });
    } else {
      request({ email: email.trim(), password: password.trim() })
        .then((response) => {
          localStorage.setItem("ud", JSON.stringify(response.data.result));

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Congratulations, Login successfully!",
            text: "Please wait we are directing you to your dashboard",
            showConfirmButton: true,
            timer: 4000,
            customClass: {
              confirmButton: "btn btn-primary",
            },
            willClose: () => {
              setCaptchaValue("");
              setEmail("");
              setPassword("");
              captchaRef.current.reset();
              navigation("/");
            },
          });
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Failed while login your account!",
              text: `${error.response.data.message} Please enter correct details`,
              showConfirmButton: true,
              timer: 4000,
              customClass: {
                confirmButton: "btn btn-danger",
              },
              willClose: () => {
                setBtnDisabled(false);
              },
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Failed to login your account!",
              text: "Something went wrong from server side",
              showConfirmButton: true,
              timer: 4000,
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
          }
        });
    }
  };

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
          width: "100%",
        }}
      >
        <img
          src={require("../../../assets/logo/logo.png")}
          className="header-brand-img"
          alt="logo"
          style={{ height: 80, width: 80, marginBottom: 20 }}
        />
        <div className="wrap-login100 p-0">
          <div className="card-body">
            <form className="login100-form validate-form">
              <span className="login100-form-title">Login</span>
              <div
                className="wrap-input100 validate-input"
                data-bs-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="zmdi zmdi-email" aria-hidden="true"></i>
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-bs-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                </span>
              </div>

              {/* Google ReCaptcha */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_USER_ReCAPTCHA}
                  onChange={(value) => {
                    setCaptchaValue(value);
                    setBtnDisabled(false);
                  }}
                  ref={captchaRef}
                />
              </div>

              {/* Forget Password Link */}
              <div className="text-end pt-1">
                <p className="mb-0">
                  <button
                    onClick={() => {
                      navigation("/forgetPassScreen");
                    }}
                    className="text-primary ms-1"
                  >
                    Forgot Password?
                  </button>
                </p>
              </div>

              {/* Login Account Btn */}
              <button
                className="container-login100-form-btn"
                disabled={btnDisabled}
                style={{
                  cursor: btnDisabled ? "not-allowed" : "pointer",
                }}
                type="button"
                onClick={loginAccount}
              >
                <a className="login100-form-btn btn-primary">Login</a>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
