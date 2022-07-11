import React from 'react';
import Button from 'react-bootstrap/Button';
import QuantityInput from '../components/QuantityInput'
const ShopProduct = (props) =>{

  return (
    <div className='product'>
      <div className='product-image'>
        <img src= {props.product.img} alt={props.product.name + " Album Cover"}  />
      </div>
      <h2>{props.product.name}</h2>
      <div className='product-purchase'>
        <h3>
          {props.product.price}
        </h3>
        <QuantityInput />
        <Button size='sm' className='product-add-basket' variant="warning">Add to Basket</Button>
      </div>
    </div>
  )
}

export default ShopProduct;