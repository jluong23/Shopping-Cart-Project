import React, { useEffect } from 'react';
import {  Link } from "react-router-dom";
import {BsFillBasket2Fill} from "react-icons/bs";
const Navbar= (props) =>{
  let basket = props.basket;
  const getBasketItems = () => {
    let count = 0;
    basket.forEach(item => {
      count+=item["quantity"];
    });
    return count;
}

  return (
  <nav>
      <div className='site-title'>
        <Link to="/">John Mayer Fan Shop</Link>
      </div>
      <ul>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/dailysong">Daily Song</Link></li>
        <li>
          <Link to ="/checkout">
            <BsFillBasket2Fill/>
            <span className='checkout-basket'>{getBasketItems()}</span>
          </Link>
        </li>

      </ul>
  </nav>
  );
}

export default Navbar;