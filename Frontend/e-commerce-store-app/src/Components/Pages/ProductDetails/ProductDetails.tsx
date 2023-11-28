import { useEffect, useState } from "react";
import "./productDetails.css";
import { useParams } from "react-router";
import axios from "axios";
import tshirtImg from "../../../assets/images/tshirt.png";

interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    variants: ProductVariant[];
}

interface ProductVariant {
    label: string;
    color: string;
    image: string;
    quantityXS: number;
    quantityS: number;
    quantityM: number;
    quantityL: number;
    quantityXL: number;
    quantityXXL: number;
}

interface ApiResponse {
    data: Product;
}

export default function ProductDetails() {
    const { id } = useParams();

    const [productData, setProductData] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [requestedQuantity, setRequestedQuantity] = useState<number>(1);
    const [selectedVariant, setSelectedVariant] =
        useState<ProductVariant | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get<ApiResponse>(
                    `${import.meta.env.VITE_API_URL}/Product/${id}`
                );
                console.log(response.data);
                setProductData(response.data);
                setSelectedVariant(response.data.variants[0]);
            } catch (error) {
                console.error("Error: " + error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    useEffect(() => {
        setRequestedQuantity(1);
        setSelectedSize("");
    }, [selectedVariant]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    const handleQuantityIncrease = () => {
        setRequestedQuantity(() => requestedQuantity + 1);
    };

    const handleQuantityDecrease = () => {
        if (requestedQuantity > 1) {
            setRequestedQuantity(() => requestedQuantity - 1);
        }
    };

    const handleSelectVariant = (productVariant: ProductVariant) => {
        setSelectedVariant(productVariant);
        console.log(productVariant);
    };

    const handleSelectSize = (productSize: string) => {
        setSelectedSize(productSize);
    }

    const handleAddToCart = () => {
        if (selectedSize === "") {
            alert("Please select a size");
        }
        else {
            alert("Added to cart");
        }
    }

    return (
        <>
            <div className="product-details-container">
                <div className="product-details-group">
                    <img
                        className="product-details-img"
                        src={tshirtImg}
                        alt="img"
                    ></img>
                    <div className="product-details-info">
                        <h1>{productData.title}</h1>
                        <h1>{productData.price}$</h1>
                        <h2>Description</h2>
                        <p>{productData.description}</p>
                        {productData.variants.length > 1 && (
                            <>
                                <h2>Variant</h2>
                                <div className="product-details-info-variant-options-container">
                                    {productData.variants.map(
                                        (productVariant) => (
                                            <button
                                                className={
                                                    selectedVariant ===
                                                    productVariant
                                                        ? "product-details-selected-variant"
                                                        : "product-details-info-variant-option"
                                                }
                                                style={{
                                                    backgroundColor: `${productVariant.color}`,
                                                }}
                                                onClick={() =>
                                                    handleSelectVariant(
                                                        productVariant
                                                    )
                                                }
                                                key={productVariant.label}
                                            >
                                                {/* {productVariant.label} */}
                                            </button>
                                        )
                                    )}
                                </div>
                            </>
                        )}
                        <h2>Size</h2>
                        <div className="product-details-info-size-options-container">
                            <button
                                className={
                                    selectedVariant?.quantityXS > 0
                                        ? selectedSize === "XS"
                                            ? "product-details-info-size-option-selected"
                                            : "product-details-info-size-option-valid"
                                        : "product-details-info-size-option-invalid"
                                }
                                onClick={() => handleSelectSize("XS")}
                            >
                                XS
                            </button>
                            <button
                                className={
                                    selectedVariant?.quantityS > 0
                                    ? selectedSize === "S"
                                        ? "product-details-info-size-option-selected"
                                        : "product-details-info-size-option-valid"
                                    : "product-details-info-size-option-invalid"
                                }
                                onClick={() => handleSelectSize("S")}
                            >
                                S
                            </button>
                            <button
                                className={
                                    selectedVariant?.quantityM > 0
                                    ? selectedSize === "M"
                                        ? "product-details-info-size-option-selected"
                                        : "product-details-info-size-option-valid"
                                    : "product-details-info-size-option-invalid"
                                }
                                onClick={() => handleSelectSize("M")}
                            >
                                M
                            </button>
                            <button
                                className={
                                    selectedVariant?.quantityL > 0
                                    ? selectedSize === "L"
                                        ? "product-details-info-size-option-selected"
                                        : "product-details-info-size-option-valid"
                                    : "product-details-info-size-option-invalid"
                                }
                                onClick={() => handleSelectSize("L")}
                            >
                                L
                            </button>
                            <button
                                className={
                                    selectedVariant?.quantityXL > 0
                                    ? selectedSize === "XL"
                                        ? "product-details-info-size-option-selected"
                                        : "product-details-info-size-option-valid"
                                    : "product-details-info-size-option-invalid"
                                }
                                onClick={() => handleSelectSize("XL")}
                            >
                                XL
                            </button>
                            <button
                                className={
                                    selectedVariant?.quantityXXL > 0
                                    ? selectedSize === "XXL"
                                        ? "product-details-info-size-option-selected"
                                        : "product-details-info-size-option-valid"
                                    : "product-details-info-size-option-invalid"
                                }
                                onClick={() => handleSelectSize("XXL")}
                            >
                                XXL
                            </button>
                        </div>
                        {selectedVariant?.quantityXS === 0 &&
                        selectedVariant?.quantityS === 0 &&
                        selectedVariant?.quantityM === 0 &&
                        selectedVariant?.quantityL === 0 &&
                        selectedVariant?.quantityXL === 0 &&
                        selectedVariant?.quantityXXL === 0 ? (
                            <p className="product-details-info-not-instock">
                                Not In Stock
                            </p>
                        ) : (
                            <p className="product-details-info-instock">
                                In Stock
                            </p>
                        )}

                        <div className="product-details-info-group-1">
                            <div className="product-details-info-group-2">
                                <button onClick={handleQuantityDecrease}>
                                    -
                                </button>
                                <p>{requestedQuantity}</p>
                                <button onClick={handleQuantityIncrease}>
                                    +
                                </button>
                            </div>
                            <button className="product-details-info-add-to-cart-btn" onClick={handleAddToCart}>
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
