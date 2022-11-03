package porject.project.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import porject.project.LoginManager.LoginManager;
import porject.project.entities.Credentials;
import porject.project.entities.Facades;
import porject.project.services.ClientService;
import porject.project.services.CompanyService;
import porject.project.services.CustomerService;

import javax.security.auth.login.LoginException;

import java.util.HashMap;

@RestController
@CrossOrigin
public class LoginController {

    private LoginManager loginManager;
    private HashMap<Long, Facades> facades;

    TokenGenerator tokenGenerator;

    public LoginController(LoginManager loginManager, HashMap<Long, Facades> facades, TokenGenerator tokenGenerator) {
        this.loginManager = loginManager;
        this.facades = facades;
        this.tokenGenerator = tokenGenerator;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Credentials credentials) throws LoginException {
        ClientService service;
            service = loginManager.login(credentials);
        String token;
        long id;
        if(service instanceof CustomerService){
            id = ((CustomerService) service).getCustomerId();
        token=tokenGenerator.createTokenForCustomer(((CustomerService) service).getCustomerDetails());}
        else if(service instanceof CompanyService){
            id = ((CompanyService) service).getCompanyId();
            token=tokenGenerator.createTokenForCompany(((CompanyService)  service).getCompanyDetails());}
        else {
            id = 0;
            token=tokenGenerator.createTokenForAdmin();
        }
        facades.put(id, new Facades(service, System.currentTimeMillis()));
            return ResponseEntity.ok(token);



    }


}