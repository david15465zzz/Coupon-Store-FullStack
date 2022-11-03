import axios from "axios";
import Category from "../Models/Category";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import { AllCouponsStore, FetchAction } from "../Redux/AllCouponsState";
import { createAddAction, createFetchAction, CustomerCouponsStore } from "../Redux/CustomerCouponsState";
import appConfig from "../Utils/Config";

class CustomerService {
    public async getAllCoupons() {
            const response = await axios.get<CouponModel[]>(appConfig.customerUrl+"Coupons");
            AllCouponsStore.dispatch(FetchAction(response.data));
            return response.data;
        }
    
    public async getMYCoupons() {
        if (CustomerCouponsStore.getState().coupons.length === 0 || CustomerCouponsStore.getState().coupons.length === 1) {

            const response = await axios.get<CouponModel[]>(appConfig.customerUrl+"Coupons/Mine");
            CustomerCouponsStore.dispatch(createFetchAction(response.data));
            return response.data;
        } else {
            return CustomerCouponsStore.getState().coupons;
        }
    }
    public async purchaseCoupon(coupon: CouponModel){
             const response = await axios.post<CouponModel>(appConfig.customerUrl+"purchase", coupon);
             const newCoupon = response.data;
             CustomerCouponsStore.dispatch(createAddAction(newCoupon));
    }


    public async getOneCoupon(id: number) {
        const coupon = AllCouponsStore.getState().coupons.find(p=>p.id === id);
        if(typeof coupon === "undefined")
            throw new Error("No coupon found");
        return coupon;
    }


    public async getCouponsByCategory(category: Category | string){
        const response = await axios.get<CouponModel[]>(appConfig.customerUrl+"Coupons/byCategory/"+category);
        return response.data;

    }
    public async getCouponsByMaxPrice(maxPrice: number){
        const response = await axios.get<CouponModel[]>(appConfig.customerUrl+"Coupons/byPrice/"+maxPrice);
        return response.data;

    }


    public async customerDetails(){
        const response = await axios.get<CustomerModel>(appConfig.customerUrl+"Details");
        return response.data;

    }

   

}
const customerService = new CustomerService();

export default customerService;