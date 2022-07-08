import React from 'react';

const ShopProduct = (props) =>{
  return (
    <div className='product'>
      <div className='product-image'>
        <img src= {props.product.img}/>
      </div>
      <h2>{props.product.name}</h2>
      <div className='product-purchase'>
        <button>-</button>
        <input type="number" defaultValue="0"/>
        <button>+</button>
        <button className='product-add-basket'>Add to Basket</button>
      </div>
      </div>
  )
}

export default ShopProduct;