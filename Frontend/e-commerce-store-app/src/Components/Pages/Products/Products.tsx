import "./products.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

interface Product {
    id: string;
    title: string;
    price: number;
}

interface ApiResponse {
    items: Product[];
    totalPages: number;
}

export default function Products() {
    const PRODUCTS_PER_PAGE: number = 20;

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchClothes = async () => {
            try {
                setLoading(true);
                const response = await axios.get<ApiResponse>(`${import.meta.env.VITE_API_URL}/Product?pageNumber=${currentPageNumber}&pageSize=${PRODUCTS_PER_PAGE}`);
                setProductsData(response.data.items);
                setTotalPages(response.data.totalPages);
            } catch(error) {
                console.error("Error" + error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchClothes();
    }, [currentPageNumber]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const handleOnPageBtnClick = (e) => {
        setCurrentPageNumber(parseInt(e.target.innerHTML));
    }

    const handleOnCardClick = (productId: string) => {
        navigate(productId);
    }

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 0; i < totalPages; i++) {
            buttons.push(<button key={i} onClick={(e) => handleOnPageBtnClick(e)}>{i + 1}</button>);
        }
        return buttons;
    }

    return (
        <>
            <div className="products-container">
                <div className="products-product-list-container">
                    {productsData.map((product) => (
                        <div className="products-product-card" key={product.id} onClick={() => handleOnCardClick(product.id)}>
                            <img className="products-product-card-img" src="" alt="img"></img>
                            <div className="products-product-card-info">
                                <p>{product.title}</p>
                                <p>{product.price}$</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="products-product-list-pages-btn-container">
                    {renderPageButtons()}
                </div>
            </div>
        </>
    );
}
