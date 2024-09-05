import { format } from 'date-fns';
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import {UserContext} from '../UserContext'
import { Link } from 'react-router-dom';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    const {userInfo} = useContext(UserContext)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/post/${id}`).then((response) => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    }, [])
  

    if(!postInfo) return ''

  return (
    <div className='post-page'>
        <h1>{postInfo.title}</h1>
        <div className='author-date'>{postInfo.author.username} | {format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</div>
        {userInfo.id === postInfo.author._id && (
            <div className="edit-post">
                <Link 
                    to={`/edit/${postInfo._id}`}
                    className='edit-btn'
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    Edit post
                    </Link>
            </div>
            
        )}
        <div className="image">
            <img src={`${import.meta.env.VITE_URL}/${postInfo.cover}`} alt="" />  
        </div>
        <div className="post-content">
            <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
        
    </div>
  )
}

export default PostPage