package porject.project.services;

import porject.project.repostiories.CompanyRepository;
import porject.project.repostiories.CouponRepository;
import porject.project.repostiories.CustomerRepository;

public abstract class ClientService {
    protected CompanyRepository companyRepository;
    protected CouponRepository couponRepository;
    protected CustomerRepository customerRepository;


    public ClientService(CompanyRepository companyRepository, CouponRepository couponRepository, CustomerRepository customerRepository) {
        this.companyRepository = companyRepository;
        this.couponRepository = couponRepository;
        this.customerRepository = customerRepository;
    }

    public abstract boolean login(String email, String password) ;




}
