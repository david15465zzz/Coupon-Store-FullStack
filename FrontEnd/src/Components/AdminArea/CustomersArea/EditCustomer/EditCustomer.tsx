import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./EditCustomer.css";

function EditCustomer(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<CustomerModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.prodid!;

    useEffect(()=>{
        adminService.getOneCustomer(id)
            .then((customer)=>{
                setValue("first_name", customer.first_name);
                setValue("last_name", customer.last_name);
                setValue("email", customer.email);
                setValue("password", customer.password);
            })
            .catch(err=>notificationService.error(err))
    }, [])

    function send(customer: CustomerModel){
        customer.id = id;
        adminService.editCustomer(customer)
            .then(()=>{
                notificationService.success("customer updated!");
                navigate("/customers/"+id)
            }) 
            .catch(err=>notificationService.error(err))
    }
    function goBack(){
        navigate("/customers/"+id);
    }

    return (
        <div className="EditCustomer box">
			<form onSubmit={handleSubmit(send)}>
            
            <TextField id="first_name" label="first name" variant="outlined" type="text"  {...register("first_name",{
                })} /><br/>
                <span className="error">{formState.errors?.first_name?.message}</span>
                <br></br>
            
            
            <TextField id="last_name" label="last name" variant="outlined" type="text"  {...register("last_name",{ 
                })} /><br/>
                <span className="error">{formState.errors?.last_name?.message}</span>
                <br></br>
            
            
            <TextField id="email" label="email" variant="outlined" type="email"  {...register("email",{  
                })} /><br/>
                <span className="error">{formState.errors?.email?.message}</span>
                <br></br>

                
            <TextField id="Email" label="password" variant="outlined" type="text"  {...register("password",{ 
                })} /><br/>
                <span className="error">{formState.errors?.password?.message}</span><br/>
                <Button variant="outlined" onClick={goBack}>Back</Button>&nbsp;&nbsp;
                <Button variant="contained" type="submit" >Edit</Button>
            </form>
        </div>
    );
}

export default EditCustomer;
