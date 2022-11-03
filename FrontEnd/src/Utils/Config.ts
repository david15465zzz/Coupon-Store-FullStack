class Config{

}

class DevelopmentConfig extends Config{
    public adminsUrl: string = "http://localhost:8080/admin/";
    public companyUrl: string = "http://localhost:8080/company/";
    public customerUrl: string = "http://localhost:8080/customer/";
    public loginUrl: string = "http://localhost:8080/login/";
}


class ProductionConfig extends Config{
    public adminsUrl: string = "http://production/admin/";
    public companyUrl: string = "http://production/company/";
    public customerUrl: string = "http://production/customer/";
    public loginUrl: string = "http://production/login/";
   
}

const appConfig = process.env.NODE_ENV === "development"? 
    new DevelopmentConfig() : new ProductionConfig();

export default appConfig;