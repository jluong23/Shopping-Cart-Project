import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import './styling.css';
import DailySong from "./pages/DailySong";
import React, { useEffect, useState } from 'react';
import Footer from "./components/Footer";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

const App = () => {
  const [navBarVisible, setNavBarVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(true);
  const [basket, setBasket] = useState([]);

  // function to hide or show header and footer
  const setHeaderAndFooter = (isVisible) => {
    setNavBarVisible(isVisible);
    setFooterVisible(isVisible);
  }

  const addToBasket = (productId, quantity) => {
    // check if product is in basket already (need to update the quantity)
    let increasedQuantity = false;
    let newBasket = basket.map((item) => {
      if(item["id"] == productId){
        increasedQuantity = true;
        return {"id": productId, "quantity": item["quantity"] + quantity};
      }
    });
    if(!increasedQuantity){
      newBasket = basket.concat({
          "id": productId, 
          "quantity": quantity
      });
    }
    setBasket(newBasket);
  }

  const removeFromBasket = (productId) => {
    const newBasket = basket.filter((item) => item["id"] == productId);
    setBasket(newBasket)
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    {navBarVisible ? <Navbar basket={basket}/> : null} 
    <div className="page-content">
      <Routes>
        <Route path="/" 
          element={<Home setHeaderAndFooter={setHeaderAndFooter}/>}/>
        <Route path="/shop" element={<Shop />} />
        <Route path="/dailysong" element={<DailySong />} />
        <Route path="/product" element ={<Product addToBasket={addToBasket}/>} />
        <Route path="/checkout" element ={<Checkout basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket}/>}/>
      </Routes>
    </div>
    {footerVisible ? <Footer /> : null}
      

    </BrowserRouter>
  );
};

export default App;