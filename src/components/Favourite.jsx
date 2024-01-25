import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
 import {AiFillDelete} from 'react-icons/ai'
 import {doc, onSnapshot, updateDoc} from 'firebase/firestore'
 import {db} from '../firebase'
 import { UserAuth } from '../context/AuthContext'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Favourite = () => {
    const [coins, setCoins] = useState([])
    const {user} = UserAuth()

    useEffect(()=> {
        onSnapshot(doc(db, 'users',  `${user?.email}`), (doc) => {
          setCoins(doc.data()?.watchList)
        } )
    },[user.email])

    const coinPath = doc(db,'users', `${user?.email}`)
    const deleteCoin = async (passedid) => {
      toast("Coin Removed")
        try{
          const result = coins.filter((item)=> item.id !== passedid)
          await updateDoc(coinPath,{
            watchList: result
          })
        } catch (e) {
          console.log(e.message)
        }
    }

  return (
    <div>
        {coins?.length ===0 ? (<p> 
          <p> You are yet to favourite any coin, please  <Link to='/' className='text-green-400'> Click here to add </Link> </p>
        </p>) : (
          <table className='w-full border-collapse text-center'> 
            <thead> 
               <tr className='border-b'> 
                  <th className='px-4'> Rank </th>
                  <th className='text-left'> Coin </th>
                  <th className='text-left'> Remove </th>
            </tr>
            </thead>
          
            <tbody> 
              {coins?.map((coin)=> (
                <tr key={coin.id} className='h-[60px] overflow-hidden'> 
                    <td> {coin?.rank} </td>
                    <td> 
                      <Link to={`/coin/${coin.id}`}> 
                        <div className='flex items-center'> 
                          <img src={coin?.image} alt='' className='w-8 mr-4'/>
                              <div> 
                                <p className='hidden sm:table-cell'> {coin?.name}</p>
                                 <p className='text-gray-600 text-left text-sm'> {coin?.symbol.toUpperCase()}</p>
                              </div>
                        </div>
                      </Link> 
                    </td>
                    <td> <AiFillDelete onClick={()=> deleteCoin(coin.id)} className='cursor-pointer text-red-600 ml-4'/>
                    <ToastContainer /> </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  )
}

export default Favourite