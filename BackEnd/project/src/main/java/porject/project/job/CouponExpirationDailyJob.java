package porject.project.job;



import org.springframework.stereotype.Service;
import porject.project.entities.Coupon;
import porject.project.repostiories.CouponRepository;

import java.util.Date;
import java.util.List;
@Service
public class CouponExpirationDailyJob implements Runnable {


     private static CouponRepository couponRepository;

    private boolean isWorking = true;

    public CouponExpirationDailyJob(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }


    public void setWorking(boolean working) {
        isWorking = working;
    }

    @Override
    public void run() {
        while (isWorking) {
                List<Coupon> coupons = couponRepository.findAll();
                Date d = new Date();
                for (Coupon coupon : coupons) {
                    if (coupon.getEndDate()!=null&&coupon.getEndDate().before(d) || coupon.getAmount() == 0) {
                        couponRepository.deleteCouponsHistory(coupon.getId());
                        couponRepository.deleteById(coupon.getId());
                    }
                }
            try {
                Thread.sleep(86400000);
            } catch (InterruptedException e) {
                System.out.println("Error encountered while attempting to run daily task");


            }


        }
    }
}

