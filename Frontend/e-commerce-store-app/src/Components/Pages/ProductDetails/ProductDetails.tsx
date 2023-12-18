import { useContext, useEffect, useState } from "react";
import "./productDetails.css";
import { useParams } from "react-router";
import axios from "axios";
import tshirtImg from "../../../assets/images/tshirt.png";
import { CartContext } from "../../Context/CartContext";

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

    const { setCartItemsCount, cartItems, setCartItems } =
        useContext(CartContext);

    const [productData, setProductData] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedQuantity, setselectedQuantity] = useState<number>(1);
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
                // console.log(response.data);
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
        setselectedQuantity(1);
        setSelectedSize("");
    }, [selectedVariant]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    const handleQuantityIncrease = () => {
        setselectedQuantity(() => selectedQuantity + 1);
    };

    const handleQuantityDecrease = () => {
        if (selectedQuantity > 1) {
            setselectedQuantity(() => selectedQuantity - 1);
        }
    };

    const handleSelectVariant = (productVariant: ProductVariant) => {
        setSelectedVariant(productVariant);
    };

    const handleSelectSize = (productSize: string) => {
        setSelectedSize(productSize);
    };

    const handleAddToCart = () => {
        if (selectedSize === "") {
            alert("Please select a size");
        } else {
            // Find if the item already exists in the cart
            const existingCartItem = cartItems.find(
                (item) =>
                    item.variant.label === selectedVariant.label &&
                    item.selectedSize === selectedSize
            );

            if (existingCartItem) {
                // If the item exists, update its quantity
                setCartItems(
                    cartItems.map((item) =>
                        item.variant.label === selectedVariant.label &&
                        item.selectedSize === selectedSize
                            ? {
                                ...item,
                                selectedQuantity:
                                    item.selectedQuantity + selectedQuantity,
                            }
                            : item
                    )
                );
            } else {
                // If the item doesn't exist, add it to the cart
                setCartItems([
                    ...cartItems,
                    {
                        id: productData.id,
                        title: productData.title,
                        price: productData.price,
                        variant: {
                            id: selectedVariant.id,
                            label: selectedVariant.label,
                            image: selectedVariant.image,
                        },
                        selectedSize: selectedSize,
                        selectedQuantity: selectedQuantity,
                    },
                ]);
            }
            saveItemToLocalStorage();
        }
    };

    const saveItemToLocalStorage = () => {
        // First, we need to create a copy of the current cart items from the state
        // or retrieve it from localStorage if the state hasn't been updated yet.
        let updatedCartItems = [...cartItems];

        // Check if the item exists and update the quantity or add a new item.
        const existingCartItemIndex = updatedCartItems.findIndex(
            (item) =>
                item.variant.label === selectedVariant.label &&
                item.selectedSize === selectedSize
        );

        if (existingCartItemIndex !== -1) {
            // If the item exists, update its quantity.
            updatedCartItems[existingCartItemIndex] = {
                ...updatedCartItems[existingCartItemIndex],
                selectedQuantity:
                    updatedCartItems[existingCartItemIndex].selectedQuantity +
                    selectedQuantity,
            };
        } else {
            // If the item doesn't exist, add it to the cart.
            updatedCartItems.push({
                id: productData.id,
                title: productData.title,
                price: productData.price,
                variant: {
                    id: selectedVariant.id,
                    label: selectedVariant.label,
                    image: selectedVariant.image,
                },
                selectedSize: selectedSize,
                selectedQuantity: selectedQuantity,
            });
        }

        // Save the updated cart items to localStorage.
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        // It's important to also update the state to reflect these changes.
        setCartItems(updatedCartItems);
    };

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
                                            ></button>
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
                                <p>{selectedQuantity}</p>
                                <button onClick={handleQuantityIncrease}>
                                    +
                                </button>
                            </div>
                            <button
                                className="product-details-info-add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
