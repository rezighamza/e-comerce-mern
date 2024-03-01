import React from 'react'
import { Navigate } from 'react-router-dom'

function Logout() {
    async function logout() {
        await localStorage.removeItem('token')
    }
    logout()
    return <Navigate to="/login" />
}

export default Logout