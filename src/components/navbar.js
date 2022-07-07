import React from 'react';
import {  Link } from "react-router-dom";

const Navbar= () =>{
  return (
  <nav>
      <Link to="/" className='site-title'>Home</Link>
      <ul>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/songofday">Daily Song</Link></li>
          
      </ul>
  </nav>
  );
}

export default Navbar;