import React, { useContext } from 'react'
import {HiSun, HiMoon} from 'react-icons/hi'
import {ThemeContext} from '../context/ThemeContext'

const ThemeToggle = () => {
    const {theme, setTheme} = useContext(ThemeContext)
  
    return (
    <div className='p-2 w-fit mx-auto  md:w-full'>
        {theme ==='dark'? (
            <div className='flex items-center  cursor-pointer' onClick={()=> setTheme (theme ==='dark'? 'light' : 'dark')}> <HiSun className='text-primary text-center  md:text-2xl mr-2'/> Light Mode  </div>
          ): (<div className='flex items-center cursor-pointer' onClick={()=> setTheme(theme === 'dark'? 'light' : 'dark')}> <HiMoon className='text-primary md:text-2xl mr-2'/> Dark Mode </div> ) 
        }
    </div>
  )
}

export default ThemeToggle