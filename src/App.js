import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import {ThemeProvider} from './context/ThemeContext'
import {Home, Account, Signin, Signup, CoinPage } from './Pages';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './context/AuthContext';
import FadeLoader from 'react-spinners/FadeLoader'

import {TbPlayerTrackNext, TbPlayerTrackPrev} from 'react-icons/tb'

function App() {
  const [coins, setCoins] = useState([])
   const [loading, setLoading] = useState (false)
   const [currentpage, setCurrentpage] = useState(1)

   const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentpage}&sparkline=true`;

   const handleNextPage = () => {
     setCurrentpage((prevPage) => prevPage + 1);
   };
 
   const handlePrevPage = () => {
     setCurrentpage((prevPage) => Math.max(prevPage - 1, 1));
   };
 
   useEffect(() => {
     setLoading(false); // Set loading to false before making the request
     axios.get(url).then((response) => {
       setCoins(response.data);
       setLoading(true);
     });
   }, [url]);

  return (
   <ThemeProvider> 
    <AuthContextProvider> 
        <Navbar/>
       { loading ?  <Routes> 
          <Route path='/' element={<Home coins={coins} />} />
           <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
             <Route path='/account' element={<Account/>} />
          
             <Route path='/coin/:coinId' element={<CoinPage/>}> 
                <Route path=':coindId'/>
             </Route>

            
             
        </Routes> :  <div className="flex flex-col w-fit mx-auto mt-[45%] md:mt-[15%] h-10"  >
          
          <FadeLoader speedMultiplier="1"  color='green'  className='' />
         
          </div> }

          {/* <div className="flex justify-between mt-4 w-[10rem] mx-auto mb-10">
          <button onClick={handlePrevPage}>
            <TbPlayerTrackPrev size={24} />
          </button>
          <button onClick={handleNextPage}>
            <TbPlayerTrackNext size={24} />
          </button>
        </div> */}
      </AuthContextProvider>
   </ThemeProvider>
  );
}

export default App;
