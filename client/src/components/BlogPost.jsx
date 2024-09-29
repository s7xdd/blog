import React from 'react'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import { format } from 'date-fns'
import '../styles/BlogPost.css'

const BlogPost = ({_id, key, title, content, summary, cover, createdAt, author}) => {
  return (
    <div className='allblog1'>
         <img src={`${import.meta.env.VITE_URL}/`+cover} width={500} height={320} alt="" />
        <div style={{maxWidth: '500px'}}>
            <span className='d-flex pt-4 pb-1'>{author.username} • {format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</span>
            <a href={`/post/${_id}`}>
            <h2>{title}</h2>
            </a>
            <p>
              
            {summary}
            </p>
            <Link to={`/post/${_id}`}>
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