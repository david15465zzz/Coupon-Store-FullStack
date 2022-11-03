import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./AddCoupon.css";
import { Button, TextField } from "@mui/material";
function AddCoupon(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<CouponModel>();
    const navigate = useNavigate();

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

    function send(coupon: CouponModel) {

        const doAdd = () =>{
            companyService.addCoupon(coupon)
            .then(() => {
                // notify success
                notificationService.success("coupon added!");
                navigate('/CompanyCoupons');
            })
            .catch(err => {
                notificationService.error(err);
            })
        }
        if(coupon.endDate < coupon.startDate && coupon.endDate   ){
        notificationService.error("start date is after end date");}
        else if(!coupon.image || (coupon.image as any).length ===  0) {
            coupon.image = "data:image/jpeg;base64,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DAZQQPAEAgTLMOmsLojEFSyqxU81JGcfCZYEyZEQJiRJgJEmRASZEQJkRECZERAREQEREAZERCoiIgREGQYFKjUdbpls2lOsp37DzXK5wfKX9L2F8pQpud9Mr2Lsd6Qzp7LFclfgZf0vYXyhGWIiBju7LeUx5ITI5hcgeJxwmS7st5TGM7eHPbw88cIHnSO7V1s42syKXX2WIG4fA5maYNF1nV19bjrNi9ZjlvwN2PdnMzQqYiIExIiETEiIExIkwESMxAmJEQpERAREiAiIgJESDASDEgwKlJtOmU3ACw0jrQOyH2+sBgnhnPfL+m7C+UoUJYumUXMGsWkC1hyZwvrEcBzOe4S/puwvlCMsREDHd2W8p4r5DyEyuuQR4yoa7hwBTA5ZU/eBGmvZjYroylGwDnKOp4qyny5jmDnmMEz+ep6zqesr6wjcK969bjnnZnOMSNl/jX9J+8dXf41/SfvAmvXUtY1K21mxBlqw6mxRw4lc5HMfMRptbTYzpXZWzVnFiq6syHJGGAORxBHHwkbL/Gv6T942X+Nf0n7wGl6QouDmq2p+rOH2OrbT4Ng8ORnmnpPT2Vtal1TVpne62Ka1wMnLA4GAcz3sv8U+k/eMajxT6T94HkdI0GrrxbUahzs3r1XA47Wcc+El+kaFqFxtrFbYxYXXqznlhuUnGo8U+k/eMajxT6T94HnU9I0VItlltaI+NjM4CNkZGCefDjPWp19NRQWWVobDhAzAFjw4LnnzHzjGo8U+k/eMajxT6T94E3a2pHSt7EV7OwpYBm7uA74v11NbIj2IrWHFalgGY5Awo7+JEjGo8U+k/eMajxT6T94EvralsWougdxlULDeRx4gfA/KPztXWdTvXrAM7M+vjnnEjbqPFPpP3jbqPFPpP3gTVrandqldS6cXUH1l5cx8RI02uqtZ1rdWNZw4ByVPEYPxB+UbdR4p9J+8bdR4p9J+8CNNr6bVZ67FZU7RB4Dhnj8JFfSFLVtarqUXO5h2RjnPW3UeKfSfvI2X+KfSfvAj8/T1XXb16v2/5ee39+EW6+lK1tZ1CNja3cc8RJ2X+KfSfvGy/wAU+k/eBGp19VSqzuFD9knOD3xqNbXWyK7BTYcIDnieA4fMSdl/in0n7xsv8U+k/eFebdZWrrWzAO/FV45P+8Gedc9qr/hIHZmCjLYRc82Y88Adw4nh5jJsv8U+k/eR1V/in0n7widT2H/Sf2lnTdhfKVDp7jkEpgjB4HP7y7WuAB4QPcREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED//Z"
            doAdd()
        }else if(((coupon.image as any).length  !==  0)) {
            getBase64(coupon.image, (result:any) => {
                coupon.image = result
                doAdd()
            })   
        }
    }

    return (
        <div className="AddCoupon box">
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

                <label>picture</label><br />
                <input  type="file" {...register("image")} /><br /><br />
                <Button variant="contained" type="submit" >Add</Button>
            </form>
        </div>
    );
}

export default AddCoupon;
