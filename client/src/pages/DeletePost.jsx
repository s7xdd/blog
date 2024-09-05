import React, { useContext, useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext';

const DeletePost = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {userInfo} = useContext(UserContext)
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/post/`+id).then((response) => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
            })
        })
    },[])

    const deletePost = async () => {
        const response = await fetch(`${import.meta.env.VITE_URL}/post/`+id, {
            method: 'DELETE',
            credentials: 'include',
        })

        if(response.ok){
            alert('Post deleted successfully')
            setRedirect(true)
        } else{
                alert('Error deleting post')
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    if(userInfo.id == null){
        return <Navigate to={'/login'}/>
      }

  return (
    <div className='confirm-page'>
        <h2>Are you sure you want to delete this post?</h2>
        <span>Title : {title}</span>
        <div className='confirm-btn'>
            <button className='yes-btn' onClick={deletePost}>Yes</button>
            <Link className='no-btn' to={`/post/${id}`}>No</Link>
        </div>
    </div>
  )
}

export default DeletePost