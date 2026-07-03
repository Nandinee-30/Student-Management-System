import React from 'react'
import Header from "../components/Header"

const Contact = () => {
  return (
    <div>
      <Header/>
      <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="container flex justify-center items-center h-screen p-5 font-sans">
      <h1 className='text-4xl text-white'>Contact Page</h1>
      </div>
    </div>
  )
}

export default Contact
