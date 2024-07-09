import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePageBannerThree = () => {

    const [bannerData, setBannerData] = useState([]);
    const [bannerNumber,setBannerNumber] = useState(3);

    const fetchingBannerApi = async () => {
        let pageName = "Home Page";
        try {
            let response = await axios({
                method: "POST",
                url: `${process.env.React_App_Host_Url}/api/get/data/banner/by/page/name`,
                data: { pageName }
            });
            // console.log(response);
            if (response.status == 200) {
                setBannerData(response.data.data);
            }
        } catch (error) {
            console.log('Failed while fetching banner api by page name: ', error);
        }
    };

    useEffect(() => {
        fetchingBannerApi();
    }, []);

    return (
        <>
            <div className='banner-container mb-0 mt-4'>
                {bannerData.length > 0 ?
                    bannerData.map((item, index) => {
                        return (
                            <div style={{ width: '85%' }} key={index} dangerouslySetInnerHTML={{ __html: item.bannerNumber == bannerNumber ? item.bannerHTML : '' }}></div>
                        )
                    })
                    :
                    ''
                }
            </div>
        </>
    );
};

export default HomePageBannerThree;