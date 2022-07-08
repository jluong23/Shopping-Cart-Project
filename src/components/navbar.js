import React from 'react';
import {  Link } from "react-router-dom";

const Navbar= () =>{
  return (
  <nav>
      <div className='site-title'>
        <Link to="/">John Mayer Fan Shop</Link>
      </div>
        <ul>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/dailysong">Daily Song</Link></li>
        </ul>
  </nav>
  );
}

export default Navbar;