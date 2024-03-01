import axios from 'axios'
import React, { useState, useEffect } from 'react'


function ProductCard({ product }) {
    const [image, setImage] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3300/product/image/${product._id}`)
            .then(response => {
            setImage(response.data)
            })
            .catch(error => {
            console.error('There was an error!', error)
            })
        }, [])
    


  return (
    <div className="product-card">
      <div className="product-card__image">
      </div>
      <div className="product-card__content">
        <h2>{product.name}</h2>
        <p>{product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard