import React from 'react'

const Post = () => {
  return (
    
    <div className="post">
        <div className="image">
          <img src="https://techcrunch.com/wp-content/uploads/2023/11/openAI-pattern-01.jpg?resize=900,506" alt="" />
        </div>
        
        <div className='texts'>
          <h2>Investors are already valuing OpenAI at over $100B</h2>
          <p className="info">
            <a href="" className="author">Mohammed</a>
            <time>2024-01-0 16:46</time>
          </p>
          <p className='summary'>OpenAI is in talks to raise a new round of funding at an eye-popping $100 billion-plus valuation, sources told The Wall Street Journal this week.</p>
        </div>
      </div>
      
  )
}

export default Post