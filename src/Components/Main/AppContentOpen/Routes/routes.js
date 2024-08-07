import React from "react";

//! Importing React Router (For Smooth Navigations)...
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//! Importing App Components...
import DashBoardTable from "./DashBoard/dashboard-list";

//! Car Brand Components...
import CarBrandForm from "./CarBrands/car-brand-add";
import CarBrandEditForm from "./CarBrands/car-brand-edit";
import CarBrandTable from "./CarBrands/car-brand-list";

//! Importing Car Type Components...
import CarTypeForm from "./CarTypes/car-type-add";
import CarTypeTable from "./CarTypes/car-type-list";
import CarTypeEditForm from "./CarTypes/car-type-edit";

//! Importing Car Features Components...
import CarFeatureForm from "./CarFeatures/car-feature-add";
import CarFeatureTable from "./CarFeatures/car-feature-list";
import CarFeatureEditForm from "./CarFeatures/car-feature-edit";

//! Importing Cities Components...
import CitiesForm from "./Cities/cities-add";
import CitiesTable from "./Cities/cities-list";
import CitiesEditForm from "./Cities/cities-edit";

//! Importing Area Components...
import AreaForm from "./Areas/area-add";
import AreaTable from "./Areas/area-list";
import AreaEditForm from "./Areas/area-edit";

//! Importing Packages Components...
import PackagesForm from "./Packages/packages-add";
import PackagesTable from "./Packages/packages-list";
import PackageEdiForm from "./Packages/packages-edit";

//! Importing Package Details Components...
import PackageDetailsForm from "./PackagesDetails/packagesDetails-add";
import PackageDetailsTable from "./PackagesDetails/packagesDetails-list";
import PackageDetailsEditForm from "./PackagesDetails/packagesDetails-edit";

//! Importing Faq Components...
import FaqForm from "./Faq/faq-add";
import FaqTable from "./Faq/faq-list";
import FaqEditForm from "./Faq/faq-edit";

//! Importing Dealer Components...
import DealerForm from "./Dealers/dealer-add";
import DealerTable from "./Dealers/dealer-list";
import DealerEditForm from "./Dealers/dealer-edit";

//! Importing Invoice Table...
import InvoiceTable from "./Invoice/invoice-list";

//! Importing Car Details Components...
import CarDetailsForm from "./CarDetails/car-details-add";
import CarDetailsTable from "./CarDetails/car-details-list";
import CarDetailsEditForm from "./CarDetails/car-details-edit";

//! Importing Yacht Components...
import YachtForm from "./Yacht/yacht-add";
import YachtTable from "./Yacht/yacht-list";
import YachtEditForm from "./Yacht/yacht-edit";

//! Importing User Components...
import UserForm from "./User/user-add";
import UserTable from "./User/user-list";
import UserEditForm from "./User/user-edit";

//! Importing Desert Safari Components...
import DesertSafariForm from "./DesertSafari/desert-safari-add";
import DesertSafariTable from "./DesertSafari/desert-safari-list";
import DesertSafariEditForm from "./DesertSafari/desert-safari-edit";

//! Importing Drivers Components...
import SafeDriversForm from "./SafeDrivers/safe-drivers-add";
import SafeDriversTable from "./SafeDrivers/safe-drivers-list";
import SafeDriversEditForm from "./SafeDrivers/safe-drivers-edit";

//! Importing Quad Bike Components...
import QuadBikeForm from "./QuadBiking/quad-biking-add";
import QuadBikeTable from "./QuadBiking/quad-biking-list";
import QuadBikeEditForm from "./QuadBiking/quad-biking-edit";

//! Importing Tables...
import ContactFormTable from "./Tables/contact-form/contact-form-table";
import DriverServiceFormTable from "./Tables/driver-service-form/driver-service-form-table";
import DealerDataTable from "./Tables/dealer-data-form/dealer-data-table";
import ReportDetailsTable from "./Tables/report-details-table/report-details-form-table";
import TourBookingsTable from "./Tables/tour-bookings/tour-bookings-table";

//! Importing Banner Components...
import BannerForm from "./Banners/banner-add";
import BannerTable from "./Banners/banner-list";
import BannerEditForm from "./Banners/banner-edit";

//! Importing Role Components...
import RoleForm from "./Roles/role-add";
import RoleTable from "./Roles/role-list";
import RoleEditForm from "./Roles/role-edit";

//! Importing Navigations Components...
import NavigationTable from "./Navigations/navigation-list";
import NavigationForm from "./Navigations/navigation-add";
import NavigationEditForm from "./Navigations/navigation-edit";

//! Importing Error Page...
import ErrorPage from "../../../ErrorPage/error-page";

const App_Routes = () => {
  return (
    <>
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<DashBoardTable />} />

        <Route path="carBrandForm" element={<CarBrandForm />} />
        <Route path="carBrandTable" element={<CarBrandTable />} />
        <Route path="carBrandEditForm" element={<CarBrandEditForm />} />

        <Route path="carTypeForm" element={<CarTypeForm />} />
        <Route path="carTypeTable" element={<CarTypeTable />} />
        <Route path="carTypeEditForm" element={<CarTypeEditForm />} />

        <Route path="carFeaturesForm" element={<CarFeatureForm />} />
        <Route path="carFeaturesTable" element={<CarFeatureTable />} />
        <Route path="carFeaturesEditForm" element={<CarFeatureEditForm />} />

        <Route path="citiesForm" element={<CitiesForm />} />
        <Route path="citiesTable" element={<CitiesTable />} />
        <Route path="citiesEditForm" element={<CitiesEditForm />} />

        <Route path="areaForm" element={<AreaForm />} />
        <Route path="areaTable" element={<AreaTable />} />
        <Route path="areaEditForm" element={<AreaEditForm />} />

        <Route path="packagesForm" element={<PackagesForm />} />
        <Route path="packagesTable" element={<PackagesTable />} />
        <Route path="packagesEditForm" element={<PackageEdiForm />} />

        <Route path="packageDetailsForm" element={<PackageDetailsForm />} />
        <Route path="packageDetailsTable" element={<PackageDetailsTable />} />
        <Route
          path="packageDetailsEditForm"
          element={<PackageDetailsEditForm />}
        />

        <Route path="faqForm" element={<FaqForm />} />
        <Route path="faqTable" element={<FaqTable />} />
        <Route path="faqEditForm" element={<FaqEditForm />} />

        <Route path="dealerForm" element={<DealerForm />} />
        <Route path="dealerTable" element={<DealerTable />} />
        <Route path="dealerEditForm" element={<DealerEditForm />} />

        <Route path="invoiceTable" element={<InvoiceTable />} />

        <Route path="carDetailsForm" element={<CarDetailsForm />} />
        <Route path="carDetailsTable" element={<CarDetailsTable />} />
        <Route path="carDetailsEditForm" element={<CarDetailsEditForm />} />

        <Route path="yachtForm" element={<YachtForm />} />
        <Route path="yachtTable" element={<YachtTable />} />
        <Route path="yachtEditForm" element={<YachtEditForm />} />

        <Route path="userForm" element={<UserForm />} />
        <Route path="userTable" element={<UserTable />} />
        <Route path="userEditForm" element={<UserEditForm />} />

        <Route path="desertSafariForm" element={<DesertSafariForm />} />
        <Route path="desertSafariTable" element={<DesertSafariTable />} />
        <Route path="desertSafariEditForm" element={<DesertSafariEditForm />} />

        <Route path="safeDriversForm" element={<SafeDriversForm />} />
        <Route path="safeDriversTable" element={<SafeDriversTable />} />
        <Route path="safeDriversEditForm" element={<SafeDriversEditForm />} />

        <Route path="quadBikeForm" element={<QuadBikeForm />} />
        <Route path="quadBikeTable" element={<QuadBikeTable />} />
        <Route path="quadBikeEditForm" element={<QuadBikeEditForm />} />

        <Route path="contactFormTable" element={<ContactFormTable />} />
        <Route
          path="driverServiceFormTable"
          element={<DriverServiceFormTable />}
        />
        <Route path="dealerDataTable" element={<DealerDataTable />} />
        <Route path="reportDetailsTable" element={<ReportDetailsTable />} />
        <Route path="tourBookingsTable" element={<TourBookingsTable />} />

        <Route path="bannerForm" element={<BannerForm />} />
        <Route path="bannerTable" element={<BannerTable />} />
        <Route path="bannerEditForm" element={<BannerEditForm />} />

        <Route path="roleTable" element={<RoleTable />} />
        <Route path="roleForm" element={<RoleForm />} />
        <Route path="roleEditForm" element={<RoleEditForm />} />

        <Route path="navigationTable" element={<NavigationTable />} />
        <Route path="navigationForm" element={<NavigationForm />} />
        <Route path="navigationEditForm" element={<NavigationEditForm />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* </Router> */}
    </>
  );
};

export default App_Routes;
