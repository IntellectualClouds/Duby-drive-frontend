import React from "react";

//! Importing Page Main Components...
import Header from "../Main/Header/header.jsx";
import Sidebar from "../Main/SideBar/sideBar.jsx";
import AppContentOpen from "../Main/AppContentOpen/appContentOpen.jsx";

//! Importing Page Components...
import LanguageModal from "../Main/Modal/modal.jsx";
import Footer from "../Main/Footer/footer.jsx";

const MainComponent = () => {
    return (
        <>
            <h1>Main Component</h1>

            <div className="page">
                <div className="page-main">
                    <Header />
                    <Sidebar />
                    <AppContentOpen />
                </div>

                <LanguageModal />
                <Footer />
            </div>
        </>
    );
};

export default MainComponent;