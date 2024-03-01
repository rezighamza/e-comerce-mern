import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider,Navigate } from 'react-router-dom'
import {
    Home,
    Product,
    Register,
    Login,
    Logout,
    AddProduct,
    UpdateProduct,
    DeleteProduct
} from './pages/index.js'
import HomeLayout from './layout/HomeLayout.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'


function App() {
    const token = localStorage.getItem('token')


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<HomeLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                {token ? (
                    <>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Navigate to="/" />} />
                    <Route path="/login" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Navigate to="/" />} />
                    </>
                )}
                <Route path="addProduct" element={<AddProduct/>} />
                <Route path="updateProduct/:id" element={<UpdateProduct/>} />
                <Route path="deleteProduct/:id" element={<DeleteProduct/>} />
            </Route>
        ))
    return (
        <RouterProvider router={router} />
    )
}

export default App