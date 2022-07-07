// Shop.js

import React, { Component } from "react";
import ShopProduct from "../components/ShopProduct";

const Shop = () => {
    let product1 = {
      name: "Born and Raised",
      img: "https://i.discogs.com/4chD0W1QnmckCewH8TECkpg-4oqjnOgnJzuYNdCXPCU/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM2NjUy/NjgtMTMzOTQ2ODg1/MS0zNDEwLmpwZWc.jpeg",
      description: "Born and Raised is the fifth studio album by American singer-songwriter John Mayer, released on May 22, 2012, by Columbia Records. It marked yet another change in Mayer's musical style, incorporating elements of folk and Americana, as well as influences from Bob Dylan, Neil Young, David Crosby, Stephen Stills, and Graham Nash. Its cover, as well as that of the single \"Queen of California\", was designed by David Adrian Smith.",
    }
    return (
      <div>
        <h1>Shop</h1>
        <ul className="shop-items">
          <li>
            <ShopProduct product = {product1}/>
          </li>
        </ul>
      </div>
    );
  };
  
export default Shop;