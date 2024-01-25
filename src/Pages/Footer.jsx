import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex justify-center items-end mt-4'>
  <div className='w-fit mx-auto mb-6'>
    <a href="https://kayodeolowo.netlify.app/" target='blank'>
      <h1 className='text-center hover:text-green-500 font-semibold text-sm font-mono'> Built by Kayode Olowo </h1>
    </a>
  </div>
</div>
  )
}

export default Footer