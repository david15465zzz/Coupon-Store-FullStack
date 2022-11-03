
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <h2>  David.Sheymovich OPC copuon site <br/><br/>
                here you can sell  and  buy coupons!<br/>
                the coupons will belong to different companies and will have different purposes.<br/><br/>
                if you are a customer that loves to  spend wisely<br/>
                Or you are a company that wants to advance to a wider customer base<br/>
                dont be shy and register fast! While you are not with us you are missing out big time.<br/><br/>
                happy deals!</h2>
                <h3>*for registrations and other important needs  contact admin*</h3>
                <h3>*In order to start buying and selling, login first*</h3>
                {<img src="\Assets\Images\home.jpg" />}
        </div>
    );
}

export default Home;
