import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Editor from '../components/Editor'
import {UserContext} from '../UserContext'


const CreatePost = (ev) => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {userInfo} = useContext(UserContext)

    async function createNewPost(ev){
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files[0])

        ev.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_URL}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include',
        })

        if(response.ok){
            alert('Post created successfully')
            setRedirect(true)
        } else{
                alert('File is required')
        }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  if(userInfo.id == null){
    return <Navigate to={'/login'}/>
  }

  return (
    <form onSubmit={createNewPost}>
        <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
        <input type="text" placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} />
        <input 
            type="file" 
            onChange={e => setFiles(e.target.files)}
        />
        <Editor onChange={setContent} value={content}/>
        <button style={{marginTop:'15px'}}>Create Post</button>
    </form>
  )
}

export default CreatePost