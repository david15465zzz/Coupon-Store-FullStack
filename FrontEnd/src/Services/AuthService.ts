import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";
import appConfig from "../Utils/Config";


class AuthService{
    public async login(credentials: CredentialsModel){
        const response = axios.post<string>(appConfig.loginUrl, credentials);
        const token = (await response).data;
        authStore.dispatch(loginAction(token));
    }



    public async logout(){
        authStore.dispatch(logoutAction());
    }
 }

const authService = new AuthService();
export default authService;