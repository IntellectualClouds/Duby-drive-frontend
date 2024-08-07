import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <h2 style={{ color: "black" }}>404 error</h2>
        <h5>Oops! Some error has occured, Requested page not found!</h5>

        <div className="btn btn-primary" onClick={() => {}}>
          <Link to={'/'} style={{color:'white'}}>Go to DashBoard</Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
