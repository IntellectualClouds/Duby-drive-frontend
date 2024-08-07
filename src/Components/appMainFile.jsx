import React, { useEffect, useState } from "react";

//! Importing React Router (For Smooth Navigations)...
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//! Importing Main Component...
import MainComponent from "./Main/main";

//! Importing Auth Screen Component...
import AuthScreens from "./Auth-Screens/authScreens";
import LoginScreen from "./Auth-Screens/Login-Screen/login-screen";
import ForgetPassScreen from "./Auth-Screens/ForgetPassScreen/forget-pass-screen";

//! Importing Error Component...
import ErrorPage from "./ErrorPage/error-page";

const AppMainComponent = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState("");
  //! Function for getting data from local storage...
  const getData = async () => {
    let data = await localStorage.getItem("ud");
    if (data) {
      // console.log("Data: ", data);
      let convertDataIntoJSON = await JSON.parse(data);
      setUserData(convertDataIntoJSON);
      console.log(convertDataIntoJSON, "test");
      setUserRole(convertDataIntoJSON.role);
    } else {
      // console.log("Data not found in local storage");
      setUserData(null);
      setUserRole("");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  // useEffect(() => {
  //   console.log('User role :', userRole);
  // }, [userRole]);

  return (
    <>
      <Router>
        {userRole == "" ? (
          <Routes>
            <Route path="/" element={<AuthScreens />}>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<MainComponent />}>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        )}
      </Router>
    </>
  );
};

export default AppMainComponent;
