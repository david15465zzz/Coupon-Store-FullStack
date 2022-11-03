import { Link } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./AllCouponCard.css";

interface  CouponProps{
    coupon : CouponModel
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

function AllCouponCard(props:  CouponProps): JSX.Element {
    return (
        <div className=" AllCouponCard box">
			<div>
            <h3>title:<span>{props.coupon.title} </span></h3>
            <h3>description:<span>{props.coupon.description} </span> </h3>
            <h3>price:<span>{props.coupon.price} </span> </h3>
            </div>
            <div>
            <Link to={"/Allcoupons/" + props.coupon.id}>
             <img src={URL.createObjectURL(convertDataUrlToBlob(props.coupon.image))}/><br/> 
            </Link>
            </div>
        </div>
    );
}

export default AllCouponCard;
