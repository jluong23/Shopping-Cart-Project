// Shop.js

import React, { Component } from "react";
import ShopProduct from "../components/ShopProduct";

const Shop = () => {
    let product1 = {
      name: "Continuum (2006)",
      img: "https://i.discogs.com/21hXbZFAk5ld56hPfXw0J67DrcStwinJv9RgmNZWygY/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgwMzYz/NC0xMTg5NjM3NDEy/LmpwZWc.jpeg",
      description: "",
      price: "£19.99",
    }
    let product2 = {
      name: "Born and Raised (2012)",
      img: "https://i.discogs.com/4chD0W1QnmckCewH8TECkpg-4oqjnOgnJzuYNdCXPCU/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM2NjUy/NjgtMTMzOTQ2ODg1/MS0zNDEwLmpwZWc.jpeg",
      description: "Born and Raised is the fifth studio album by American singer-songwriter John Mayer, released on May 22, 2012, by Columbia Records. It marked yet another change in Mayer's musical style, incorporating elements of folk and Americana, as well as influences from Bob Dylan, Neil Young, David Crosby, Stephen Stills, and Graham Nash. Its cover, as well as that of the single \"Queen of California\", was designed by David Adrian Smith.",
      price: "£19.99",

    }
    let product3 = {
      name: "The Search For Everything (2017)",
      img: "https://i.discogs.com/MZOWcdsJNAcW9ziIvWwT-Muo9hPxaaHmtvLKiwyw4bk/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTMy/OTgyLTE2MDE4MDc4/NjUtODg5MS5qcGVn.jpeg",
      description: "",
      price: "£19.99",

    }
    return (
      <div>
        <h1 className="page-title">Shop</h1>
        <ul className="shop-products">
          <li>
            <ShopProduct product = {product1}/>
          </li>
          <li>
            <ShopProduct product = {product2}/>
          </li>
          <li>
            <ShopProduct product = {product3}/>
          </li>
        </ul>
      </div>
    );
  };
  
export default Shop;