import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./DashboardProducts.css";

function DashboardProducts() {
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    // removing the product
    
    function handleDeleteProduct(id) {
        // logic here
      
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => 
                    <tr>
                        <td>
                            <img src={product.pictures[0].url} className="dashboard-product-preview"/>
                        </td>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>
                            <Button onClick={() => handleDeleteProduct(product._id, user._id)}>Delete</Button>
                            <Link to ={`/product/${product._id}/edit`} className='btn btn-warning'>
                                Edit
                            </Link>
                        </td>
                    </tr>
                    )}
            </tbody>
        </Table>
    );
}

export default DashboardProducts;