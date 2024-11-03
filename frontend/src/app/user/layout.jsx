'use client'
import React from 'react'
import Navbar from '@/app/user/components/Navbar'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
        
        </div>
  )
}

export default Layout