import HeaderLogo from "../../assets/HeaderLogo.jpg";
import Cookies from "js-cookie";
import{Link, withRouter} from 'react-router-dom';
import "./index.css";



const Header: React.FC = (props) => {

    const onclickLogout = () => {
        Cookies.remove('jwtToken');
        const {history}:any = props;
        history.replace('/login');
    };

    return (
        <nav className="nav-container">
            <img src={HeaderLogo} alt="HeaderLogo" className="header-logo" />
            <div className="heading-nav-container">
                <h1 className="header-heading">Tasty Kitchens</h1>
                <div className="nav-elements-container">
                    <Link to="/home"><p className="nav-element">Home</p></Link>
                    
                    <p className="nav-element">Cart</p>
                </div>
            </div>
            <button type="button" className="logout-button" onClick={onclickLogout}>
                Logout
            </button>
        </nav>
    );
};

export default withRouter(Header);