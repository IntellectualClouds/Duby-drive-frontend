import React from "react";

const LanguageModal = () => {
    return (
        <>
            {/* <!-- Country-selector modal--> */}
            <div className="modal fade" id="country-selector">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content country-select-modal">
                        <div className="modal-header">
                            <h6 className="modal-title">Choose Country</h6><button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button>
                        </div>
                        <div className="modal-body">
                            <ul className="row row-sm p-3">
                                <li className="col-lg-4 mb-2">
                                    <a className="btn btn-country btn-lg btn-block active">
                                        <span className="country-selector"><img alt="unitedstates" src="../assets/images/flags/us_flag.jpg" className="me-2 language" /></span>United States
                                    </a>
                                </li>
                                <li className="col-lg-4 mb-2">
                                    <a className="btn btn-country btn-lg btn-block">
                                        <span className="country-selector"><img alt="uae" src="../assets/images/flags/uae_flag.jpg" className="me-2 language" /></span>UAE
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- /Country-selector modal--> */}
        </>
    );
};

export default LanguageModal;