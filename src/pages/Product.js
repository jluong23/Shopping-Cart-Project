// Product.js
import {Link, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import productData from "../products.json";
import Button from 'react-bootstrap/Button';
import QuantityInput from "../components/QuantityInput";
import Tracklist from "../components/Tracklist";
const Product = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [quantity, setQuantity] = useState(1);

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
      <div className="product-content">
        <div className="product">
          <div className='product-image'>
            <img src= {product.img} alt={product.name + " Album Cover"}  />
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="product-purchase">
              <p>{product.price}</p>
              <QuantityInput setQuantity={setQuantity}/>
              <Button variant="warning" onClick={() => {props.addToBasket(productId, quantity)}}>
                Add to Basket
              </Button>
            </div>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="product-extra">
          <div className="product-extra-options">
            <Button variant="success">Tracklist</Button>
          </div>
          <div className="product-extra-content">
            {<Tracklist id={productId}/>}

          </div>
        </div>
      </div>
    );
  };
  
export default Product;