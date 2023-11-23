import { Link } from "react-router-dom";
import './style.css';

function Menu() {
    return(
        <div className="menu">
            <Link to="/">home</Link>
            <Link to="/teste">vagas</Link>
        </div>
    )
}
export default Menu