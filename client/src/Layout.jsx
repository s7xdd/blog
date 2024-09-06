import React, { useEffect } from 'react'
import Header from './components/header'
import { Outlet } from 'react-router-dom'
import SlidingBar from './components/SlidingBar'
import locomotiveScroll from 'locomotive-scroll';



const Layout = () => {
  // const scrollRef = React.createRef();

  // useEffect(() => {
  //   const scroll = new locomotiveScroll({
  //     el: scrollRef.current,
  //     smooth: true
  //   });
  // });


  return (
    <div className='layout'>
      <div className='scroll' >
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout