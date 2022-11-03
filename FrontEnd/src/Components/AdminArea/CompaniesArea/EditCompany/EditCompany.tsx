import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";

function EditCompany(): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<CompanyModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.prodid!;

    useEffect(()=>{
        adminService.getOneComapny(id)
            .then((company)=>{
                setValue("name", company.name);
                setValue("email", company.email);
                setValue("password", company.password);
            })
            .catch(err=>notificationService.error(err))
    }, [])

    function send(company: CompanyModel){
        company.id = id;
        adminService.editComapny(company)
            .then(()=>{
                notificationService.success("company updated!");
                navigate("/companies/"+id)
            }) 
            .catch(err=>notificationService.error(err))
    }
    function goBack(){
        navigate("/companies/"+id);
    }

    return (
        <div className="EditCompany box">
			<form onSubmit={handleSubmit(send)}>
            
                <TextField id="Email" label="Email" variant="outlined" type="email"  {...register("email",{
                     
                })} /><br/>
                <span className="error">{formState.errors?.email?.message}</span>
                <br></br>

              
                <TextField id="password" label="password" variant="outlined" type="text"  {...register("password",{
                      
                })} /><br/>
                <span className="error">{formState.errors?.password?.message}</span><br/>
                <Button variant="outlined" onClick={goBack}>Back</Button>&nbsp;&nbsp;
                <Button variant="contained" type="submit" >Edit</Button>
            </form>
        </div>
    );
}

export default EditCompany;