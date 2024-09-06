import React from 'react'
import BlogPost from './BlogPost'
import { useState, useEffect } from 'react'

const AllBlogPost = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/home/post`).then((response) => {
      response.json().then(posts => {
        setPosts(posts)
      })
    })
  }, [])

  return (
    <div className='allblog'>
        <div className='allbloginner'>
            <h5 className='title'>Latest News</h5>
            <div className='blog'>
                {posts.length > 0 && posts.map((post) => (
                  <BlogPost {...post}/>
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default AllBlogPost