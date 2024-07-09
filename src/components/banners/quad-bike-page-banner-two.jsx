import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuadBikePageBannerTwo = () => {

    const [bannerData, setBannerData] = useState([]);
    const [bannerNumber,setBannerNumber] = useState(2);

    const fetchingBannerApi = async () => {
        let pageName = "Quad Biking Page";
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
                {bannerData.length > 0 ?
                    bannerData.map((item, index) => {
                        return (
                            <div key={index} dangerouslySetInnerHTML={{ __html: item.bannerNumber == bannerNumber ? item.bannerHTML : '' }}></div>
                        )
                    })
                    :
                    ''
                }
        </>
    );
};

export default QuadBikePageBannerTwo;