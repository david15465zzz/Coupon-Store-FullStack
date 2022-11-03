import { Link } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import "./CustomerCard.css";
interface  CustomerProps{
    customer : CustomerModel
}
function CustomerCard(props:  CustomerProps): JSX.Element {
    return (
        <div className=" CustomerCard box">
			<div>
            <Link to={"/customers/" + props.customer.id}>
            <h3>{props.customer.first_name}  {props.customer.last_name} </h3>
            {<img src="\Assets\Images\customer.jpg"  />}
                </Link>
            </div>
        </div>
    );
}

export default CustomerCard;
