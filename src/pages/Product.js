// Product.js
import {Link, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import productData from "../products.json";
import Button from 'react-bootstrap/Button';
const Product = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
      setQuantity(quantity + 1);
    }
  
    const decrementQuantity = () => {
      if(quantity > 1) setQuantity(quantity - 1);
    }
    const errorMsg = (
      <div>
        <h1>Error, this product does not exist...</h1>
      </div>
    )
    let productId = searchParams.get("id"); //get id by get request
    let product = productData.find(p => 
      p.id == productId
    );
    if(product == null){
      return errorMsg
    }
    // successful case where product exists
    return (
      <div className="product">
        <div className='product-image'>
          <img src= {product.img} alt={product.name + " Album Cover"}  />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-purchase">
            <p>{product.price}</p>
            <div className='quantity-input'>
              <Button size='sm' variant="danger" onClick={() => {decrementQuantity()}}>-</Button>
              <input type="number" value={quantity} readOnly/>
              <Button size='sm' variant="success" onClick={() => {incrementQuantity()}}>+</Button>
            </div>
            <Button variant="warning" onClick={() => {props.addToBasket(productId, quantity)}}>
              Add to Basket
            </Button>
          </div>
          <p>{product.description}</p>
        </div>
      </div>
    );
  };
  
export default Product;