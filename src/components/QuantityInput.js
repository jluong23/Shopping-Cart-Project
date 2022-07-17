import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const QuantityInput = (props) => {
  /*
    props.startQuantity: starting integer value of quantity input 
    props.productId: the id of the product which uses the input
    props.minValue: Minimum value of the quantity input
    
    Either sets a quantity state in props without updating basket or updates basket depending on the props functions passed. 
    Prioritise the quantity state update if both functions are passed by props.

    option 1) Update quantity state
    props.setQuantity: setter for quantity state in props. (Used in product page)

    option 2) Modify basket, both are passed
    props.addToBasket: 
    props.removeFromBasket: 
  */

  let startQuantity;
  let productId = props.productId;
  props.startQuantity == null ? startQuantity = 1 : startQuantity = props.startQuantity;
  const [quantity, setQuantity] = useState(parseInt(startQuantity));
  
  const incrementQuantity = () => {
    let newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if(props.setQuantity){
      props.setQuantity(newQuantity);
    }else if(props.addToBasket){
      props.addToBasket(productId, 1);
    }
  }

  const decrementQuantity = () => {
    let newQuantity = quantity - 1;
    if(newQuantity >= props.minValue){
      setQuantity(newQuantity);
      if(props.setQuantity){
          props.setQuantity(newQuantity);
      }else if(props.removeFromBasket){
        props.removeFromBasket(productId, 1);
      }
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