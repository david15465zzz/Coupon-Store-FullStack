import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./AllCouponDetails.css";

function AllCouponDetails(): JSX.Element {
    

        const [coupon, setCoupon] = useState<CouponModel>();
        const params = useParams();
        const id = +params.prodid!; 
        const navigate = useNavigate();
    
    
        useEffect( ()=>{customerService.getOneCoupon(id)
            .then(c=>setCoupon(c))
            .catch(err=>notificationService.error(err))
        }, [] );

        function buyCoupon(){
            coupon.id = id;
            if(window.confirm("Are you sure?")){
                customerService.purchaseCoupon(coupon)
                    .then( () => {
                        notificationService.success("purchase completed!");
                        navigate('/Customercoupons');
                        
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
        navigate("/Allcoupons");
    }
    
       
    
        return (
            <div className="AllCouponDetails box">
                {coupon && <>
                <h2>title:<span>{coupon?.title}</span></h2><br/>
                <div>
                <h3>description:<span>{coupon?.description}</span></h3><br/>
                <h3>category:<span>{coupon?.category}</span></h3><br/>
                <h3>amount:<span>{coupon?.amount}</span></h3><br/>
                <h3>price:<span>{coupon?.price}</span></h3><br/>
                <h3>start date:<span>{coupon.startDate as any}</span></h3><br/>
                <h3>end date:<span>{coupon.endDate as any}</span></h3><br/>
                 <img src={URL.createObjectURL(convertDataUrlToBlob(coupon.image))}/><br/>
                </div>
                <div>
                <Button variant="outlined"  onClick={goBack}>Back</Button>&nbsp;&nbsp;
                <Button variant="contained" onClick={buyCoupon} >Purchase</Button>&nbsp;&nbsp;
                    
                </div>
                </>}
                {!coupon && <div>Error showing coupon with id: {params.prodid}</div>}
            </div>
        );
    }



export default AllCouponDetails;
