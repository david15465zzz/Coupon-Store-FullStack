import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const navigate = useNavigate();

    function logout(){
        authService.logout();
        notificationService.success("Bye bye");
        navigate("/home");
    }
    function goToLogin(){
        navigate("/login");
    }

    return (
        <div className="AuthMenu">

            {
                !authStore.getState().token && <>
                   <Button variant="contained" color="inherit" onClick={goToLogin}>Login</Button>
                </>
            }
            {
                authStore.getState().token && <>
                    <Button variant="contained" color="inherit" onClick={logout}>Logout</Button>
                </>
            }
        </div>
    );
}

export default AuthMenu;