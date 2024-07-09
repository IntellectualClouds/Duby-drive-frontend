import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="error-page text-white background-transparent">
                <div className="col-md-6 section-one">
                    <h1 className='text-center'>Something's missing.</h1>
                    <p className='text-center'>Looks like this page is missing. Don't worry though, our best team is on the case.</p>
                    <button className="btn primary_background_color text-white" onClick={()=>{navigate(-1)}}>Go Back</button>
                </div>
                <div className="col-md-6 section-two">
                    <h1>404</h1>
                    <p>Not Found</p>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;