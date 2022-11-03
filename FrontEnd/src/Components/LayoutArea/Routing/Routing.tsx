import { Route, Routes } from "react-router-dom";
import AddCompany from "../../AdminArea/CompaniesArea/AddCompany/AddCompany";
import Companies from "../../AdminArea/CompaniesArea/Companies/Companies";
import CompanyDetails from "../../AdminArea/CompaniesArea/CompanyDetails/CompanyDetails";
import EditCompany from "../../AdminArea/CompaniesArea/EditCompany/EditCompany";
import AddCustomer from "../../AdminArea/CustomersArea/AddCustomer/AddCustomer";
import CustomerDetails from "../../AdminArea/CustomersArea/CustomerDetails/CustomerDetails";
import Customers from "../../AdminArea/CustomersArea/Customers/Customers";
import EditCustomer from "../../AdminArea/CustomersArea/EditCustomer/EditCustomer";
import Login from "../../AuthArea/Login/Login";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import Companycoupons from "../../CompanyArea/Companycoupons/Companycoupons";
import CouponDetails from "../../CompanyArea/CouponDetails/CouponDetails";
import EditCoupon from "../../CompanyArea/EditCoupon/EditCoupon";
import MyCompanyDetails from "../../CompanyArea/MyCompanyDetails/MyCompanyDetails";
import AllCouponDetails from "../../CustomerArea/AllCouponDetails/AllCouponDetails";
import Allcoupons from "../../CustomerArea/Allcoupons/Allcoupons";
import Customercoupons from "../../CustomerArea/Customercoupons/Customercoupons";
import MyCustomerDetails from "../../CustomerArea/MyCustomerDetails/MyCustomerDetails";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/addCompany" element={<AddCompany />} />
            <Route path="/companies/:prodid" element={<CompanyDetails />}/>
            <Route path="/editCompany/:prodid" element={<EditCompany />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
            <Route path="/customers/:prodid" element={<CustomerDetails />}/>
            <Route path="/editCustomer/:prodid" element={<EditCustomer />} />
            <Route path="/Companycoupons" element={<Companycoupons />} />
            <Route path="/addCoupon" element={<AddCoupon />} />
            <Route path="/Companycoupons/:prodid" element={<CouponDetails />}/>
            <Route path="/editCoupon/:prodid" element={<EditCoupon />} />
            <Route path="/companyDetails" element={<MyCompanyDetails />} />
            <Route path="/Customercoupons" element={<Customercoupons />} />
            <Route path="/Allcoupons" element={<Allcoupons />} />
            <Route path="/customerDetails" element={<MyCustomerDetails />} />
            <Route path="/Allcoupons/:prodid" element={<AllCouponDetails/>} />
            <Route path="*" element={<PageNotFound />} />

        </Routes>
    </div>
    );
}

export default Routing;
