import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faUser,
    faCartShopping,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
    const {
        cartItemsCount,
        setCartItemsCount,
        cartItems,
        setCartItems,
        cartTotal,
        setCartTotal,
    } = useContext(CartContext);

    const [linkDropdown, setLinkDropdown] = useState<string>("");
    const [cartDropdown, setCartDropdown] = useState<boolean>(false);
    const [searchDropdownMobile, setSearchDropdownMobile] =
        useState<boolean>(false);

    useEffect(() => {
        // Get cart items from localStorage for initial rendering
        const currentCartItems = JSON.parse(localStorage.getItem("cartItems"));
        setCartItems(currentCartItems);
    }, []);

    // Effect takes place when detecting a change in the cart items
    useEffect(() => {
        // Update cart total
        console.log("Changed");
        let total = 0;
        if (cartItems.length > 0) {
            for (const item of cartItems) {
                total += item.selectedQuantity * item.price;
            }
        }
        setCartTotal(total);

        // Update cart items count
        let totalItems = 0;
        if (cartItems.length > 0) {
            for (const item of cartItems) {
                totalItems += item.selectedQuantity;
            }
        }
        setCartItemsCount(totalItems);
    }, [cartItems]);

    const handleCartItemRemoval = (cartItemLabel, cartItemSize) => {
        // Remove item from localStorage
        let localStorageItems = JSON.parse(localStorage.getItem("cartItems"));
        for (let i = 0; i < localStorageItems.length; i++) {
            if (
                localStorageItems[i].variant.label === cartItemLabel &&
                localStorageItems[i].selectedSize === cartItemSize
            ) {
                // Remove element from localStorage at position 'i'
                localStorageItems.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("cartItems", JSON.stringify(localStorageItems));

        // Remove item from cart items array
        let remainingItems = cartItems.filter(
            (item) =>
                item.variant.label !== cartItemLabel ||
                item.selectedSize !== cartItemSize
        );
        setCartItems(remainingItems);
    };

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
                <div
                    className="navbar-shopping-cart-btn"
                    onMouseEnter={() => setCartDropdown(true)}
                    onMouseLeave={() => setCartDropdown(false)}
                >
                    <FontAwesomeIcon icon={faCartShopping} />
                    {cartItemsCount !== 0 ? (
                        <div className="navbar-shopping-cart-item-count">
                            <p>{cartItemsCount < 100 ? cartItemsCount : "99+"}</p>
                        </div>
                    ) : null}
                </div>
                {cartDropdown && (
                    <div
                        className="navbar-shopping-cart-dropdown-container"
                        onMouseEnter={() => setCartDropdown(true)}
                        onMouseLeave={() => setCartDropdown(false)}
                    >
                        <h3 className="navbar-shopping-cart-dropdown-title">
                            Shopping Cart
                        </h3>
                        {cartItems.length > 0 ? (
                            <>
                                <div className="navbar-shopping-cart-group-2">
                                    {cartItems.map((item) => (
                                        <div
                                            key={
                                                item.variant.label +
                                                item.selectedSize
                                            }
                                            className="navbar-shopping-cart-dropdown-item"
                                        >
                                            <div className="navbar-shopping-cart-group">
                                                <h4>{item.title}</h4>
                                                <p>
                                                    Variant:{" "}
                                                    {item.variant.label}
                                                </p>
                                                <p>Size: {item.selectedSize}</p>
                                            </div>
                                            <p>x {item.selectedQuantity}</p>
                                            <p>
                                                {parseFloat(
                                                    item.selectedQuantity *
                                                        item.price
                                                ).toFixed(2)}
                                                $
                                            </p>
                                            <p
                                                className="navbar-shopping-cart-item-remove-btn"
                                                onClick={() =>
                                                    handleCartItemRemoval(
                                                        item.variant.label,
                                                        item.selectedSize
                                                    )
                                                }
                                            >
                                                Remove
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                {cartItems.length > 0 && (
                                    <div className="navbar-shopping-cart-group-3">
                                        <p>Total:</p>
                                        <p>
                                            {parseFloat(cartTotal).toFixed(2)}$
                                        </p>
                                    </div>
                                )}
                                <button className="navbar-shopping-cart-dropdown-checkout-btn">
                                    Go to Checkout
                                </button>
                            </>
                        ) : (
                            <p>No items in cart.</p>
                        )}
                    </div>
                )}
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
                            <Link
                                to="/products"
                                onClick={() => setLinkDropdown("")}
                            >
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
