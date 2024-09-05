import '../styles/Navbar.css'
import { Link, Navigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';



const NavbarTop = () => {
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
        window.location.reload();
      }
      
      const username = userInfo?.username;
      

  return (
    <div className='navbar-header'>
        <Navbar expand="lg" >
            <div className='navbar-elements'>
                <Navbar.Brand>MyBlog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                </Form>
                <div className='navbar-userdetails'>
                    {username && (
                    <>
                        <span className='user-header'>Hello {username}!</span>
                        <Link to='/create'>Create New Post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                    )}

                    {!username && (
                    <div className='navbar-btn'>
                        <Link to ='/login'>Login</Link>
                        <Link to ="/register">Register</Link>
                    </div>
                        
                    )}                    
                </div>

                </Navbar.Collapse>
            </div>
            </Navbar>              
    </div>
  )
}

export default NavbarTop