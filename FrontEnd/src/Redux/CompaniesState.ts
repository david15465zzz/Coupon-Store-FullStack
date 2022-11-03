import { createStore } from "redux";
import CompanyModel from "../Models/CompanyModel";


export class CompaniesState {
    public companies: CompanyModel[] = []; // new Array();
}

// 2. Action Types: list of actions to perform on the state
export enum CompaniesActionType {
    FetchCompany, AddCompany, EditCompany, DeleteCompany
}

// 3. Action: interface with ActionType and payload
export interface ComapniesAction {
    type: CompaniesActionType,
    payload: any
}

// 4. Action creators: functions to create Actions
export function createFetchAction(comapny: CompanyModel[]){
    return {type: CompaniesActionType.FetchCompany, payload: comapny};
}
export function createAddAction(comapny: CompanyModel){
    return {type: CompaniesActionType.AddCompany, payload: comapny};
}
export function createEditAction(comapny: CompanyModel){
    return {type: CompaniesActionType.EditCompany, payload: comapny};
}
export function createDeleteAction(id: number){
    return {type: CompaniesActionType.DeleteCompany, payload: id};
}


export function ComapniesReducer(currentState = new CompaniesState(), action: ComapniesAction): CompaniesState {
   
    const newState = { ...currentState }; 

    switch (action.type) {

        case CompaniesActionType.FetchCompany:
            newState.companies = action.payload; 
            break;

        case CompaniesActionType.AddCompany: 
            newState.companies.push(action.payload);
            break;

        case CompaniesActionType.EditCompany: 
            const indexToEdit = newState.companies.findIndex(p=>p.id == action.payload.id);
            if(indexToEdit >= 0)
                newState.companies[indexToEdit] = action.payload;
            break;

        case CompaniesActionType.DeleteCompany: 
            const indexToDelete = newState.companies.findIndex(p=>p.id == action.payload);
            if(indexToDelete >= 0)
                newState.companies.splice(indexToDelete, 1);
            break;

    }

    return newState;
}


export const ComapniesStore = createStore(ComapniesReducer);