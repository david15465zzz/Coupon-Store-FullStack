import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import { ComapniesStore, createAddAction, createDeleteAction, createEditAction, createFetchAction } from "../Redux/CompaniesState";
import { AddAction, CustomersStore, DeleteAction, EditAction, FetchAction } from "../Redux/CustomersState";
import appConfig from "../Utils/Config";

class AdminService {
    public async getComapnies() {
        if (ComapniesStore.getState().companies.length === 0) {

            const response = await axios.get<CompanyModel[]>(appConfig.adminsUrl+"Companies");
            ComapniesStore.dispatch(createFetchAction(response.data));
            return response.data;
        } else {
            return ComapniesStore.getState().companies;
        }
    }

    public async getOneComapny(id: number) {
        const comapny = ComapniesStore.getState().companies.find(p=>p.id === id);
        if(typeof comapny === "undefined")
            throw new Error("No comapny found");
        return comapny;
    }

    public async deleteCompany(id: number) {
        await axios.delete(appConfig.adminsUrl+"Companies/"+id);
        ComapniesStore.dispatch(createDeleteAction(id));
        
    }

    public async addComapny(Company: CompanyModel) {
        const response = await axios.post(appConfig.adminsUrl+"Companies", Company);
        const newCompany = response.data;
        ComapniesStore.dispatch(createAddAction(newCompany));
    }

    public async editComapny(Company: CompanyModel) {
        const response = await axios.put(appConfig.adminsUrl + "Companies", Company);
        const newCompany = response.data;
        ComapniesStore.dispatch(createEditAction(newCompany));
    }

    /////////

    public async getCustomers() {
        if (CustomersStore.getState().customers.length === 0) {

            const response = await axios.get<CustomerModel[]>(appConfig.adminsUrl+"Customers");
            CustomersStore.dispatch(FetchAction(response.data));
            return response.data;
        } else {
            return CustomersStore.getState().customers;
        }
    }

    public async getOneCustomer(id: number) {
        const customer = CustomersStore.getState().customers.find(p=>p.id === id);
        if(typeof customer === "undefined")
            throw new Error("No customer found");
        return customer;
    }

    public async deleteCustomer(id: number) {
        await axios.delete(appConfig.adminsUrl+"Customers/"+id);
        CustomersStore.dispatch(DeleteAction(id));
        
    }

    public async addCustomer(customer: CustomerModel) {
        const response = await axios.post(appConfig.adminsUrl+"Customers", customer);
        const newCustomer = response.data;
         CustomersStore.dispatch(AddAction(newCustomer));
    }

    public async editCustomer(customer: CustomerModel) {

        const response = await axios.put(appConfig.adminsUrl + "Customers", customer);
        const newCustomer = response.data;
        CustomersStore.dispatch(EditAction(newCustomer));
    }
    

}

const adminService = new AdminService();

export default adminService;


