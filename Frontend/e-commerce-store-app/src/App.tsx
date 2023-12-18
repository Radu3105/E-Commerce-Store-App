import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Products from "./Components/Pages/Products/Products";
import Navbar from "./Components/Navbar/Navbar";
import ProductDetails from "./Components/Pages/ProductDetails/ProductDetails";
import CartProvider from "./Components/Context/CartContext";

function App() {
    return (
        <>
            <Router>
                <CartProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/products" element={<Products />}></Route>
                        <Route path="/products/:id" element={<ProductDetails />}></Route>
                    </Routes>
                </CartProvider>
            </Router>
        </>
    );
}

export default App;
