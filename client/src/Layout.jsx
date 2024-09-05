import React from 'react'
import Header from './components/header'
import { Outlet } from 'react-router-dom'
import SlidingBar from './components/SlidingBar'

const Layout = () => {
  return (
    <main>
        <SlidingBar/>
        <Header />
        <Outlet />
    </main>
  )
}

export default Layout