import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function UpdateProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3300/product/${id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(response => {
                setProduct(response.data)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.log('Unauthorized')
                    navigate('/')
                }
                console.error('There was an error!', error)
            })
    }, [id])

    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const handleNameChange = (e) => {
        setProduct({
            ...product,
            name: e.target.value,
        })
    }
    const handlePriceChange = (e) => {
        setProduct({
            ...product,
            price: e.target.value,
        })
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('name', product.name)
        formData.append('price', product.price)
        formData.append('image', image)
        //send cookie from local storage
        axios.put(`http://localhost:3300/product/${id}`, formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => {
                console.log(response.data)
                navigate('/')
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.log('Unauthorized')
                    navigate('/')
                }
            })
    }
    return (
        <div>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={product.name} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" value={product.price} onChange={handlePriceChange} />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" onChange={handleImageChange} />
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>


    )
}

export default UpdateProduct