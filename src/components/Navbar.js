import React from 'react';
import {  Link } from "react-router-dom";
import {BsFillBasket2Fill} from "react-icons/bs";
const Navbar= () =>{
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
            <span>1</span>
          </Link>
        </li>

      </ul>
  </nav>
  );
}

export default Navbar;