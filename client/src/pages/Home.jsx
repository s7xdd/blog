import '../styles/Homepage.css'
import { useEffect, useState } from 'react'
import Highlight from '../components/Highlight'
import SidePost from '../components/SidePost'
import RecentPosts from '../components/RecentPosts'
import AllBlogPost from '../components/AllBlogPost'
import hposts from '../data/highlight.json'



const Home = () => {

  return (
    <div className='homepage'>
        <div className='start-title'>
          <Highlight/>
        </div>
        <div>
          <AllBlogPost/>
          <div className='view-btn'>
            <a className='view-all-btn' href="/blogs">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
            </a>
          </div>
        </div>
        <div className='banner-2-main'>
          <div className='banner-2-title'>
            <h1 className='category'>Technology</h1>
          </div>
          <div className='banner-2'>
            <SidePost title={hposts[0].title} date={hposts[0].date} img={hposts[0].img} content={hposts[0].content}/>
            <SidePost title={hposts[1].title} date={hposts[1].date} img={hposts[1].img} content={hposts[1].content}/>
          </div>
        </div>
        <div className='footer'>Copyright 2024 MyBlog Portal</div>
    </div>
  )
}

export default Home