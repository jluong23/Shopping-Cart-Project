// Shop.js

import React, { Component } from "react";
import ShopProduct from "../components/ShopProduct";
import productData from "../products.json";
const Shop = () => {

    return (
      <div>
        <h1 className="page-title">Shop</h1>
        <ul className="shop-products">
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