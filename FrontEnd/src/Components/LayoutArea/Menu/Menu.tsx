import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TokModel from "../../../Models/TokModel";
import { authStore } from "../../../Redux/AuthState";

function Menu(): JSX.Element {
    const [token, setToken] = useState<TokModel>();
    useEffect(()=>{
        authStore.subscribe(()=>{
            setToken(authStore.getState().tokenModel);
        })
    }, [])
    

 
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>&nbsp;&nbsp;
            {token &&
                token.role === 'admin' 
                && <><NavLink to="/companies"> companies</NavLink>&nbsp;&nbsp;<NavLink to="/customers"> customers</NavLink></> 
            }
              {token &&
                token.role === 'company'
                && <><NavLink to="/Companycoupons"> My coupons</NavLink>&nbsp;&nbsp;<NavLink to="/companyDetails">my company details</NavLink></>
            }
            {token &&
                token.role === 'customer'
                && <><NavLink to="/Customercoupons"> My coupons</NavLink>&nbsp;&nbsp;<NavLink to="/Allcoupons">All coupons</NavLink>&nbsp;&nbsp;<NavLink to="/customerDetails">my customer details</NavLink></>
            }
            
        </div>
    );
}

export default Menu;
