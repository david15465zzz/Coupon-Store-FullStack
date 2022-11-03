import { useEffect, useState } from "react";
import CustomerModel from "../../../Models/CustomerModel";
import customerService from "../../../Services/CustomerService";
import "./MyCustomerDetails.css";


function MyCustomerDetails(): JSX.Element {
    const [customer, setCustomer] = useState<CustomerModel>();


    useEffect(()=>{
        customerService.customerDetails()
            .then(cus=>setCustomer(cus))
            .catch(err=>alert(err.message))
    }, []);

    return (
        <div className="MyCustomerDetails box">
			{customer && <>
            <div>
            <h3>first name: <span>{customer?.first_name}</span></h3><br/>
            <h3>last name: <span>{customer?.last_name}</span></h3><br/>
            <h3> email: <span>{customer?.email}</span></h3><br/>
            <h3>password:<span>{customer?.password}</span></h3><br/>
            </div>
            {<img src="\Assets\Images\bestCustomer.jpg" />}
            </>}
            {!customer && <div>Error showing customerDetails</div>}
        </div>
    );
}

export default MyCustomerDetails;
