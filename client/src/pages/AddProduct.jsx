import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AddProduct() {
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: ''
    })
    const [image, setImage] = useState(null)
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
        axios.post('http://localhost:3300/product', formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => {
                console.log(response.data)
                navigate('/')
            })
            .catch(error => {
                if(error.response.status === 401) {
                    console.log('Unauthorized')
                    navigate('/')
                }
            })
    }
    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={product.name} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" value={product.price} onChange={handlePriceChange} />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" onChange={handleImageChange} />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct