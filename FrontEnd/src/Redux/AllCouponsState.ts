import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class AllCustomerCouponsState {
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
export function FetchAction(coupon: CouponModel[]){
    return {type: CouponsActionType.FetchCoupon, payload: coupon};
}


export function CouponsReducer(currentState = new AllCustomerCouponsState(), action:CouponsAction): AllCustomerCouponsState {
   
    const newState = { ...currentState }; 

    switch (action.type) {

        case CouponsActionType.FetchCoupon:
            newState.coupons = action.payload; 
            break;

    }

    return newState;
}


export const AllCouponsStore = createStore(CouponsReducer);