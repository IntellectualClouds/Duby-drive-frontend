import React from "react";

//! Importing React Router (For Smooth Navigations)...
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//! Importing Auth Screens Components...
import LoginScreen from "./Login-Screen/login-screen";
import SignupScreen from "./Signup-Screen/signup-screen";
import ForgetPassScreen from "./ForgetPassScreen/forget-pass-screen";

//! Importing Error Component...
import ErrorPage from "../ErrorPage/error-page";

const AuthScreens = () => {
    return (
        <>
            {/* <Router> */}
            <Routes>
                <Route path='/' element={<LoginScreen />} />
                <Route path='forgetPassScreen' element={<ForgetPassScreen />} />
                {/* <Route path='signUpScreen' element={<SignupScreen />} /> */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            {/* </Router> */}
        </>
    );
};

export default AuthScreens;