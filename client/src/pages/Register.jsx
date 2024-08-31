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

        axios.post('http://localhost:4000/register', data).then((response) => {
            if(response.status == 200){
                alert('Registration successful')
            } 
            else{
                alert('Registration Failed')
            }
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