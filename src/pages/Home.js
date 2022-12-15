import React, { useEffect } from "react";
import axios from "../axios";
import { v4 as uuid } from 'uuid';
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import categories from "../categories";
import ProductPreview from "../components/ProductPreview";
import { updateProducts } from "../features/productSlice";
import "./Home.css";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const lastProducts = products.slice(0,8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, [dispatch]);

  return (
    <div>
        <img src="https://res.cloudinary.com/dlygntleh/image/upload/v1671070262/samples/ecommerce/vecteezy_online-shopping-on-phone-buy-sell-business-digital-web_4299835_akbx81.jpg" className="home-banner" alt="banner header"/>
        <div className="featured-products-container container mt-4">
            <h2>Latest Products</h2>
            {/* lat products here */}
            <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview key={uuid()} {...product} />
                    ))}
            </div>
        </div>
        
        <div className="recent-products-container container mt-4">
            <h2>Categories</h2>
            <div>
                <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>See all {">>"}</Link>
            </div>
            <Row>
                {categories.map((category) => (
                    <LinkContainer key={uuid()} to={`/category/${category.name.toLocaleLowerCase()}`}>
                    <Col md={4}>
                        <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                            {category.name}
                        </div>
                    </Col>
                    </LinkContainer>
                ))}
            </Row>
        </div>
    </div>
  );
}

export default Home