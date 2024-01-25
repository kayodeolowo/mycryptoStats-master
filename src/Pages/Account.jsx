import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Favourite from '../components/Favourite'
import { UserAuth } from '../context/AuthContext'
import Footer from './Footer'

const Account = () => {
  const {user, logout} = UserAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try{
      await logout()
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  if (user) {
       return (
    <div className='max-w-[1140px] mx-auto'>
      <div className='flex justify-between items-center my-12 py-8 rounded-div'> 
        <div> 
          <h1 className='text-2xl font-bold'> Account </h1>
            <div> 
              <p>Hello {user?.email} Welcome  </p>
            </div>
      </div>

      <div> 
        <button onClick={handleSignOut} className='border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl'> Sign Out </button>
      </div>
     </div>
     {/* <div className='flex justify-between items-center my-12 py-8 rounded-div'> 
      <div className='w-full min-h-[300px]'> 
        <h1 className='text-2xl font-bold py-4'> Favourite Coin List </h1>
        <Favourite/>
      </div>
     </div> */}
    
    </div>
  ) 
  }else {
    return <Navigate to='/signin'/>
  }



 
}

export default Account