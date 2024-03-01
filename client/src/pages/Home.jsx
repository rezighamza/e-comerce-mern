import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3300/product')
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  }, [])
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {products.map(product => (
          <li key={product.id} onClick={() => handleClick(product._id)}> 
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home