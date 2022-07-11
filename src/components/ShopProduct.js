import React from 'react';
import { Link } from "react-router-dom";


const ShopProduct = (props) =>{

  const product = props.product;
  const productLink = "/product/" + product.id;
  return (
      <div className='product'>
        <Link to={productLink}>
          <div className='product-image'>
            <img src= {product.img} alt={product.name + " Album Cover"}  />
          </div>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={productLink}>
          <strong>{product.name}</strong>
        </Link>
        <p>
          {product.price}
        </p>
      </div>
  )
}

export default ShopProduct;