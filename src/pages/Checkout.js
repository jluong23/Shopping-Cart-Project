// Checkout.js

import React, { Component } from "react";
import productData from "../products.json";
import QuantityInput from "../components/QuantityInput";


const Checkout = (props) => {
    let basket = props.basket;
    return (
        <div id="checkout">
            <h1>Checkout</h1>
            <div id="checkout-products">
                {basket.map((p) => {
                    let product = productData.find(product => product.id == p["id"]);
                    return (
                        <div key={product["id"]} className="checkout-product">
                            <div className="checkout-product-image">
                                <img src= {product.img} alt={product.name + " Album Cover"} />
                            </div>
                            <div className="checkout-product-purchase">
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <QuantityInput startQuantity={p["quantity"]}/>
                            </div>
                            
                        
                        </div>
                    );
                })}

            </div>

        </div>
    );
  };
  
export default Checkout;