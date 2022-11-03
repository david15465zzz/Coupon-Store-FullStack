import { useEffect, useState } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import companyService from "../../../Services/CompanyService";
import "./MyCompanyDetails.css";

function MyCompanyDetailsDetails(): JSX.Element {
    const [company, setCompany] = useState<CompanyModel>();


    useEffect(()=>{
        companyService.companyDetails()
            .then(comp=>setCompany(comp))
            .catch(err=>alert(err.message))
    }, []);

    return (
        <div className="MyCompanyDetailsDetails box">
			{company && <>
            <div>
            <h3>name: <span>{company?.name}</span></h3><br/>
            <h3>email: <span>{company?.email}</span></h3><br/>
            <h3>password: <span>{company?.password}</span></h3><br/>
            </div>
            {<img src="\Assets\Images\bestCompany.jpg" />}
            </>}
            {!company && <div>Error showing companyDetails</div>}
        </div>
    );
}


export default MyCompanyDetailsDetails;
