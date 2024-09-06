import '../styles/Homepage.css'
import { useEffect, useState } from 'react'
import Highlight from '../components/Highlight'
import SidePost from '../components/SidePost'
import RecentPosts from '../components/RecentPosts'
import AllBlogPost from '../components/AllBlogPost'


const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/post`).then((response) => {
      response.json().then(posts => {
        setPosts(posts)
      })
    })
  }, [])

  return (
    <div className='homepage'>
        <div className='start-title'>
          <Highlight/>
        </div>
        
        <AllBlogPost/>
        
        <div className='banner-2-main'>
          <div className='banner-2-title'>
            <h1 className='category'>Technology</h1>
          </div>
          <div className='banner-2'>
            <SidePost/>
            <SidePost/>
          </div>
          
        </div>

        <div className='footer'>Copyright 2024 MyBlog Portal</div>

        {/* {posts.length > 0 && posts.map((post) => (
          <Post {...post} />
        ))} */}
    </div>
  )
}

export default Home