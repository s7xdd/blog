import React, { useState } from 'react'
import axios from 'axios'


const Register = () => {
    const [username, setUsername] = useState('hello')
    const [password, setPassword] = useState('')

    async function register(e){
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }

        axios.post(`${import.meta.env.VITE_URL}/register`, data).then((response) => {
            alert('Registration success')
        }).catch((err) => {
            alert('User already exists')
        })
    }
  return (
    <form className='register' onSubmit={register}>
        <h1>Register</h1>
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
        <button type='submit'>Register</button>
    </form>
  )
 }


export default Register