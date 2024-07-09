import React from 'react';

const PageImageHeader = ({heading}) => {
    return (
        <>
            <div className='page-image-header'>
                    <h1 className='text-center m-1'>{heading || 'Page Heading'}</h1>
            </div>
        </>
    )
}

export default PageImageHeader;