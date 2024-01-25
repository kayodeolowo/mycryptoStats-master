import React, { useState } from 'react'

import CoinItems from './CoinItems'
const SearchCoin = ({coins}) => {
    const [searchCoins, setSearchCoins] = useState('')
  return (
    <div className='rounded-div my-4 '>
            <div className='flex flex-col justify-between pt-4 pb-6 text-center  mb-4 md:mb-8 '> 
                <h1 className='text-2xl font-bold my-2'> Search Coins</h1>
                <form> 
                    <input onChange={(e)=> setSearchCoins(e.target.value)} type='text' placeholder="Search"
                    className='w-1/2 bg-primary border-input border-[0.5px]  py-1  text-center rounded-2xl shadow-xl'> 
                    </input>
                </form>    
            </div>  

            <table className='w-full border-collapse text-center'> 
                <thead> 
                    <tr className='text-xs sm:text-base border-b'>
                         <th ></th>
                         <th className='px-4'>#</th>
                         <th className='text-left'>Coin</th>
                         
                         <th>Price</th>
                         <th>24hr</th>
                         <th className='hidden md:table-cell'>24 Volume</th>
                         <th className='hidden sm:table-cell'> Market Cap</th>
                         <th>7 days</th>
     

                    </tr>    
                </thead>    
                <tbody> 
                    {coins. filter((value)=> {
                        if (searchCoins === '') {
                            return value;
                        }else if (
                            value.name.toLowerCase().includes(searchCoins.toLowerCase())
                        ){
                            return value
                        }
                    })
                    .map((coin)=> (
                       <CoinItems coin={coin} key={coin.id}/>
                    ))}
                </tbody>
            </table>  
      </div>
  )
}

export default SearchCoin