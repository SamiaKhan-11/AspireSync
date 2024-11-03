'use client'
import Navbar from '@/app/company/components/Navbar'
import React from 'react'

const Layout = ({children}) => {
  return (
    <div>
        {children}
        {/* <Navbar /> */}
    </div>
  )
}

export default Layout