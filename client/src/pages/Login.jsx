import React , { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      email: email,
      password: password
    }
    axios.post('http://localhost:3300/api/login', data)
      .then(response => {
        console.log(response.data)
        localStorage.setItem('token', response.data.token)
        navigate('/')
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => {handleSubmit(e)}}>  
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login