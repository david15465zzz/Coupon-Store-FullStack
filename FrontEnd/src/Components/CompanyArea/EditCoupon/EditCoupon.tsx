import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./EditCoupon.css";

function EditCoupon(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<CouponModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.prodid!;

    useEffect(()=>{
        companyService.getOneCoupon(id)
            .then((coupon)=>{
                setValue("title", coupon.title);
                setValue("description", coupon.description);
                setValue("category", coupon.category);
                setValue("amount", coupon.amount);
                setValue("price", coupon.price);
                setValue("startDate", coupon.startDate);
                setValue("endDate", coupon.endDate);
                setValue("image", coupon.image);
            })
            .catch(err=>notificationService.error(err))
    }, [])

   

    function getBase64(image:any, cb:any) {
        let reader = new FileReader();
        reader.readAsDataURL(image[0]);
        reader.onload = async function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function send(coupon: CouponModel){

        const doEdit= () => {
            coupon.id = id;
            companyService.editCoupon(coupon)
                .then(() => {
                    // notify success
                    notificationService.success("coupon updated!");
                    navigate("/Companycoupons/"+id);
                })
                .catch(err => {
                    if(err.response.data === 'No value present') {
                        return navigate('/CompanyCoupons')
                    }
                    console.log(err)
                    notificationService.error(err);
                })
        }
        if (coupon.image &&  typeof (coupon.image) != 'string') {
            getBase64(coupon.image, (result:any) => {
                coupon.image = result
                doEdit()
            })
        }else doEdit()
}
                        
    function goBack(){
        navigate("/Companycoupons/"+id);
    }

    return (
        <div className="EditCoupon box">
			 <form onSubmit={handleSubmit(send)}>

                
                <TextField id="title" label="title" variant="outlined" type="text"  {...register("title", {
                     required: { value: true, message: "title required!" },
                     maxLength: {value: 20, message: " maximum 20 characters allowed"}
                })} /><br />
                <span className="error">{formState.errors?.title?.message}</span><br />

                
                <TextField id="description" label="description" variant="outlined" type="text"  {...register("description", {
                     required: { value: true, message: "description required!" },
                     maxLength: {value: 60, message: " maximum 60 characters allowed"}
                })} /><br />
                <span className="error">{formState.errors?.description?.message}</span><br />


                
                <TextField id="amount" label="amount" variant="outlined" type="number"  {...register("amount", {
                    min: {value:1, message:"amount cannot below one!"},
                        required: { value: true, message: "amount required!" }
                })} /><br />
                <span className="error">{formState.errors?.amount?.message}</span><br />

                
                <TextField id="price" label="price" variant="outlined" type="number"  {...register("price",{
                     required: { value: true, message: "price required!" },
                    min: {value:0, message:"Price cannot be negative!"},
                })} /><br />
                <span className="error">{formState.errors?.price?.message}</span><br />


                    
                <select {...register("category")}>
                    <option value="FOOD">FOOD</option>
                    <option value="VACATIONS">VACATIONS</option>
                    <option value="MOVIES">MOVIES</option>
                    <option value="ATTRACTION">ATTRACTION</option>
                    <option value="SHOWS">SHOWS</option>
                    <option value="ELECTRICAL_POWER">ELECTRICAL_POWER</option>
                </select>
                <span>{formState.errors?.category?.message}</span><br /><br />

                <label>startDate</label><br />
                <input type="date" id="start date" {...register("startDate", {
                })} /><br />
                <span className="error">{formState.errors?.startDate?.message}</span><br />

                <label>endtDate</label><br />
                <input type="date" id="end date" {...register("endDate", {
                })} /><br />
                <span className="error">{formState.errors?.endDate?.message}</span><br />
                
                <label id="label">choose new picture only if u want to update the old one </label><br /><br />

                <label>picture</label><br />
                <input type="file" {...register("image")} /><br /><br />

                <Button variant="outlined" onClick={goBack} >Back</Button>&nbsp;&nbsp;
                <Button variant="contained" type="submit" >Edit</Button>
            </form>
        </div>
    );
    }
    

export default EditCoupon;
