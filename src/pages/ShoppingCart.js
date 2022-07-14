// ShoppingCart.js

import React, { Component } from "react";
import productData from "../products.json";
import QuantityInput from "../components/QuantityInput";


const ShoppingCart = (props) => {
    let basket = props.basket;
    return (
        <div id="shopping-cart">
            <h1>Shopping Cart</h1>
            <div id="shopping-cart-products">
                {basket.map((p) => {
                    let product = productData.find(product => product.id == p["id"]);
                    return (
                        <div key={product["id"]} className="shopping-cart-product">
                            <div className="shopping-cart-product-image">
                                <img src= {product.img} alt={product.name + " Album Cover"} />
                            </div>
                            <div className="shopping-cart-product-purchase">
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
  
export default ShoppingCart;