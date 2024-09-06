import React from 'react'
import { Link } from 'react-router-dom'
import RecentPostSmall from './RecentPostSmall'

const RecentPosts = () => {
  return (
    <div className="recent-cont">
        <div className="recent-main">
            <div>
            <h4 className="recent-title">Recent blog posts</h4>
            </div>
            <div className="recentposts">
            <div className="recent-left">
                <img src="../public/office.jpg" alt="" height={228} width={500} />
                <div>
                <span>Olivia Rhye • 1 Jan 2023</span>
                <h4>UX review presentations</h4>
                <p>
                    How do you create compelling presentations that wow your
                    colleagues and impress your managers?
                </p>
                <div className="tag-btns">
                    <Link className="tag-btn1">Design</Link>
                    <Link className="tag-btn2">Research</Link>
                    <Link className="tag-btn3">Presentation</Link>
                </div>
                </div>
            </div>

            <div className="recent-right">
                <RecentPostSmall />
                <RecentPostSmall />
            </div>
            </div>
        </div>

        <div className="recent-bottom">
            <img src="../public/office.jpg" alt="" height={228} width={500} />
            <div className='recent-btm-content'>
                <span>Olivia Rhye • 1 Jan 2023</span>
                <h4>UX review presentations</h4>
                <p>
                    How do you create compelling presentations that wow your colleagues
                    and impress your managers?
                </p>
                <div className="tag-btns">
                    <Link className="tag-btn1">Design</Link>
                    <Link className="tag-btn2">Research</Link>
                    <Link className="tag-btn3">Presentation</Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default RecentPosts