class CredentialsModel {
	public email: string;
    public password: string;
    public clientType: ClientType;

    public constructor(email: string, password: string,clientType: ClientType){
        this.email = email;
        this.password = password;
        this.clientType=clientType
    }
}
export enum ClientType {
    Administrator,Company,Customer
}


export default CredentialsModel;
