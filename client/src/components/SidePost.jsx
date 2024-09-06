import React from 'react'
import { Link } from 'react-router-dom'

const SidePost = ({title, date, img, summary}) => {

  return (
    <div className='side-post1'>
            
              <div className='banner-2-text'>
                <span>{date}</span>
                <h1>{title}</h1>
              </div>

              <div>
                <div>
                  <img src={img} alt="" />
                </div>

                <div className='banner-2-content'>
                  <span>by myBlog</span>
                  <p>Meet the nominees for site of the month August, vote and tweet
                    for your favorite
                  </p>
                </div>
              </div>
            </div>
  )
}

export default SidePost