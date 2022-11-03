import "./Customercoupons.css";
import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import MyCusCouponCard from "../MyCusCouponCard/MyCusCouponCard";

function Customercoupons(): JSX.Element{

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [selectedCoupons, setselectedCoupons] = useState<CouponModel[] | undefined>();
    const [selectedCategory,setSelectedCategory] = useState<string>('FOOD')
    const [selectedPrice,setselectedPrice] = useState<number>(0)
    useEffect(() => {
        customerService.getMYCoupons()
            .then(prods => {
                setCoupons(prods)
            })
            .catch(err => { alert(err.message); console.log(err); }
            );
    }, []);


    function getByCategory() {
    
        customerService.getCouponsByCategory(selectedCategory)
            .then(prods =>  {
                setselectedCoupons(prods)
            })
            .catch(err => {
                notificationService.error(err); console.log(err);
            })
    }
    function getByMaxPrice() {
    
        customerService.getCouponsByMaxPrice(selectedPrice)
            .then(prods =>  {
                setselectedCoupons(prods)
            })
            .catch(err => {
                notificationService.error(err); console.log(err);
            })
    }
    function refresh() {
        setselectedCoupons(null)
    }


    return (
        <div className="Companycoupons">
            {selectedCoupons &&  <button  id="refresh" className="refresh" onClick={refresh}>Refresh</button>}

            <div>
                <label>select what category of coupons you want to see:</label>
                <select name="categories" id="categories" onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="FOOD">FOOD</option>
                    <option value="VACATIONS">VACATIONS</option>
                    <option value="MOVIES">MOVIES</option>
                    <option value="ATTRACTION">ATTRACTION</option>
                    <option value="SHOWS">SHOWS</option>
                    <option value="ELECTRICAL_POWER">ELECTRICAL_POWER</option>
                </select>
                <button className="byCategory" onClick={getByCategory}>get By Category</button><br/><br/>

                <label>select the max price of coupons you want to see</label>
                <input type="number" id="price" onChange={(e) => setselectedPrice(e.target.valueAsNumber)}></input>
                <button className="byPrice" onClick={getByMaxPrice}>get By Max Price</button>
            </div>

            {(selectedCoupons ?? coupons).map(c => <MyCusCouponCard key={c.id} coupon={c} />)}
           
        </div>
    );
}
export default Customercoupons;
