import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ProductPage() {
    const { id } = useParams();
    const user = useSelector(state => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);


  return (
    <Container className='pt-4' style={{position: 'relative'}}>
        <Row>
            <Col lg={6}>
            </Col>
        </Row>
    </Container>
  )
}

export default ProductPage