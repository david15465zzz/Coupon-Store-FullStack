
import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import customerService from "../../../Services/CustomerService";
import AllCouponCard from "../AllCouponCard/AllCouponCard";
import "./Allcoupons.css";

function Allcoupons(): JSX.Element {

    const [coupons,setCoupons] = useState<CouponModel[]>([]);

    useEffect( () => { 
        customerService.getAllCoupons()
        .then( prods => setCoupons(prods) )
        .catch( err => {alert(err.message); console.log(err);}
         );
    }, []);

    

    return (
        <div className="Allcoupons">
         {coupons.map( c=> <AllCouponCard key={c.id} coupon={c} /> )}
        </div>
    );
}

export default Allcoupons;
