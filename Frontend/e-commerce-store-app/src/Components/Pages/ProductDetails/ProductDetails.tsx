import { useEffect, useState } from "react";
import "./productDetails.css";
import { useParams } from "react-router";
import axios from "axios";
import tshirtImg from '../../../assets/images/tshirt.png'

interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
}

interface ApiResponse {
    data: Product;
}

export default function ProductDetails() {
    const { id } = useParams();
    
    const [productData, setProductData] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [requestedQuantity, setRequestedQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get<ApiResponse>(`${import.meta.env.VITE_API_URL}/Product/${id}`);
                console.log(response.data);
                setProductData(response.data);
            }
            catch(error) {
                console.error("Error: " + error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }

    const handleQuantityIncrease = () => {
        setRequestedQuantity(() => requestedQuantity + 1);
    }

    const handleQuantityDecrease = () => {
        if (requestedQuantity > 1) {
            setRequestedQuantity(() => requestedQuantity - 1);
        }
    }

    return (
        <>
            <div className="product-details-container">
                <div className="product-details-group">
                    <img className="product-details-img" src={tshirtImg} alt="img"></img>
                    <div className="product-details-info">
                        <h1>{productData.title}</h1>
                        <h1>{productData.price}$</h1>
                        <h2>Description</h2>
                        <p>{productData.description}</p>
                        {/* <p>Variant:</p>
                        <div className="product-details-info-variant-options-container">
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div> */}
                        <h2>Size</h2>
                        <div className="product-details-info-size-options-container">
                            <button>XS</button>
                            <button>S</button>
                            <button>M</button>
                            <button>L</button>
                            <button>XL</button>
                            <button>XXL</button>
                        </div>
                        <p className="product-details-info-instock">In Stock</p>
                        <div className="product-details-info-group-1">
                            <div className="product-details-info-group-2">
                                <button onClick={handleQuantityDecrease}>-</button>
                                <p>{requestedQuantity}</p>
                                <button onClick={handleQuantityIncrease}>+</button>
                            </div>
                            <button className="product-details-info-add-to-cart-btn">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}