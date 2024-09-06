import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/locomotive-scroll.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './Layout'
import Register from './pages/Register'
import { UserContextProvider } from './UserContext'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
import DeletePost from './pages/DeletePost'
import Aboutme from './pages/Aboutme'
import AllPosts from './pages/AllPosts'
import About from './pages/About'
import LuckyMe from './pages/LuckyMe'
import Contact from './pages/Contact'
import SearchArticle from './pages/SearchArticle'

function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/create' element={<CreatePost/>}/>
            <Route path='/aboutme' element={<Aboutme/>}/>
            <Route path='/blogs' element={<AllPosts/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/luckyme' element={<LuckyMe/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/post/:id' element={<PostPage/>}/>
            <Route path='/post/search/:title' element={<SearchArticle/>}/>
            <Route path='/edit/:id' element={<EditPost/>}/>
            <Route path='/delete/:id' element={<DeletePost/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
    
    
  )
}

export default App
