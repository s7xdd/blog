import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../components/Editor'

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {id} = useParams();
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/post/`+id).then((response) => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        })
    },[])

    async function updatePost(ev){
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('id', id)
        
        if(files?.[0]) {
            data.set('file', files?.[0])
        }

        ev.preventDefault();

        const response = await fetch('/post', {
            method: 'PUT',
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
    return <Navigate to={'/post/'+id}/>
  }

  return (
    <form onSubmit={updatePost}>
        <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
        <input type="text" placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} />
        <input 
            type="file" 
            onChange={e => setFiles(e.target.files)}
        />
        <Editor onChange={setContent} value={content}/>
        <button style={{marginTop:'15px'}}>Update Post</button>
    </form>
  )
}

export default EditPost