import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const QuantityInput = (props) => {
  let startQuantity;
  props.startQuantity == null ? startQuantity = 1 : startQuantity = props.startQuantity;
  const [quantity, setQuantity] = useState(parseInt(startQuantity));
  
  const incrementQuantity = () => {
    let newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if(props.setQuantity){
        props.setQuantity(newQuantity);
    }
  }

  const decrementQuantity = () => {
    let newQuantity = quantity - 1;
    if(quantity > 1) setQuantity(newQuantity);
    if(props.setQuantity){
        props.setQuantity(newQuantity);
    }
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