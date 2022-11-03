import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";

import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {
    const [customer, setCustomer] = useState<CustomerModel>();
    const params = useParams();
    const id = +params.prodid!; 
    const navigate = useNavigate();



    useEffect( ()=>{adminService.getOneCustomer(id)
            .then(p=>setCustomer(p))
            .catch(err=>notificationService.error(err))
    }, [] );

    function deleteCustomer(){
        if(window.confirm("Are you sure?")){
            adminService.deleteCustomer(id)
                .then( () => {
                    notificationService.success("deleted!");
                    navigate("/customers");
                })
                .catch( err=>notificationService.error(err) )
        }
    }
    function goBack(){
        navigate("/customers");
    }
    function goToEdit(){
        navigate("/editCustomer/" + id);
    }

    return (
        <div className="CustomerDetails box">
			{customer && <>
            <h2>name: <span>{customer?.first_name} {customer?.last_name}</span> </h2><br/>
             <div>
             <h3> email: <span>{customer?.email}</span></h3><br/>
             <h3> password: <span>{customer?.password}</span></h3><br/>
            </div>
            <div>
                <Button variant="outlined" onClick={goBack}>Back</Button> &nbsp;&nbsp;
                <Button variant="contained" onClick={deleteCustomer}>Delete</Button> &nbsp;&nbsp;
                <Button variant="contained" onClick={goToEdit}>Edit</Button>
                
            </div>
            </>}
            {!customer && <div>Error showing customer with id: {params.prodid}</div>}
        </div>
    );
}



export default CustomerDetails;
