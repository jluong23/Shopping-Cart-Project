import React from 'react';
import Button from 'react-bootstrap/Button';

const ShopProduct = (props) =>{
  return (
    <div className='product'>
      <div className='product-image'>
        <img src= {props.product.img}/>
      </div>
      <h2>{props.product.name}</h2>
      <div className='product-purchase'>
        <Button variant="danger">-</Button>
        <input type="number" defaultValue="0" readOnly/>
        <Button variant="success">+</Button>
        <Button className='product-add-basket' variant="warning">Add to Basket</Button>
      </div>
      </div>
  )
}

export default ShopProduct;