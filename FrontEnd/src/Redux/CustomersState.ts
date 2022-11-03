import { createStore } from "redux";
import CustomerModel from "../Models/CustomerModel";


export class CustomersState {
    public customers: CustomerModel[] = []; 
}

// 2. Action Types: list of actions to perform on the state
export enum CustomersActionType {
    FetchCustomer, AddCustomer, EditCustomer, DeleteCustomer
}

// 3. Action: interface with ActionType and payload
export interface CustomersAction {
    type: CustomersActionType,
    payload: any
}

// 4. Action creators: functions to create Actions
export function FetchAction(customer: CustomerModel[]){
    return {type: CustomersActionType.FetchCustomer, payload: customer};
}
export function AddAction(customer: CustomerModel){
    return {type: CustomersActionType.AddCustomer, payload: customer};
}
export function EditAction(customer: CustomerModel){
    return {type: CustomersActionType.EditCustomer, payload: customer};
}
export function DeleteAction(id: number){
    return {type: CustomersActionType.DeleteCustomer, payload: id};
}


export function CustomersReducer(currentState = new CustomersState(), action:CustomersAction): CustomersState {
   
    const newState = { ...currentState }; 

    switch (action.type) {

        case CustomersActionType.FetchCustomer:
            newState.customers = action.payload; 
            break;

        case CustomersActionType.AddCustomer: 
            newState.customers.push(action.payload);
            break;

        case CustomersActionType.EditCustomer: 
            const indexToEdit = newState.customers.findIndex(p=>p.id == action.payload.id);
            if(indexToEdit >= 0)
                newState.customers[indexToEdit] = action.payload;
            break;

        case CustomersActionType.DeleteCustomer: 
            const indexToDelete = newState.customers.findIndex(p=>p.id == action.payload);
            if(indexToDelete >= 0)
                newState.customers.splice(indexToDelete, 1);
            break;

    }

    return newState;
}


export const CustomersStore = createStore(CustomersReducer);