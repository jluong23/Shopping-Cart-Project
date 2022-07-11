import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const QuantityInput = (props) => {
    
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decrementQuantity = () => {
    if(quantity > 1) setQuantity(quantity - 1);

  }
  return(
      <div className='quantity-input'>
      <Button size='sm' variant="danger" onClick={() => {decrementQuantity()}}>-</Button>
      <input type="number" value={quantity} readOnly/>
      <Button size='sm' variant="success" onClick={() => {incrementQuantity()}}>+</Button>
    </div>
  )
}

export default QuantityInput;