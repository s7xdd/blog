import NavbarTop from './Navbar';

const Header = () => {

  return (
    <header>
        <NavbarTop/>

        {/* <Link to="/" className="logo">MyBlog</Link>
        <nav>
        {username && (
          <>
            <span className='user-header'>Hello {username}!</span>
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

        </nav> */}
      </header>
  )
}

export default Header