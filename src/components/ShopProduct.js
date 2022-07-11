import React from 'react';
const ShopProduct = (props) =>{

  return (
    <div className='product'>
      <div className='product-image'>
        <img src= {props.product.img} alt={props.product.name + " Album Cover"}  />
      </div>
      <strong>{props.product.name}</strong>
      <p>
        {props.product.price}
      </p>
    </div>
  )
}

export default ShopProduct;