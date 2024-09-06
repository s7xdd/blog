import React from 'react'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'

const BlogPost = () => {
  return (
    <div className='allblog1'>
        <img className='' src="../public/office.jpg" alt="" />
        <div>
            <span className='d-flex pt-4 pb-1'>Alec Whitten • 1 Jan 2023</span>
            <h5>Bill Walsh leadership lessons</h5>
            <p>
                Like to know the secrets of transforming a 
                2-14 team into a 3x Super Bowl winning Dynasty?
            </p>
            <Link to={'/'}>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              Read Article
            </Link>
        </div>
    </div>
  )
}

export default BlogPost