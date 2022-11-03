package porject.project.controllers;

import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import javax.security.auth.login.LoginException;
import java.util.NoSuchElementException;

@ControllerAdvice
public class ControllersErrorHandler {
    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<?> authError(Exception ex, WebRequest request){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
    @ExceptionHandler(value = {LoginException.class})
    public ResponseEntity<?> LoginExceptionError(LoginException ex, WebRequest request){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
    }
    @ExceptionHandler(value = {IllegalArgumentException.class})
    public ResponseEntity<?> IllegalArgumentExceptionExceptionError(IllegalArgumentException ex, WebRequest request){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
    @ExceptionHandler(value = {NoSuchElementException.class})
    public ResponseEntity<?> NoSuchElementExceptionExceptionError(NoSuchElementException ex, WebRequest request){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

}