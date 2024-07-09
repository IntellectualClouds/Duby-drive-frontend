import React from 'react';
import { useNavigate } from 'react-router-dom';

const SectionThirteen = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='home-section-thirteen text-white'>
                <div className='section-thirteen-content'>
                    <h2 className='text-center'>ARE YOU A CAR RENTAL COMPANY? JOIN US.</h2>
                    <p onClick={()=>{navigate('/add_your_own_vehicle')}} className='page-links text-center'>List your cars with the UAE's biggest car rental & leasing marketplace today!</p>
                </div>
            </div>
        </>
    );
};

export default SectionThirteen;