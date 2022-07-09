import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const ShopProduct = (props) =>{

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decrementQuantity = () => {
    if(quantity > 1) setQuantity(quantity - 1);
  }
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
        <div className='quantity-input'>
          <Button size='sm' variant="danger" onClick={() => {decrementQuantity()}}>-</Button>
          <input type="number" value={quantity} readOnly/>
          <Button size='sm' variant="success" onClick={() => {incrementQuantity()}}>+</Button>
        </div>
        <Button size='sm' className='product-add-basket' variant="warning">Add to Basket</Button>
      </div>
    </div>
  )
}

export default ShopProduct;