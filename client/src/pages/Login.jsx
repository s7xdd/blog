import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext);

    async function login(e){
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }

        const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
          method: 'POST',
          body: JSON.stringify({username,password}),
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        })
        
        if(response.ok){
          response.json().then(userInfo => {
            alert('Login Successful')
            setUserInfo(userInfo);
            setRedirect(true)
          })
        }
    }

    if(redirect){
      return (
      <>
        <Navigate to={'/'} />
      </>
      )
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