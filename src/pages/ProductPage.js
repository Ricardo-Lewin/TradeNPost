import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel' //https://www.npmjs.com/package/react-alice-carousel
import "react-alice-carousel/lib/alice-carousel.css";
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from "../components/Loading";

function ProductPage() {
    const { id } = useParams();
    const user = useSelector(state => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);

    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const handleDragStart = (e) => e.preventDefault();

    const images = product.picture.map((picture) => <img className='product__carousel--image' src={picture.url} onDragStart={handleDragStart}/>)

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
        </Row>
    </Container>
  )
}

export default ProductPage