import { Button, Fab, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";

import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const [company, setCompany] = useState<CompanyModel>();
    const params = useParams();
    const id = +params.prodid!; 
    const navigate = useNavigate();


    useEffect( ()=>{adminService.getOneComapny(id)
            .then(p=>setCompany(p))
            .catch(err=>notificationService.error(err))
    }, [] );

    function deleteCompany(){
        if(window.confirm("Are you sure?")){
            adminService.deleteCompany(id)
                .then( () => {
                    notificationService.success("deleted!");
                    navigate("/companies");

                })
                .catch( err=>notificationService.error(err) )
        }
    }
    function goBack(){
        navigate("/companies");
    }
    function goToEdit(){
        navigate("/editCompany/" + id);
    }
    

    return (
        <div className="CompanyDetails box">
			{company && <>
            <h2>name:<span>{company?.name}</span></h2>
            <br></br>
             <div>
                <h3>email: <span>{company?.email}</span></h3><br/>
                <h3>password: <span>{company?.password}</span></h3><br/>
            </div>
            <br />
            <div>
                <Button variant="outlined" onClick={goBack}>Back</Button> &nbsp;&nbsp;
                <Button variant="contained" onClick={deleteCompany}>Delete</Button> &nbsp;&nbsp;
                <Button variant="contained" onClick={goToEdit}>Edit</Button>
            </div>
            </>}
            {!company && <div>Error showing comapny with id: {params.prodid}</div>}
        </div>
    );
}

export default CompanyDetails;
