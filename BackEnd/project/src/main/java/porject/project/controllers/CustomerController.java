package porject.project.controllers;


import com.auth0.jwt.JWT;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import porject.project.entities.Coupon;
import porject.project.entities.Customer;
import porject.project.entities.Facades;
import porject.project.enums.Category;

import porject.project.services.CustomerService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "/customer")
@CrossOrigin
public class CustomerController {
    private HttpServletRequest request;

    private HashMap<Long, Facades> facades;

    public CustomerController(HttpServletRequest request, HashMap<Long, Facades> facades) {
        this.request = request;
        this.facades = facades;
    }

    @PostMapping(path = "/purchase")
            public ResponseEntity<?> purchaseCoupon( @RequestBody Coupon coupon) throws Exception {
            customerService().purchaseCoupon(coupon);
            coupon.setAmount(coupon.getAmount()-1);
            return ResponseEntity.ok(coupon);
    }


    @GetMapping(path = "/Coupons")
    public List<Coupon> getAllCoupons(){
        return customerService().getAllCoupons();
    }
    @GetMapping(path = "/Coupons/Mine")
    public List<Coupon> getCustomerCoupons(){
        return customerService().getCustomerCoupons();
    }
    @GetMapping(path = "/Coupons/byCategory/{category}")
    public List<Coupon> getCustomerCoupons(@PathVariable String category){
        Category c = Category.valueOf(category);
        return customerService().getCustomerCoupons(c);
    }
    @GetMapping(path = "/Coupons/byPrice/{maxPrice}")
    public List<Coupon> getCustomerCoupons(@PathVariable double maxPrice){
        return customerService().getCustomerCoupons(maxPrice);
    }
    @GetMapping(path = "/Details")
    public Customer getCustomerDetails(){
        return customerService().getCustomerDetails();
    }


    public CustomerService customerService() {
        String token = request.getHeader("authorization").replace("Bearer ", "");
        long id = JWT.decode(token).getClaim("id").asLong();
        Facades facade = facades.get(id);
        if (facade != null) {
            facade.setLastActive(System.currentTimeMillis());
            CustomerService service = (CustomerService) facade.getService();
            return service;
        }
        return null;
    }















}
