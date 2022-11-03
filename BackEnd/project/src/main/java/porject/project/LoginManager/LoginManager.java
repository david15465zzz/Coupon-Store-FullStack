package porject.project.LoginManager;


import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import porject.project.entities.Credentials;
import porject.project.enums.ClientType;
import porject.project.services.AdminService;
import porject.project.services.ClientService;
import porject.project.services.CustomerService;
import porject.project.services.CompanyService;

import javax.security.auth.login.LoginException;


@Service
public class LoginManager{

    private static ApplicationContext applicationContext;



    public LoginManager(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }





    public ClientService login(Credentials credentials) throws LoginException {
        switch(credentials.getClientType()){
            case Administrator:
                AdminService adminService = applicationContext.getBean(AdminService.class);
                if(!adminService.login(credentials.getEmail(), credentials.getPassword()))
                    throw new LoginException();
                return adminService;

            case Customer:
                CustomerService customerService= applicationContext.getBean(CustomerService.class);
                if(!customerService.login(credentials.getEmail(), credentials.getPassword()))
                    throw new LoginException();
                return customerService;

            case Company:
                CompanyService companyService= applicationContext.getBean(CompanyService.class);
                if(!companyService.login(credentials.getEmail(), credentials.getPassword()))
                    throw new LoginException();
                return companyService;

        }
        return null;
    }
}
