import React from 'react'
import { Link } from 'react-router-dom'

const SidePost = () => {
  return (
    <div className='side-post1'>
              <div className='banner-2-text'>
                <span>Sept 4, 2024</span>
                <h1>Top Freelance Web Designers,
                  Developers, and Creatives...
                </h1>
              </div>

              <div>
                <div>
                  <img src="https://assets.awwwards.com/awards/images/2024/09/sotm-august-2024-thumbnail.jpg" alt="" />
                </div>

                <div className='banner-2-content'>
                  <span>by myBlog</span>
                  <p>Meet the nominees for site of the month August, vote and tweet
                    for your favorite
                  </p>
                </div>
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

export default SidePost