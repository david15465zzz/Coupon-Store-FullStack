import axios from "axios";
import Category from "../Models/Category";
import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";
import { CompaniesCouponsStore, createAddAction, createDeleteAction, createEditAction, createFetchAction } from "../Redux/CompanyCouponsState";
import appConfig from "../Utils/Config";


class CompanyService {
    public async getCoupons() {
        if (CompaniesCouponsStore.getState().coupons.length === 0) {

            const response = await axios.get<CouponModel[]>(appConfig.companyUrl + "Coupons");
            CompaniesCouponsStore.dispatch(createFetchAction(response.data));
            return response.data;
        } else {
            return CompaniesCouponsStore.getState().coupons;
        }
    }

    public async getOneCoupon(id: number) {
        const coupon = CompaniesCouponsStore.getState().coupons.find(p => p.id === id);
        if (typeof coupon === "undefined")
            throw new Error("No coupon found");
        return coupon;
    }

    public async getCouponsByCategory(category: Category | string) {
        const response = await axios.get<CouponModel[]>(appConfig.companyUrl + "Coupons/byCategory/" + category);
        return response.data;

    }
    public async getCouponsByMaxPrice(maxPrice: number) {
        const response = await axios.get<CouponModel[]>(appConfig.companyUrl + "Coupons/byPrice/" + maxPrice);
        return response.data;

    }

    public async deleteCoupon(id: number) {
        await axios.delete(appConfig.companyUrl + "Coupons/" + id);
        CompaniesCouponsStore.dispatch(createDeleteAction(id));

    }

    public async addCoupon(coupon: CouponModel) {
        const response = await axios.post(appConfig.companyUrl + "Coupons", coupon);
        const newCoupon = response.data;
        CompaniesCouponsStore.dispatch(createAddAction(newCoupon));
    }


    public async editCoupon(coupon: CouponModel) {
            const response = await axios.put(appConfig.companyUrl + "Coupons", coupon);
            const newCoupon = response.data;
            CompaniesCouponsStore.dispatch(createEditAction(newCoupon));
    }

    public async companyDetails() {
        const response = await axios.get<CompanyModel>(appConfig.companyUrl + "Details");
        return response.data;

    }



}
const companyService = new CompanyService();

export default companyService;