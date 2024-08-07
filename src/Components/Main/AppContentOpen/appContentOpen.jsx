import React from "react";

//! Importing Routes Component...
import App_Routes from "./Routes/routes";

const AppContentOpen = () => {
    return (
        <>
            <div className="app-content main-content mt-5">
                <div className="side-app">
                    {/* <!-- CONTAINER --> */}
                    <div className="main-container container-fluid">
                        {/* <h1 style={{ color: 'red' }}>App Content Open</h1> */}
                        <App_Routes/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppContentOpen;