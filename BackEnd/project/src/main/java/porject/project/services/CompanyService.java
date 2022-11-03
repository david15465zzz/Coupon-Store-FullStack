package porject.project.services;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import porject.project.enums.Category;
import porject.project.entities.Company;
import porject.project.entities.Coupon;
import porject.project.repostiories.CompanyRepository;
import porject.project.repostiories.CouponRepository;
import porject.project.repostiories.CustomerRepository;

import java.util.Date;
import java.util.List;

@Service
@Scope("prototype")
public class CompanyService  extends ClientService {
    private int companyId;


    public int getCompanyId() {
        return companyId;
    }

    public CompanyService(CompanyRepository companyRepository, CouponRepository couponRepository, CustomerRepository customerRepository) {
        super(companyRepository, couponRepository, customerRepository);
    }


    @Override
    //login
    public boolean login(String email, String password) {
        if (companyRepository.findByEmail(email) != null && companyRepository.findByEmail(email).getPassword().equals(password)) {
            this.companyId = companyRepository.findByEmail(email).getId();
            return true;
        }
        return false;
    }
    //add valid coupon
    public void addCoupon(Coupon coupon) throws Exception {
        if(coupon.getId()!=0)
            throw new Exception(" coupon id is not 0");
        if(couponRepository.findCouponsByTitleAndCompany(this.companyId,coupon.getTitle())!=null)
            throw new Exception(" your company already got coupon with this title");
        Date d=new Date();
        if(coupon.getEndDate()!=null&&coupon.getEndDate().before(d))
            throw new Exception(" end date passed");
        coupon.setCompany(companyRepository.findById(this.companyId).orElseThrow());
        couponRepository.save(coupon);
    }
    //update coupon
    public void updateCoupon(Coupon coupon) throws Exception {
        Coupon c=couponRepository.findById(coupon.getId()).get();
        if(c!=null) {
            c.setAmount(coupon.getAmount());
            c.setCategory(coupon.getCategory());
            c.setImage(coupon.getImage());
            c.setDescription(coupon.getDescription());
            c.setTitle(coupon.getTitle());
            c.setStartDate(coupon.getStartDate());
            c.setEndDate(coupon.getEndDate());
            c.setPrice(coupon.getPrice());
            couponRepository.save(c);
        }
        else
            throw new Exception("update failed");
    }
    //delete coupon
    public void deleteCoupon(int id) throws Exception {
        if(couponRepository.findById(id).orElseThrow().getCompany().getId()==this.companyId){
        couponRepository.deleteCouponsHistory(id);
        couponRepository.deleteById(id);}
        else
            throw new Exception("delete failed");

    }
    //get coupons that belong to company
    public List<Coupon> getCompanyCoupons()  {
        return  couponRepository.findCouponsByCompany(this.companyId);
    }
    //get coupons from specific category that belong to company
    public List<Coupon> getCompanyCoupons(Category category)  {
        return  couponRepository.findCouponsByCompanyAndCategory(this.companyId,category.ordinal());
    }
    //get coupons till max price that belong to company
    public List<Coupon> getCompanyCoupons(double maxPrice)  {
        return  couponRepository.findCouponsByCompanyAndMaxPrice(this.companyId,maxPrice);
    }
    //get company details
    public Company getCompanyDetails()  {
        return companyRepository.findById(this.companyId).orElseThrow();
    }


}