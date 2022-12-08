import React, { useState, useEffect } from 'react';
import axios from "../axios";
import AliceCarousel from 'react-alice-carousel' //https://www.npmjs.com/package/react-alice-carousel
import "react-alice-carousel/lib/alice-carousel.css";
import { Col, Container, Row, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from "../components/Loading";
import SimilarProduct from '../components/SimilarProduct';
import "./ProductPage.css";

function ProductPage() {
    const { id } = useParams();
    const user = useSelector(state => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }

    // const responsive = {
    //     0: { items: 1 },
    //     568: { items: 2 },
    //     1024: { items: 3 },
    // };

    const images = product.pictures.map((picture) => <img className='product__carousel--image' src={picture.url} onDragStart={handleDragStart}/>)

    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }

  return (
    <Container className='pt-4' style={{position: 'relative'}}>
        <Row>
            <Col lg={6}>
                <AliceCarousel mouseTracking items={images} controlsStrategy='alternate'/>
            </Col>
            <Col lg={6} className="pt-4">
                    <h1>{product.name}</h1>
                    <p>
                        <Badge bg="primary">{product.category}</Badge>
                    </p>
                    <p className="product__price">
                        ${product.price}
                    </p>
                    <p style={{ textAlign: "justify" }} className="py-3">
                        <strong>Description:</strong> {product.description}
                    </p>
            </Col>
        </Row>
    </Container>
  );
}

export default ProductPage;