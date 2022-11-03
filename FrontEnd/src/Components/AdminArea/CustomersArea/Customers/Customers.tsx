import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import CustomerCard from "../CustomerCard/CustomerCard";
import "./Customers.css";

function Customers(): JSX.Element {
    const navigate = useNavigate();
    const [customers,setCustomers] = useState<CustomerModel[]>([]);

    useEffect( () => { 
        adminService.getCustomers()
        .then( prods => setCustomers(prods) )
        .catch( err => {alert(err.message); console.log(err);}
         );
    }, []);

    function goToAdd(){
        navigate("/addCustomer");
    }
    

    return (
        <div className="customers">
            <div><button onClick={goToAdd}>➕</button></div>
            {customers.map(c=><CustomerCard customer={c} key={c.id} />)}
        </div>
    );
}

export default Customers;
