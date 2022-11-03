import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CompanyModel>();
    const navigate = useNavigate();

    function send(company: CompanyModel){
        adminService.addComapny(company)
            .then(()=>{
                notificationService.success("company added!");
                navigate("/companies");
            })
            .catch(err=>{
                notificationService.error(err);
            })
    }

    return (
        <div className="AddCompany box">
			<form onSubmit={handleSubmit(send)}>
                

                <TextField id="name" label="Name" variant="outlined" type="text"  {...register("name", {
                    required: {value: true, message: "name required!"},
                })} /><br/>
                <span className="error">{formState.errors?.name?.message}</span>
                <br></br>

                
                <TextField id="email" label="Email" variant="outlined" type="email"  {...register("email",{
                      required: {value: true, message: "email required!"},
                })} /><br/>
                <span className="error">{formState.errors?.email?.message}</span>
                <br></br>

                
                <TextField id="password" label="Password" variant="outlined" type="text"  {...register("password",{
                      required: {value: true, message: "password required!"},
                })} /><br/>
                <span className="error">{formState.errors?.password?.message}</span><br/>

                <Button variant="contained" type="submit" >Add</Button>
            </form>
        </div>
    );
}

export default AddCompany;
