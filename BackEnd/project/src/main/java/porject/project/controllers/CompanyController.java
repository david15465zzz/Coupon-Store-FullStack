package porject.project.controllers;


import com.auth0.jwt.JWT;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import porject.project.entities.Company;
import porject.project.entities.Coupon;
import porject.project.entities.Facades;
import porject.project.enums.Category;
import porject.project.services.CompanyService;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "/company")
@CrossOrigin
public class CompanyController  {
    private HttpServletRequest request;

    private HashMap<Long, Facades> facades;

    public CompanyController(HttpServletRequest request, HashMap<Long, Facades> facades) {
        this.request = request;
        this.facades = facades;
    }

    @PostMapping(path = "/Coupons")
        public ResponseEntity<?> addCoupon(@RequestBody Coupon coupon) throws Exception {


        companyService().addCoupon(coupon);
                return ResponseEntity.ok(coupon);
        }



    @PutMapping(path = "/Coupons")
    public ResponseEntity<?> updateCoupon(@RequestBody Coupon coupon) throws Exception {
            companyService().updateCoupon(coupon);
            return ResponseEntity.ok(coupon);

    }
    @DeleteMapping(path = "/Coupons/{id}")
    public ResponseEntity<?>   deleteCoupon(@PathVariable int id) throws Exception {
            companyService().deleteCoupon(id);
            return ResponseEntity.ok("coupon deleted");

    }

    @GetMapping(path = "/Coupons")
    public List<Coupon> getCompanyCoupons(){
        return  companyService().getCompanyCoupons();
    }

    @GetMapping(path = "/Coupons/byCategory/{category}")
    public List<Coupon> getCompanyCoupons(@PathVariable String category){
        Category c = Category.valueOf(category);
        return  companyService().getCompanyCoupons(c);
    }
    @GetMapping(path = "/Coupons/byPrice/{maxPrice}")
    public List<Coupon> getCompanyCoupons(@PathVariable double maxPrice){
        return  companyService().getCompanyCoupons(maxPrice);
    }
    @GetMapping(path = "/Details")
    public Company getCompanyDetails(){
        return  companyService().getCompanyDetails();

    }


    public CompanyService companyService() {
        String token = request.getHeader("authorization").replace("Bearer ", "");
        long id = JWT.decode(token).getClaim("id").asLong();
        Facades facade = facades.get(id);
        if (facade != null) {
            facade.setLastActive(System.currentTimeMillis());
            CompanyService service = (CompanyService) facade.getService();

            return service;
        }
        return null;
    }




}

