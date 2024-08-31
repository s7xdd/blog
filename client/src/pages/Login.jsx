import React, { useState } from 'react'
import axios from 'axios'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function login(e){
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }

        axios.post('http://localhost:4000/login', data).then((response) => {
          alert('Login successful')
        }).catch((err) => {
          alert('Login failed')
        })
    }   
  return (
    <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input 
            type="text" 
            placeholder='username' 
            onChange={e => setUsername(e.target.value)}
        />
        <input 
            type="text" 
            placeholder='password' 
            onChange={e => setPassword(e.target.value)}    
        />
        <button type='submit'>Login</button>
    </form>
  )
 }


export default Login