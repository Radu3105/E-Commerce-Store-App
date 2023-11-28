import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faUser,
    faCartShopping,
    faBars,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const [linkDropdown, setLinkDropdown] = useState<string>("");
    const [searchDropdownMobile, setSearchDropdownMobile] = useState<boolean>(false);

    return (
        <header className="navbar-container">
            <Link to="/">
                <div className="navbar-logo">
                    <img
                        className="navbar-logo-img"
                        src={logo}
                        alt="logo"
                    ></img>
                    <p>Fashion Store</p>
                </div>
            </Link>
            <div className="navbar-group">
                <div className="navbar-links">
                    <Link to="/products">
                        <button>All Products</button>
                    </Link>
                    <div className="navbar-dropdown">
                        <button
                            onMouseEnter={() => setLinkDropdown("collections")}
                            onMouseLeave={() => setLinkDropdown("")}
                        >
                            Collections
                        </button>
                        {linkDropdown === "collections" && (
                            <div
                                className="navbar-dropdown-content"
                                onMouseEnter={() =>
                                    setLinkDropdown("collections")
                                }
                                onMouseLeave={() => setLinkDropdown("")}
                                onClick={() => setLinkDropdown("")}
                            >
                                <Link to="/men">
                                    <p>Men</p>
                                </Link>
                                <Link to="/women">
                                    <p>Women</p>
                                </Link>
                                <Link to="/accessories">
                                    <p>Accessories</p>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="navbar-dropdown">
                        <button
                            onMouseEnter={() => setLinkDropdown("specials")}
                            onMouseLeave={() => setLinkDropdown("")}
                        >
                            Specials
                        </button>
                        {linkDropdown === "specials" && (
                            <div
                                className="navbar-dropdown-content"
                                onMouseEnter={() => setLinkDropdown("specials")}
                                onMouseLeave={() => setLinkDropdown("")}
                                onClick={() => setLinkDropdown("")}
                            >
                                <Link to="/sales">
                                    <p>Sales</p>
                                </Link>
                                <Link to="/newArrivals">
                                    <p>New Arrivals</p>
                                </Link>
                                <Link to="/bestSellers">
                                    <p>Best Sellers</p>
                                </Link>
                                <Link to="/limitedEdition">
                                    <p>Limited Edition</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="navbar-search-desktop">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="search" placeholder="Search"></input>
                </div>
                <div
                    className="navbar-search-mobile"
                    onClick={() => setSearchDropdownMobile(true)}
                    onBlur={() => setSearchDropdownMobile(false)}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    {searchDropdownMobile && (
                        <div className="navbar-search-mobile-dropdown-content">
                            <input
                                type="search"
                                placeholder="Search"
                                autoFocus
                            ></input>
                        </div>
                    )}
                </div>
                <div className="navbar-customer-account">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="navbar-shopping-cart-btn">
                    <FontAwesomeIcon icon={faCartShopping} />
                </div>
                <div className="navbar-menu-mobile">
                    <div
                        className="navbar-dropdown"
                        onClick={() => setLinkDropdown("optionsMobile")}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    {linkDropdown === "optionsMobile" && (
                        <div className="navbar-dropdown-content-mobile">
                            <h2>Products</h2>
                            <Link to="/products" onClick={() => setLinkDropdown("")}>
                                <p>All Products</p>
                            </Link>
                            <h2>Collections</h2>
                            <Link to="/men" onClick={() => setLinkDropdown("")}>
                                <p>Men</p>
                            </Link>
                            <Link
                                to="/women"
                                onClick={() => setLinkDropdown("")}
                            >
                                <p>Women</p>
                            </Link>
                            <Link
                                to="/accessories"
                                onClick={() => setLinkDropdown("")}
                            >
                                <p>Accessories</p>
                            </Link>
                            <h2>Specials</h2>
                            <Link
                                to="/sales"
                                onClick={() => setLinkDropdown("")}
                            >
                                <p>Sales</p>
                            </Link>
                            <Link
                                to="/newArrivals"
                                onClick={() => setLinkDropdown("")}
                            >
                                <p>New Arrivals</p>
                            </Link>
                            <Link
                                to="/bestSellers"
                                onClick={() => setLinkDropdown("")}
                            >
                                <p>Best Sellers</p>
                            </Link>
                            <Link
                                to="/limitedEdition"
                                onClick={() => setLinkDropdown("")}
                            >
                                <p>Limited Edition</p>
                            </Link>
                            <div className="navbar-customer-account-mobile">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    style={{ color: "#ffffff" }}
                                />
                                <h3>My Account</h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
