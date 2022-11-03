package porject.project.entities;


import porject.project.enums.ClientType;

public class Credentials {
    private String email;
    private String password;
    private ClientType clientType;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public ClientType getClientType() {
        return clientType;
    }
}
