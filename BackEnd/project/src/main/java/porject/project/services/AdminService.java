package porject.project.services;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import porject.project.entities.Company;
import porject.project.entities.Coupon;
import porject.project.entities.Customer;
import porject.project.repostiories.CompanyRepository;
import porject.project.repostiories.CouponRepository;
import porject.project.repostiories.CustomerRepository;


import java.util.List;

@Service
public class AdminService extends ClientService {

    public AdminService(CompanyRepository companyRepository, CouponRepository couponRepository, CustomerRepository customerRepository) {
        super(companyRepository, couponRepository, customerRepository);
    }

    @Override
    //login
    public boolean login(String email, String password)  {
        if(email.equals("admin@admin.com")&&password.equals("admin"))
        return true;
        return false;
    }

    //add valid company
    public void addCompany(Company company) throws Exception {
        if(company.getId()!=0)
            throw new Exception("id is not 0");
        else if(companyRepository.findByName(company.getName())==null&&companyRepository.findByEmail(company.getEmail())==null)
            companyRepository.save(company);
        else
        throw new Exception("company already exists");
    }
    //update company
    public void updateCompany(Company company) throws Exception {
        Company c=companyRepository.findById(company.getId()).get();
        if(c!=null) {
            c.setEmail(company.getEmail());
            c.setPassword(company.getPassword());
            companyRepository.save(c);
        }
        else
            throw new Exception("update failed");
    }
    //delete company,company coupons,company coupons buy history
    public void deleteCompany(int id) throws Exception {
        if (!companyRepository.existsById(id))
            throw new Exception("delete failed");
           couponRepository.deleteCouponsHistoryByCompany(id);
           couponRepository.deleteCompanyCoupons(id);
        companyRepository.deleteById(id);
    }
    //get specific company
    public Company getCompany(int id)  {
        return companyRepository.findById(id).orElseThrow();
    }
    //get all companies
    public List<Company> getCompanies(){
        return companyRepository.findAll();
    }
    //add valid customer
    public void addCustomer(Customer customer) throws Exception {
        if(customer.getId()!=0)
        throw new Exception("id is not 0");
        else if(customerRepository.findByEmail(customer.getEmail())==null)
            customerRepository.save(customer);
        else
            throw new Exception("customer already exists");
    }
    //update customer
    public void updateCustomer(Customer customer) throws Exception {
        if(customerRepository.existsById(customer.getId()))
            customerRepository.save(customer);
        else
            throw new Exception("update failed");
    }
    //delete customer and his buy history
    public void deleteCustomer(int id) throws Exception {
        if(!customerRepository.existsById(id))
            throw new Exception("delete failed");
        couponRepository.deleteCustomerCouponsHistory(id);
        customerRepository.deleteById(id);
    }
    //get specific customer
    public Customer getCustomer(int id)  {
        return customerRepository.findById(id).orElseThrow();
    }
    //get all customers
    public List<Customer> getCustomers(){
        return customerRepository.findAll();
    }

}
