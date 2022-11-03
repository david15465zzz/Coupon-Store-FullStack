import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./Companies.css";

function Companies(): JSX.Element {

    const navigate = useNavigate();
    const [companies,setCompanies] = useState<CompanyModel[]>([]);

    useEffect( () => { 
        adminService.getComapnies()
        .then( prods => setCompanies(prods) )
        .catch( err => {alert(err.message); console.log(err);}
         );
    }, []);

    function goToAdd(){
        navigate("/addCompany");
    }
    

    return (
        <div className="companies">
            <div><button onClick={goToAdd}>➕</button></div>
            {companies.map(c=><CompanyCard comapny={c} key={c.id} />)}
        </div>
    );
}

export default Companies;