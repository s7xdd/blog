import "../styles/Navbar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

const NavbarTop = () => {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [searchRedirect, setSearchRedirect] = useState(false)
  const [searchArticle, setSearchArticle] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const search = (e) => {
    setSearchRedirect(true);
  }

    const logout = () => {
      fetch(`${import.meta.env.VITE_URL}/logout`, {credentials: "include",
        method: "POST",
      }).then((response) => {
        setUserInfo(null);
        alert("Logged out");
        setRedirect(true);
      });
    };



  if (redirect) {
    window.location.reload();
  }

  if(searchRedirect){
    navigate(`/post/search/${searchArticle}`)
    setSearchRedirect(false)
  }

  const username = userInfo?.username;

  return (
    <div className="navbar-header">
      <Navbar expand="lg">
        <div className="navbar-elements">
          <Navbar.Brand className="fw-bolder">MyBlog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center flex gap-3">
              <Link to="/">Home</Link>
              <Link to="/blogs">Blogs</Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="/about">
                  About this site
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/contact">Find me!</NavDropdown.Item>
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
