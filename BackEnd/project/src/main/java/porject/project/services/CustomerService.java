package porject.project.services;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import porject.project.enums.Category;
import porject.project.entities.Coupon;
import porject.project.entities.Customer;
import porject.project.repostiories.CompanyRepository;
import porject.project.repostiories.CouponRepository;
import porject.project.repostiories.CustomerRepository;

import java.util.Date;
import java.util.List;

@Service
@Scope("prototype")
public class CustomerService extends ClientService{

    private int CustomerId;


    public int getCustomerId() {
        return CustomerId;
    }

    public CustomerService(CompanyRepository companyRepository, CouponRepository couponRepository, CustomerRepository customerRepository) {
        super(companyRepository, couponRepository, customerRepository);
    }



    @Override
    //login
    public boolean login(String email, String password) {
        if (customerRepository.findByEmail(email) != null && customerRepository.findByEmail(email).getPassword().equals(password)) {
            this.CustomerId = customerRepository.findByEmail(email).getId();
            return true;
        }
        return false;
    }
    // purchase Coupon
    public  void purchaseCoupon(Coupon coupon) throws Exception {
        Coupon coupon1=couponRepository.findById(coupon.getId()).get();
        if(!coupon1.equals(coupon))
            throw new Exception("coupon details are invalid");
        else if(coupon.getAmount()==0)
            throw new Exception("no more coupons like this left,amount 0");
        Date date=new Date();
        if(coupon.getEndDate()!=null&&coupon.getEndDate().before(date))
            throw new Exception("coupon expired");
        Customer customer=customerRepository.findById(this.CustomerId).get();
        if(customer.getCoupons().contains(coupon))
            throw new Exception("you already bought this coupon");
        coupon1.setAmount(coupon.getAmount()-1);
        customer.addCoupons(coupon);
        customerRepository.save(customer);
        couponRepository.save(coupon1);
    }
    //get all coupons
    public List<Coupon> getAllCoupons(){
        return  couponRepository.findAll();
    }
    //get customer coupons
    public List<Coupon> getCustomerCoupons(){
        return  couponRepository.findCouponsByCustomer(this.CustomerId);
    }
    //get customer coupons from specific category
    public List<Coupon> getCustomerCoupons(Category category){
        return  couponRepository.findCouponsByCustomerAndCategory(this.CustomerId,category.ordinal());
    }
    //get coupons till max price that belong to customer
    public List<Coupon> getCustomerCoupons(double maxPrice){
        return  couponRepository.findCouponsByCustomerAndMaxPrice(this.CustomerId,maxPrice);
    }

    //get customer details
    public Customer getCustomerDetails(){
        return customerRepository.findById(this.CustomerId).orElseThrow();
    }

}
