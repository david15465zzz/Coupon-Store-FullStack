import { Link } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import "./CompanyCard.css";
interface  CompanyProps{
    comapny : CompanyModel
}

function CompanyCard(props:  CompanyProps): JSX.Element {
    return (
        <div className="CompanyCard box">
			<div>
            <Link to={"/companies/" + props.comapny.id}>
            <h3>{props.comapny.name} </h3>
            {<img src="\Assets\Images\company.jpg"  />}
                </Link>
            </div>
        </div>
    );
}
export default CompanyCard;