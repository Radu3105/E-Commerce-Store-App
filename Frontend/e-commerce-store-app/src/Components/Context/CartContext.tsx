import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        let currentCartItems = JSON.parse(localStorage.getItem("cartItems"));
        setCartItems(currentCartItems);
        if (currentCartItems) {
            let totalItems = 0;
            for (let item of currentCartItems) {
                totalItems += item.selectedQuantity;
            }
            setCartItemsCount(totalItems);
        }
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItemsCount,
                setCartItemsCount,
                cartItems,
                setCartItems,
                cartTotal, 
                setCartTotal,
            }}
        >
            {...children}
        </CartContext.Provider>
    );
}
