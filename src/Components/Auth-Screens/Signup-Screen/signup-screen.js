import React from "react";

const SignupScreen = () => {
  return (
    <>
      <div className="page" style={{backgroundColor:'#8fbd56',height:'100%',width:'100%',position:'absolute',top:0,zIndex:9999,left:0}}>
        <div>
          <div className="col col-login mx-auto text-center">
            <a href="index.html">
              <img
                src="../assets/images/brand/logo.png"
                className="header-brand-img"
                alt=""
              />
            </a>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-0">
              <div className="card-body">
                <form className="login100-form validate-form">
                  <span className="login100-form-title">Registration</span>
                  <div
                    className="wrap-input100 validate-input"
                    data-bs-validate="Valid email is required: ex@abc.xyz"
                  >
                    <input
                      className="input100"
                      type="text"
                      name="email"
                      placeholder="User name"
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="mdi mdi-account" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-bs-validate="Valid email is required: ex@abc.xyz"
                  >
                    <input
                      className="input100"
                      type="text"
                      name="email"
                      placeholder="Email"
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-bs-validate="Valid email is required: ex@abc.xyz"
                  >
                    <input
                      className="input100"
                      type="number"
                      name="number"
                      placeholder="Contact Number"
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-phone" aria-hidden="true"></i>
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
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <label className="custom-control custom-checkbox mt-4">
                    <input type="checkbox" className="custom-control-input" />
                    <span className="custom-control-label">
                      Agree the <a href="terms.html">terms and policy</a>
                    </span>
                  </label>
                  <div className="container-login100-form-btn">
                    <a
                      href="index.html"
                      className="login100-form-btn btn-primary"
                    >
                      Register
                    </a>
                  </div>
                  <div className="text-center pt-3">
                    <p className="text-dark mb-0">
                      Already have account?
                      <a href="loginScreen" className="text-primary ms-1">
                        Sign In
                      </a>
                    </p>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-center my-3">
                  <a className="social-login  text-center me-4">
                    <i className="fa fa-google"></i>
                  </a>
                  <a className="social-login  text-center me-4">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a className="social-login  text-center">
                    <i className="fa fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupScreen;
