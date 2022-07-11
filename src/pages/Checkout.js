// Checkout.js

import React, { Component } from "react";
import productData from "../products.json";

const Checkout = (props) => {
    let basket = props.basket;
    return (
        <div>
            <h1>Checkout</h1>
            {basket.map((product) => {
                return (
                    <ul key={product["id"]}>Product Id {product["id"]}: Quantity: {product["quantity"]}</ul>
                );
            })}
        </div>
    );
  };
  
export default Checkout;