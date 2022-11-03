
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    function send(credentials: CredentialsModel){
        authService.login(credentials)
            .then(()=>{
                notificationService.success("Welcome back" );
                navigate("/home");
            })
            .catch( err=>notificationService.error(err))
    }

    return (
        <div className="Login box">
			<form onSubmit={handleSubmit(send)}>
                
            <TextField id="Email" label="Email" variant="outlined" type="email"  {...register("email", {
                    required: { value: true, message: "email required!" }
                })} /> <br />
            <span>{formState.errors?.email?.message}</span><br/>
                
                <TextField id="Password" label="Password" variant="outlined" type="password" {...register("password", {
                    required: { value: true, message: "password required!" }
                })} /> <br />
           <span>{formState.errors?.password?.message}</span><br/>

                 <label>Login as:</label>
                 <select {...register("clientType")}>
                <option value="Administrator">Administrator</option>
                <option value="Company">Company</option>
                <option value="Customer">Customer</option>
                </select>
           <span>{formState.errors?.clientType?.message}</span><br/>
           <br/>
           

           <Button variant="contained" type="submit" >Login</Button>
            </form>
        </div>
    );
}

export default Login;