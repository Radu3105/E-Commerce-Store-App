import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Products from "./Components/Pages/Products/Products";
import Navbar from "./Components/Navbar/Navbar";

function App() {
    
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/products" element={<Products />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
