import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {
    const {register, handleSubmit, formState} = useForm<CustomerModel>();
    const navigate = useNavigate();

    function send(customer: CustomerModel){
        adminService.addCustomer(customer)
            .then(()=>{
                notificationService.success("customer added!");
                navigate("/customers");
            })
            .catch(err=>{
                notificationService.error(err);
            })
    }

    return (
        <div className="AddCustomer box">
			<form onSubmit={handleSubmit(send)}>
                
            
            <TextField id="first_name" label="first name" variant="outlined" type="text"  {...register("first_name",{
                })} /><br/>
                <span className="error">{formState.errors?.first_name?.message}</span><br/><br/>
                
            
            
            <TextField id="last_name" label="last name" variant="outlined" type="text"  {...register("last_name",{ 
                })} /><br/>
                <span className="error">{formState.errors?.last_name?.message}</span><br/><br/>
                
            
            
            <TextField id="email" label="email" variant="outlined" type="email"  {...register("email", {
                    required: { value: true, message: "email required!" }  
                })} /><br/>
                <span className="error">{formState.errors?.email?.message}</span><br/><br/>
           
                
            <TextField id="Email" label="password" variant="outlined" type="text"  {...register("password", {
                    required: { value: true, message: "password required!" }
                })} /><br/>
                <span className="error">{formState.errors?.password?.message}</span><br/>


                <Button variant="contained" type="submit" >Add</Button>
            </form>
        </div>
    );
}

export default AddCustomer;
