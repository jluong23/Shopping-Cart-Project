// Shop.js

import React, { Component } from "react";
import ShopProduct from "../components/ShopProduct";
import productData from "../products.json";
const Shop = () => {

    return (
      <div id="shop">
        <h1>Shop</h1>
        <ul id="shop-products">
          {productData.map((p) => {
            return (
              <li key={p.id}>
                <ShopProduct product={p}/>
              </li>
            )})
          }
        </ul>
      </div>
    );
  };
  
export default Shop;