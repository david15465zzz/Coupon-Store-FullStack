package porject.project.repostiories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import porject.project.entities.Coupon;
import javax.transaction.Transactional;


@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {





    @Query(value ="select * from coupons where company_id = ?1",nativeQuery = true)
    List<Coupon> findCouponsByCompany(int id);

    @Query(value ="select * from coupons join customers_coupons on coupons.id=customers_coupons.coupons_id where customers_coupons.customer_id = ?1",nativeQuery = true)
    List<Coupon> findCouponsByCustomer(int id);

    @Query(value ="select * from coupons join customers_coupons on coupons.id=customers_coupons.coupons_id where customers_coupons.customer_id = ?1 and coupons.category = ?2",nativeQuery = true)
    List<Coupon> findCouponsByCustomerAndCategory(int id,int categoryOrdinal );

    @Query(value ="select * from coupons join customers_coupons on coupons.id=customers_coupons.coupons_id where customers_coupons.customer_id = ?1 and coupons.price <= ?2",nativeQuery = true)
    List<Coupon> findCouponsByCustomerAndMaxPrice(int id,double maxPrice);

    @Query(value ="select * from coupons where company_id = ?1 and category = ?2",nativeQuery = true)
    List<Coupon> findCouponsByCompanyAndCategory(int id,int categoryOrdinal);

    @Query(value ="select * from coupons where company_id = ?1 and price <= ?2",nativeQuery = true)
    List<Coupon> findCouponsByCompanyAndMaxPrice(int id,double maxPrice);

    @Query(value ="select * from coupons where company_id = ?1 and title = ?2",nativeQuery = true)
    Coupon findCouponsByTitleAndCompany(int companyId,String title);


    @Modifying
    @Transactional
    @Query(value = "delete from customers_coupons where coupons_id = ?1", nativeQuery = true)
    void deleteCouponsHistory(int id);

    @Modifying
    @Transactional
    @Query(value = "delete customers_coupons from customers_coupons  join coupons  on coupons.id=customers_coupons.coupons_id where  coupons.company_id =?1 ", nativeQuery = true)
    void deleteCouponsHistoryByCompany(int id);

    @Modifying
    @Transactional
    @Query(value = "delete from customers_coupons where customer_id = ?1", nativeQuery = true)
    void deleteCustomerCouponsHistory(int id);

    @Modifying
    @Transactional
    @Query(value = "delete from coupons where company_id = ?1",nativeQuery = true)
    void deleteCompanyCoupons(int id);



}
