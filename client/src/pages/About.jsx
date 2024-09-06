import '../styles/About.css'
import React from 'react'

const About = () => {
  return (
    <div className='about-main'>
      <div className='d-flex justify-content-center cont'>
        <div className='d-flex flex-column text-center'>
          <h1>ABOUT THIS SITE</h1>
          <p>This site is a personal project of mine implementing features such as Authentication, 
            CRUD operations to MongoDB etc. Front-end is made using <span className='fw-bold'>ViteJs</span> and back-end <br/>using <span className='fw-bold'>NodeJs</span>. Feel free to test the site out!</p>
        </div>
      </div>
    </div>
  )
}

export default About