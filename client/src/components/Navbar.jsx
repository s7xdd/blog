import "../styles/Navbar.css";
import { Link, Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

const NavbarTop = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [searchRedirect, setSearchRedirect] = useState(false)
  const [searchArticle, setSearchArticle] = useState("");

  useEffect(() => {
    fetch(`/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const search = (e) => {
    e.preventDefault();
    setSearchRedirect(true);
  }

    const logout = () => {
      fetch("/logout", {
        credentials: "include",
        method: "POST",
      }).then((response) => {
        setUserInfo(null);
        setRedirect(true);
        alert("Logged out");
      });
    };



  if (redirect) {
    window.location.reload();
  }

  if(searchRedirect){
    return(
      <Navigate to={`/post/search/${searchArticle}`}/>
    )
  }

  const username = userInfo?.username;

  return (
    <div className="navbar-header">
      <Navbar expand="lg">
        <div className="navbar-elements">
          <Navbar.Brand>MyBlog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/blogs">Blogs</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="/about">
                  About this site
                </NavDropdown.Item>
                <NavDropdown.Item href="/luckyme">Lucky me</NavDropdown.Item>
                <NavDropdown.Item href="/aboutme">About me</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/contact">Contact me</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={search}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearchArticle(e.target.value)}
              />
            </Form>
            <div className="navbar-userdetails">
              {username && (
                <>
                  <span className="user-header">Hello {username}!</span>
                  <Link to="/create">Create New Post</Link>
                  <a onClick={logout}>Logout</a>
                </>
              )}

              {!username && (
                <div className="navbar-btn">
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarTop;
