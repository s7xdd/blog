import React from 'react'
import {format} from 'date-fns'
import { Link } from 'react-router-dom' 

const Highlight = ({_id, key, title, content, summary, cover, createdAt, author}) => {
  return (
    <div className="highlight ">
    
          <div className='highlight-text'>
            <h1 className='pb-3'>Hot Take</h1>
            <span>Sep 5, 2024</span>
            <h1>it's the final countdown!- conference valencia</h1>
            <span>by myBlog</span>
            <p>
              There is only one week left for our conference in Valencia, 
              and we are already finalizing the details so that all attendees 
              can enjoy an unforgettable experience. If...
            </p>
            <Link to={'/'}>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              Read Article
            </Link>
          </div>

          <div className='hightlight-image'>
            <img className='high-img' src="https://assets.awwwards.com/awards/images/2024/09/post-confe-thumb.jpg" alt="" />
          </div>

          {/* <Post _id={'123'} key={'123'} title={'Highlight'} content={'Hello'} summary={'Summary'} cover={"http://localhost:4000/uploads\e893d044a305b074d5fed2472aa50141.jpg"} createdAt={'1 February 2020'} author={{"username": "John"}}/> */}
        </div>
      
  )
}

export default Highlight