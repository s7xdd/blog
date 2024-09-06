import '../styles/Login.css'
import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Login = (props) => {
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
          setRedirect(true)
          setUserInfo(userInfo);
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
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Login</div>
      </div>
      <br />
      <form className='login' onSubmit={login}>
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

export default Login








