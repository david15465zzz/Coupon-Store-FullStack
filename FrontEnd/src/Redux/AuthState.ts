import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import TokModel from "../Models/TokModel";
import notificationService from "../Services/NotificationService";



export class AuthState{
    public token: string;
    public tokenModel: TokModel;
    
    constructor(){
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            try{
                this.tokenModel = jwtDecode(storedToken);
                this.token = storedToken;
            }catch(err: any){
                notificationService.error("error decoding token!")
            }
            
        }
    }
}

export enum AuthActionTypes{
    Login,
    Logout
}

export interface AuthAction{
    type: AuthActionTypes,
    payload?: any
}

export function loginAction(token: string){
    return {type: AuthActionTypes.Login, payload: token}
}

export function logoutAction(){
    return {type: AuthActionTypes.Logout}
}

export function reducer(currentState = new AuthState(), action: AuthAction){
    const newState = {...currentState};

    switch(action.type){
        case AuthActionTypes.Login: 
            newState.token = action.payload;
            newState.tokenModel = jwtDecode(newState.token);
            localStorage.setItem("token", newState.token);
        break;

        case AuthActionTypes.Logout:
            newState.token = null;
            newState.tokenModel = null;
            localStorage.removeItem("token");
        break;
    }

    return newState;
}

export const authStore = createStore(reducer);