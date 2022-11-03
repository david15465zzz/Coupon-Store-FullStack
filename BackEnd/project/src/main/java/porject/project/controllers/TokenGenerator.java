package porject.project.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;
import porject.project.entities.Company;
import porject.project.entities.Customer;

import java.util.Calendar;
import java.util.Date;
@Component
public class TokenGenerator {
    protected String createTokenForAdmin(){
        Calendar expiresAt = Calendar.getInstance();
        expiresAt.add(Calendar.MINUTE, 30);
        Date expires = expiresAt.getTime();
        String token = JWT.create()
                .withIssuer("DavidTech")
                .withIssuedAt(new Date())
                .withClaim("id", 0)
                .withClaim("role", "admin")
                .withExpiresAt(expires)
                .sign(Algorithm.HMAC256("topSecret"));
        return token;
    }
    protected String createTokenForCompany(Company company){
        Calendar expiresAt = Calendar.getInstance();
        expiresAt.add(Calendar.MINUTE, 30);
        Date expires = expiresAt.getTime();
        String token = JWT.create()
                .withIssuer("DavidTech")
                .withIssuedAt(new Date())
                .withClaim("id", company.getId())
                .withClaim("role", "company")
                .withExpiresAt(expires)
                .sign(Algorithm.HMAC256("topSecret"));
        return token;
    }
    protected String createTokenForCustomer(Customer customer){
        Calendar expiresAt = Calendar.getInstance();
        expiresAt.add(Calendar.MINUTE, 30);
        Date expires = expiresAt.getTime();
        String token = JWT.create()
                .withIssuer("DavidTech")
                .withIssuedAt(new Date())
                .withClaim("id", customer.getId())
                .withClaim("role", "customer")
                .withExpiresAt(expires)
                .sign(Algorithm.HMAC256("topSecret"));
        return token;
    }
}
