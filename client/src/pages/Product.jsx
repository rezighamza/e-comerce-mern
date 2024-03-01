import { useParams } from "react-router-dom"
import axios from "axios"
import React, { useState, useEffect } from "react"

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:3300/product/${id}`)
      .then(response => {
        setProduct(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  }, [id])
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
    
  )
}

export default Product