import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";



export class CompaniesCouponsState {
    public coupons: CouponModel[] = []; // new Array();
}

// 2. Action Types: list of actions to perform on the state
export enum CouponsActionType {
    FetchCoupon, AddCoupon, EditCoupon, DeleteCoupon
}

// 3. Action: interface with ActionType and payload
export interface couponsAction {
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
export function createEditAction(coupon: CouponModel){
    return {type: CouponsActionType.EditCoupon, payload: coupon};
}
export function createDeleteAction(id: number){
    return {type: CouponsActionType.DeleteCoupon, payload: id};
}


export function CouponsReducer(currentState = new CompaniesCouponsState(), action: couponsAction): CompaniesCouponsState {
   
    const newState = { ...currentState }; 

    switch (action.type) {

        case CouponsActionType.FetchCoupon:
            newState.coupons = action.payload;
            break;

        case CouponsActionType.AddCoupon: 
            newState.coupons.push(action.payload);
            break;

        case CouponsActionType.EditCoupon: 
            const indexToEdit = newState.coupons.findIndex(p=>p.id == action.payload.id);
            if(indexToEdit >= 0)
                newState.coupons[indexToEdit] = action.payload;
            break;

        case CouponsActionType.DeleteCoupon: 
            const indexToDelete = newState.coupons.findIndex(p=>p.id == action.payload);
            if(indexToDelete >= 0)
                newState.coupons.splice(indexToDelete, 1);
            break;

    }

    return newState;
}


export const CompaniesCouponsStore = createStore(CouponsReducer);