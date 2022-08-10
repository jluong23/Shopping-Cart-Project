import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import './styling.css';
import DailySong from "./pages/DailySong";
import React, { useEffect, useState } from 'react';
import Footer from "./components/Footer";
import Product from "./pages/Product";
import ShoppingCart from "./pages/ShoppingCart";
import SpotifyAPIHelper from "./SpotifyAPIHelper";
const App = () => {
  
  const [navBarVisible, setNavBarVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(true);
  const [basket, setBasket] = useState([]);
  const [apiToken, setApiToken] = useState(null);
  const [artistId, setArtistId] = useState("0hEurMDQu99nJRq8pTxO14"); //artist id on spotify for John Mayer

  useEffect(() => {
    // create client credentials for api on start
    let request = SpotifyAPIHelper.createClientCredentialsToken();
    request.then(function(token){
      // once request has complete, set api token as state
      if(!apiToken){
        setApiToken(token);
      }
    });
  }, [])

  // function to hide or show header and footer
  const setHeaderAndFooter = (isVisible) => {
    setNavBarVisible(isVisible);
    setFooterVisible(isVisible);
  }

  const addToBasket = (productId, quantity) => {
    // check if product is in basket already (need to update the existing quantity)
    let productInBasket = false;
    let newBasket = basket.map((item) => {
      if(item["id"] == productId){
        productInBasket = true;
        return {"id": productId, "quantity": item["quantity"] + quantity};
      }else{
        return item;
      }
    });
    if(!productInBasket){
      newBasket = basket.concat({
          "id": productId, 
          "quantity": quantity
      });
    }
    setBasket(newBasket);
  }

  const removeFromBasket = (productId, quantity) => {
    let newProductQuantity;
    let productInBasket = false; 
    let newBasket = basket.map((item) => {
      if(item["id"] == productId){
        productInBasket = true;
        newProductQuantity = item["quantity"] - quantity;
        return {"id": productId, "quantity": newProductQuantity};
      }else{
        return item;
      }
    });
    if(newProductQuantity <= 0){
      newBasket = basket.filter((item) => item["id"] != productId);
    }
    setBasket(newBasket);
  }

  const getBasketCount = () => {
    let count = 0;
    basket.forEach(item => {
      count+=item["quantity"];
    });
    return count;
}

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    {navBarVisible ? <Navbar basket={basket} getBasketCount={getBasketCount}/> : null} 
    <div className="page-content">
      <Routes>
        <Route path="/" 
          element={<Home setHeaderAndFooter={setHeaderAndFooter}/>}/>
        <Route path="/shop" element={<Shop />} />
        <Route path="/dailysong" element={<DailySong apiToken={apiToken} artistId={artistId}/>} />
        <Route path="/product" element ={<Product addToBasket={addToBasket}/>} />
        <Route path="/cart" element ={<ShoppingCart basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket}/>}/>
      </Routes>
    </div>
    {footerVisible ? <Footer /> : null}
      

    </BrowserRouter>
  );
};

export default App;