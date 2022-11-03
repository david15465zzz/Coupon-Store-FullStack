
import CouponModel from "../../../Models/CouponModel";
import "./MyCusCouponCard.css";


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


function MyCusCouponCard(props:  CouponProps): JSX.Element {
    return (
        <div className=" MyCusCouponCard box">
			<div>
            <h2>title:<span>{props.coupon?.title}</span></h2><br/>
                <div>
                <h3>description:<span>{props.coupon?.description}</span></h3><br/>
                <h3>category:<span>{props.coupon?.category}</span></h3><br/>
                <h3>amount:<span>{props.coupon?.amount}</span></h3><br/>
                <h3>price:<span>{props.coupon?.price}</span></h3><br/>
                <h3>start date:<span>{props.coupon.startDate as any}</span></h3><br/>
                <h3>end date:<span>{props.coupon.endDate as any}</span></h3><br/>
            </div>
            <div>
             <img src={URL.createObjectURL(convertDataUrlToBlob(props.coupon.image))}/><br/> 
            </div>
        </div>
        </div>
    );
}

export default MyCusCouponCard;
