import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {

    const [coupon, setCoupon] = useState<CouponModel>();
    const params = useParams();
    const id = +params.prodid!; // + means number and ! means won't be undefined
    const navigate = useNavigate();


    useEffect( ()=>{companyService.getOneCoupon(id)
            .then(c=>setCoupon(c))
            .catch(err=>notificationService.error(err))
    }, [] );

    function deleteCoupon(){
        if(window.confirm("Are you sure?")){
            companyService.deleteCoupon(id)
                .then( () => {
                    notificationService.success("deleted!");
                    navigate("/Companycoupons");
                })
                .catch( err=>notificationService.error(err) )
        }
    }

    function convertDataUrlToBlob(dataUrl: any): Blob {

        const arr = dataUrl.split(',');

        const mime = arr[0].match(/:(.*?);/)[1];

        const bstr = atob(arr[1]);

        let n = bstr.length;

        const u8arr = new Uint8Array(n);

    

        while (n--) {

            u8arr[n] = bstr.charCodeAt(n);

        }

    

        return new Blob([u8arr], {type: mime});

    }
    function goBack(){
        navigate("/Companycoupons");
    }
    function goToEdit(){
        navigate("/editCoupon/" + id);
    }





   
    return (
        <div className="CouponDetails box">
			{coupon && <>
            <h2>title:<span>{coupon?.title}</span></h2>
            <div>
            <h3>description: <span>{coupon?.description}</span></h3>
            <h3>category: <span>{coupon?.category}</span></h3>
            <h3>amount: <span>{coupon?.amount}</span></h3>
            <h3>price: <span>{coupon?.price}</span></h3>
            <h3>start date: <span>{coupon.startDate as any}</span></h3>
            <h3>end date: <span>{coupon.endDate as any}</span></h3>
            <img src={URL.createObjectURL(convertDataUrlToBlob(coupon.image))}/>
            </div>
            <div>
                <Button variant="outlined" onClick={goBack}>Back</Button> &nbsp;&nbsp;
                <Button variant="contained" onClick={deleteCoupon}>Delete</Button> &nbsp;&nbsp;
                <Button variant="contained" onClick={goToEdit}>Edit</Button>
                
            </div>
            </>}
            {!coupon && <div>Error showing coupon with id: {params.prodid}</div>}
        </div>
    );
}

export default CouponDetails;
