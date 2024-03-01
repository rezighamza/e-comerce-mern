import { useParams } from "react-router-dom"
import axios from "axios"
import React, { useState, useEffect } from "react"

function DeleteProduct() {
    const { id } = useParams()
    useEffect(() => {
        axios.delete(`http://localhost:3300/product/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => {
                setTimeout(() => {
                    window.location.href = '/'
                }, 5000)    
            })
            .catch(error => { 
                if(error.response.status === 401) {
                    console.log('Unauthorized')
                    window.location.href = '/'
                }
                console.error('There was an error!', error)
            })
    }
        , [id])

    return (
        <div>
            <h1>Delete Product</h1>
            <p>Product deleted</p>
        </div>
    )
}

export default DeleteProduct