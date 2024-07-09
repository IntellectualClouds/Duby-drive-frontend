import React from 'react';

import upIcon from "../../assets/icons/up-arrow.png";

const TopBtn = () => {
    return (
        <>
            <a href="#" id="back-to-top" className='top-btn'><img src={upIcon} alt="up-icon" className='top-btn-icon' /></a>
        </>
    );
};

export default TopBtn;