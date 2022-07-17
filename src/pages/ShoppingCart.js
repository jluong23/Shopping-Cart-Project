// ShoppingCart.js

import React, { Component } from "react";
import productData from "../products.json";
import QuantityInput from "../components/QuantityInput";
import { Link } from "react-router-dom";


const ShoppingCart = (props) => {
    let basket = props.basket;
    let products, costs, subtotal, summary;
    if(basket.length > 0){
        // content if shopping cart contains items
        costs = basket.map(({id, quantity}) => {
            let product = productData.find(product => product.id == id);
            return product.price * quantity;
        });
        subtotal = costs.reduce((a,b) => a + b);
        summary = (
            <div id="shopping-cart-summary">
                <p>Subtotal: £{subtotal}</p>
            </div>
        )

        products = (
            <div>
                <div id="shopping-cart-products">
                    {basket.map(({id, quantity}) => {
                        let product = productData.find(product => product.id == id);
                        return (
                            <div key={product["id"]} className="shopping-cart-product">
                                <div className="shopping-cart-product-image">
                                    <img src= {product.img} alt={product.name + " Album Cover"} />
                                </div>
                                <div className="shopping-cart-product-info">
                                    <p>{product.name}</p>
                                    <p>£{product.price}</p>
                                    <p>Total: £{product.price*quantity}</p>
                                    <QuantityInput startQuantity={quantity}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {summary}
            </div>
        )
    }

    const error = (
        <div id="shopping-cart-empty">
            <p>There are no items in your shopping cart.</p>
            <Link to="/shop">Continue Shopping</Link>
        </div>
    )
    return (
        <div id="shopping-cart">
            <h1>Shopping Cart</h1>
            {basket.length > 0 ? products : error}
        </div>
    );
  };
  
export default ShoppingCart;