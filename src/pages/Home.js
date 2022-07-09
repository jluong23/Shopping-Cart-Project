// Home.js

import React, { Component, useEffect } from "react";
import homeImageFile from "../assets/john.jpg"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";



const Home = (props) => {
  useEffect( () => {
    // hide nav bar on load
    props.setNavBarHidden(true);
  });
  
  return (
    <div className="home">
      <img className="home-image" src={homeImageFile} alt="img" />
      <div className="home-description">
        <h1>
          The man, the myth, the legend
        </h1>
      </div>
      <div className="home-options">
        <Link to ="/shop">
          <Button size="lg" variant="warning" onClick={() => {props.setNavBarHidden(false)}}>Go to shop</Button>
        </Link>
        <Link to ="/dailysong">
          <Button size="lg" variant="success" onClick={() => {props.setNavBarHidden(false)}}>Daily Song</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;