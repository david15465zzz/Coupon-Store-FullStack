package porject.project.controllers;

import com.auth0.jwt.JWT;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import porject.project.entities.Company;
import porject.project.entities.Customer;
import porject.project.entities.Facades;
import porject.project.services.AdminService;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping(path = "/admin")
@CrossOrigin
public class AdminController {


    private HttpServletRequest request;

    private HashMap<Long, Facades> facades;




    public AdminController(HttpServletRequest request, HashMap<Long, Facades> facades) {
        this.request = request;
        this.facades = facades;
    }

    @PostMapping(path = "/Companies")
    public ResponseEntity<?> addCompany(@RequestBody Company company) throws Exception {

            adminService().addCompany(company);
            return ResponseEntity.ok(company);
    }

    @PutMapping(path = "/Companies")
    public ResponseEntity<?> updateCompany(@RequestBody Company company) throws Exception {
            adminService().updateCompany(company);
            return ResponseEntity.ok(company);

    }

    @DeleteMapping(path = "/Companies/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable int id) throws Exception {
            adminService().deleteCompany(id);
            return ResponseEntity.ok("company deleted");

    }

    @GetMapping(path = "/Companies/{id}")
    public Company getCompany(@PathVariable int id) {
        return  adminService().getCompany(id);
    }

    @GetMapping(path = "/Companies")
    public List<Company> getCompanies() {
        return  adminService().getCompanies();
    }

    /////////

    @PostMapping(path = "/Customers")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) throws Exception {
            adminService().addCustomer(customer);
            return ResponseEntity.ok(customer);
    }

    @PutMapping(path = "/Customers")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer) throws Exception {
        adminService().updateCustomer(customer);
        return ResponseEntity.ok(customer);
    }

    @DeleteMapping(path = "/Customers/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int id) throws Exception {
            adminService().deleteCustomer(id);
            return ResponseEntity.ok("customer deleted");
    }

    @GetMapping(path = "/Customers/{id}")
    public Customer getCustomer(@PathVariable int id) {
        return  adminService().getCustomer(id);
    }

    @GetMapping(path = "/Customers")
    public List<Customer> getCustomers() {
        return  adminService().getCustomers();
    }

    public AdminService adminService() {
        String token = request.getHeader("authorization").replace("Bearer ", "");
        long id = JWT.decode(token).getClaim("id").asInt();
        Facades facade = facades.get(id);
        if (facade != null) {
            facade.setLastActive(System.currentTimeMillis());
            AdminService service = (AdminService) facade.getService();
            return service;
        }
        return null;
    }
}
