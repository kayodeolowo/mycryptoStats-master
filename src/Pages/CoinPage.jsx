import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa'
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'

const CoinPage = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(false)
  const [timeFrame, setTimeFrame] = useState('24h'); // Default to 24hr
  const params = useParams()
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false%20&sparkline=true`

  // useEffect(()=>{
  //   axios.get(url).then((response)=>{
  //     setCoin(response.data)
  //     console.log(response.data)
  //   })
  // },[url])

  const showCoins = async () => {
    try {
      const data = await axios.get(`${url}&vs_currency=usd&days=${timeFrame}`).then((res) => {
        setCoin(res.data);
        console.log(res.data, "coins");
      });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    showCoins();
  }, [timeFrame]);

  const handleTimeFrameChange = (selectedTimeFrame) => {
    setTimeFrame(selectedTimeFrame);
  };



  return (
    <>
      {loading ? <div className='rounded-div my-12 py-2 px-4 '>
        <div className='flex max-xl:flex-col max-xl:space-y-4  justify-between  '>
          <div className='flex flex-row space-x-2 items-center'>
            <img className='w-[3rem] mr-2' src={coin.image?.large} alt="" />
            <div className='flex flex-col  '>
              <p className='text-xl  font-bold text-start'> {coin?.name}  </p>
              <div className='flex flex-row items-center text-xl text-gray-500 space-x-2'>
                {coin.market_data?.current_price ? (<p className=' font-bold '>  ${coin.market_data.current_price.usd.toLocaleString()} </p>) : null}
                <p> ({coin.symbol?.toUpperCase()} / USD) </p>
              </div>
            </div>
          </div>

          <div className=' text-xl font-semibold flex justify-start flex-col'>
            <p className=' '> Market Cap </p>
            {coin.market_data?.market_cap ? (<p className='text-gray-500'>${coin.market_data.market_cap.usd.toLocaleString()} </p>) : null}
          </div>


          <div className=' text-xl font-semibold flex justify-start flex-col'>
            <p className=' '>  24hr Volume </p>
            {coin.market_data?.market_cap ? (<p className='text-gray-500'> ${coin.market_data.total_volume.usd.toLocaleString()} </p>) : null}
          </div>

          <div className=' text-xl font-semibold flex justify-start flex-col'>
            <p className=' '>  ATH </p>
            {coin.market_data?.market_cap ? (<p className='text-gray-500'> ${coin.market_data.ath.usd.toLocaleString()} </p>) : null}
          </div>

          <div className=' text-xl font-semibold flex justify-start flex-col'>
            <p className=' '>  ATL </p>
            {coin.market_data?.market_cap ? (<p className='text-gray-500'> ${coin.market_data.atl.usd.toLocaleString()} </p>) : null}
          </div>


        </div>

        <hr className='mt-2 mb-6 ' />

        <div className='flex flex-col md:flex-row justify-between mt-4 '>
          <div className='md:w-[50%]'>

            <p className='text-center text-2xl mt-3'> 7 Days Chart </p>
            <div className='mt-2'>
              <Sparklines data={coin.market_data?.sparkline_7d.price}>
                <SparklinesLine color='green' />
              </Sparklines>
            </div>

           


          </div>

          <div className=' md:w-[45%]'>
            {/* <p className='text-2xl font-bold text-center '> Coin Data Info </p> */}
            <div className='flex  flex-col space-y-3'>

              <div className='flex justify-between'>
                <p className='text-gray-500 text-sm '> Market Rank </p>
                <p className='text-center ml-6'> {coin.market_cap_rank} </p>

              </div>
              <hr />


              <div className='flex justify-between'>
                <p className='text-gray-500 text-sm'> 24h High</p>
                {coin.market_data?.high_24h ? (<p className='text-green-700 font-semibold'>  {coin.market_data.high_24h.usd.toLocaleString()} </p>) : null}
              </div>
              <hr />

              <div className='flex justify-between'>
                <p className='text-gray-500 text-sm mt-1'> 24h Low</p>
                {coin.market_data?.low_24h ? (<p className='text-red-600 font-semibold'> {coin.market_data.low_24h.usd.toLocaleString()} </p>) : null}

              </div>
              <hr />



              <div className='flex justify-between'>
            <p className='text-gray-500 text-sm'>Price Change  <select
              value={timeFrame}
              onChange={(e) => handleTimeFrameChange(e.target.value)}
              className='text-center  bg-black  px-2 py-1 rounded-md ml-4'
            >
              
              <option className='mt-2' value='24h'>24hr</option>
              <option className='mt-2' value='7d'>7d</option>
              <option value='14d'>14d</option>
              <option value='30d'>1 Month</option>
              <option value='60d'>2 Months</option>
              <option value='1y'>1 Year</option>
            </select> </p>
            {coin.market_data?.[`price_change_percentage_${timeFrame}`] ? (
              <p
                className={`text-center ${
                  coin.market_data[`price_change_percentage_${timeFrame}`] < 0
                    ? 'text-red-600'
                    : 'text-green-700'
                }`}
              >
                {coin.market_data[`price_change_percentage_${timeFrame}`].toFixed(2)}%
              </p>
            ) : null}
          </div>
          <hr />

          


            
            </div>
          </div>
        </div>

         {/* Description */}
         <div className='py-4 '>
              <p className='text-xl text-center font-bold'> About {coin.name}</p>
              <p className='text-base text-gray-400' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''), }}></p>
            </div>
      </div> : <div className="flex flex-col w-fit mx-auto mt-[40%] md:mt-[15%]"  >


        <ClipLoader speedMultiplier="1" color='yellow' className='' />

      </div>}
    </>
  )
}

export default CoinPage