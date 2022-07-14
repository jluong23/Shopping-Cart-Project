import React, { useState } from 'react';
import Tracklist from "../components/Tracklist";
import Button from 'react-bootstrap/Button';
const ProductExtra = (props) =>{
  //extra container for product information

  //pass id of product by props.id
  let id = props.id;
  
  const [contentVisible, setContentVisible] = useState(false);

  const toggleContent = () => {
    setContentVisible(!contentVisible);
  }
  return (
    <div className="product-extra">
        <div className="product-extra-options">
            <Button variant="success" onClick={() => toggleContent()}>Tracklist</Button>
        </div>
        <div className="product-extra-content">
            {contentVisible ? <Tracklist id={id}/> : null}
        </div>
    </div>
  );
}

export default ProductExtra;