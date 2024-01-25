import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import {FaBitcoin} from 'react-icons/fa'
import {FcManager } from 'react-icons/fc'

const Navbar = () => {
    const {user, logout} = UserAuth( )
    const [nav, setNav] = useState(false)
    const navigate = useNavigate
    const handleNav = () => {
        setNav(!nav)
    }

      const handleSignOut = async () => {
    try{
      await logout()
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='rounded-div flex items-center justify-between h-20 font-bold mt-4 '>
        <Link to='/'>
            <h1 className='text-2xl flex items-center'> CryptoStats <span className='ml-2 text-yellow-500'> <FaBitcoin/> </span> </h1> 
        </Link>

        <a href='https://kayodeolowo.netlify.app/' target='blank'>
        <div className=' mt-1 hover:cursor-pointer   rounded-full flex items-center justify-center text-center'>
           <img src='./images/profile.png'  className='h-6 w-6'/>
        </div>
        </a>

        <div className='hidden md:block'> 
            <ThemeToggle/>
        </div>
        
        {user?.email ? (
            <div className='hidden md:block'>
                <Link to='/account' className='p-4'> Account </Link>
                <button onClick={handleSignOut}> Sign out</button>
                
                 </div>
        ) : (
        <div className='hidden md:block'> 
            <Link to='/signin'  className='p-4 hover:text-accent'>Sign In</Link>
            <Link to='/signup' className='bg-button text-btnText px-5 py-2 rounded-2xl shadow-lg hover:shadow-2xl' >Sign Up</Link>
        </div>)}

         {/* menu icon */}
        <div onClick={handleNav} className=' md:hidden cursor-pointer z-10'> 
           {nav ? <AiOutlineClose size={20}/> :  <AiOutlineMenu size={23}/>}
        </div>

        {/* menu menu */}
                {/* <div className={nav ?  'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10' : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300' */}



        <div className={nav ?  'leading-loose text-center    text-xl  absolute  left-0  top-0   w-full  mx-auto z-10    flex h-full   mt-20  bg-primary ease-in-out   flex-col' : 'absolute left-[-100%]   '
    }> 
            <ul onClick={handleNav}  className='w-full p-4 mt-[20%] '> 
             <li className='  w-fit mx-auto '>  <ThemeToggle/> </li> 
                <li className='   w-fit mx-auto'> <Link to='/'> Home </Link> </li>
                 {/* <li className='border-b py-6'> <Link to='/account'> Account </Link> </li> */}
                
            </ul>

            <div  className='flex flex-col w-full'> 
                {user?.email ? (
            <div onClick={handleNav} className='flex flex-col'>
                <Link to='/account' className='  w-fit mx-auto'>Account </Link>
                <button onClick={handleSignOut} className='p-4  w-fit mx-auto '> Sign out</button>
                 </div>
        ) : (
        <div  onClick={handleNav}  className='md:hidden flex flex-col  '> 
            <Link to='/signin'  className='p-4 hover:text-accent w-fit mx-auto'>Sign In</Link>
            <Link to='/signup' className='bg-button text-btnText px-10 items-center mt-4 py-[1px] w-fit mx-auto rounded-xl shadow-lg hover:shadow-2xl' >Sign Up</Link>
        </div>)}
            </div>
        </div>
        
    </div>
  )
}

export default Navbar