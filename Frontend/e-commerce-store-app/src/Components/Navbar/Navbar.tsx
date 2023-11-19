import { Link } from "react-router-dom";

function Navbar() {

    return (
        <div>
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/products">
                <button>Products</button>
            </Link>
        </div>
    );
}

export default Navbar;