import '../styles/Login.css'
import React, { useState } from 'react'
import axios from 'axios'


const Register = () => {
    const [username, setUsername] = useState('')
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
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Register</div>
      </div>
      <br />
      <form className='login' onSubmit={register}>
        <div className='inputContainer'>
          <input
            type="text" 
            placeholder='username' 
            onChange={e => setUsername(e.target.value)}
            className='inputBox'
          />
        </div>
        <br />
        <div className='inputContainer'>
          <input
            type="text" 
            placeholder='password' 
            onChange={e => setPassword(e.target.value)}
            className='inputBox'
          />
        </div>
        <br />
        <div className='inputContainer'>
          <input className='inputButton' type="submit" value={'Log in'} />
        </div>
      </form>
    </div>
  )
 }


export default Register