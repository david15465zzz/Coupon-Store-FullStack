import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CustomerCouponsState {
    public coupons: CouponModel[] = []; 
}

// 2. Action Types: list of actions to perform on the state
export enum CouponsActionType {
    FetchCoupon, AddCoupon
}

// 3. Action: interface with ActionType and payload
export interface CouponsAction {
    type: CouponsActionType,
    payload: any
}

// 4. Action creators: functions to create Actions
export function createFetchAction(coupon: CouponModel[]){
    return {type: CouponsActionType.FetchCoupon, payload: coupon};
}
export function createAddAction(coupon: CouponModel){
    return {type: CouponsActionType.AddCoupon, payload: coupon};
}


export function CouponsReducer(currentState = new CustomerCouponsState(), action:CouponsAction): CustomerCouponsState {
   
    const newState = { ...currentState }; 

    switch (action.type) {

        case CouponsActionType.FetchCoupon:
            newState.coupons = action.payload; 
            break;

        case CouponsActionType.AddCoupon: 
            newState.coupons.push(action.payload);
            break;

    

    }

    return newState;
}


export const CustomerCouponsStore = createStore(CouponsReducer);