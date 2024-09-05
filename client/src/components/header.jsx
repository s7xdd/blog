import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);
  const [redirect, setRedirect] = useState(false)
  
  useEffect(() => {
    fetch(`/profile`, {
      credentials: 'include'
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  const logout = () => {
    fetch('/logout', {
      credentials: 'include',
      method: 'POST'
    }).then((response) => {
      setUserInfo(null)
      setRedirect(true)
      alert('Logged out')
    })
  }

  if(redirect){
    return (
    <>
      <Navigate to={'/'} />
    </>
    )
  }

  const username = userInfo?.username;

  return (
    <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
        {username && (
          <>
            <Link to='/create'>Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}

        {!username && (
          <>
            <Link to ='/login'>Login</Link>
            <Link to ="/register">Register</Link>
          </>
            
        )}

        </nav>
      </header>
  )
}

export default Header