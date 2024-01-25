import React , {useState} from 'react'
import {AiOutlineMail, AiFillLock} from 'react-icons/ai'
import { Link , useNavigate } from 'react-router-dom'
import {signIn, UserAuth} from '../context/AuthContext'
import {toast} from 'react-toastify'
import Footer from './Footer'



const SignIn = () => {
    const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signIn} = UserAuth();
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try{
        await signIn(email,password)
        navigate('/')
        toast.success('Login Successful')
        
    }catch (e) {
      
      setError(e.message)
      setError(e.response.data.error)
      
    } 
  }

  
  
  


  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
          <h1 className='text-2xl font-bold text-center'> Sign In </h1>
          
           {error ? (<p className='text-red-500 text-center mt-2'> Login Failed, Please Check Email or Password  </p> ) : (<p>  </p>)  }  

         
          <form onSubmit={handleSubmit}> 
            <div className='py-4'> 
              <label> Email </label>
              <div className='my-2 w-full relative rounded-2xl shadow-xl'> 
                <input onChange={(e)=> setEmail(e.target.value)} className='w-full p-2 bg-primary border-input rounded-2xl' type='email'/>
                <AiOutlineMail className='absolute right-2 top-3'/>
              </div>
            </div>
            <div className='my-4'> 
              <label> Password </label>
              <div className='my-2 w-full relative rounded-2xl shadow-xl'> 
                <input onChange={(e)=> setPassword(e.target.value)} className='w-full p-2 bg-primary border-input rounded-2xl' type='password' />
                <AiFillLock className='absolute right-2 top-3'/>
              </div>
            </div>
            <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl '> Sign In </button>
          </form>
          <p> Don't have an account? <Link to='/signup' className='text-red-700 font-bold'> Sign Up </Link>  </p>
        </div> 
        <Footer/>
    </div>
  )
}

export default SignIn