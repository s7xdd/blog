import { useEffect, useState } from 'react'
import Post from '../components/post'


const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/post`).then((response) => {
      response.json().then(posts => {
        setPosts(posts)
      })
    })
  }, [])

  return (
    <main>
        {posts.length > 0 && posts.map((post) => (
          <Post {...post} />
        ))}
    </main>
  )
}

export default Home