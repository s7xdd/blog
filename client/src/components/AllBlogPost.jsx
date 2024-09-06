import React from 'react'
import BlogPost from './BlogPost'

const AllBlogPost = () => {
  return (
    <div className='allblog'>
        <div className='allbloginner'>
            <h5 className='title'>Latest News</h5>
            <div className='blog'>
                <BlogPost/>
                <BlogPost/>
                <BlogPost/>
                <BlogPost/>
                <BlogPost/>
                <BlogPost/>
            </div>
        </div>
    </div>
  )
}

export default AllBlogPost