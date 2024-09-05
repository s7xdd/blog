import './App.css'
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
            <Route path='/post/:id' element={<PostPage/>}/>
            <Route path='/edit/:id' element={<EditPost/>}/>
            <Route path='/delete/:id' element={<DeletePost/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
    
    
  )
}

export default App
