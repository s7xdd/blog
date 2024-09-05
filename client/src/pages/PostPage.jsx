import { format } from 'date-fns';
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import {UserContext} from '../UserContext'

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    const {userInfo} = useContext(UserContext)
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then((response) => {
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
                <a 
                    className='edit-btn'
                    href={`/edit/${postInfo._id}`}>Edit post</a>
            </div>
            
        )}
        <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />  
        </div>
        <div className="post-content">
            <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
        
    </div>
  )
}

export default PostPage