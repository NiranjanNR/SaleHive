import { useState, useEffect } from "react";
import './NavBar.css'
import { VscChromeClose } from "react-icons/vsc";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function checkSessionID() {
    try{
      const {data, status} = await axios.get('/api/user');
    } catch(e){
      navigate('/login')
    }
  }
  

  async function onLogout(){
    const {data, status} = await axios.post('/api/logout');

    if(status == 200){
        navigate('/login')
    }
    console.log(data);
}

useEffect(() => {
  //checkSessionID()
}, []);
  return (
    <div className=' mt-1 bg-white  z-index'>
      <div className="mx-4 ">
        <div className='py-4 flex justify-center items-center text-slate-100'>
          <button>
            <Link to={`/`} className=' text-3xl ml-10 font-extrabold text-gray-800 logo-font'>
              SaleHive
            </Link>
          </button>
          <div className='hidden md:flex font-semibold text-md mr-auto ml-20 text-gray-500'>
            <div>
              <Link to="/aboutus">
                <button className='hover:text-[rgb(123,63,0)] px-5 pb-1 transition-all ease-in-out active:scale-95 hover-underline-animation'>About us</button>
              </Link>
              <Link to="/discover">
                <button className='hover:text-[rgb(123,63,0)] px-5 pb-1 transition-all ease-in-out active:scale-95 hover-underline-animation'>Discover</button>
              </Link>
              <button className='hover:text-[rgb(123,63,0)] px-5 pb-1 transition-all ease-in-out active:scale-95 hover-underline-animation'>Support</button>
              <button className='hover:text-[rgb(123,63,0)] px-5 pb-1 transition-all ease-in-out active:scale-95 hover-underline-animation'>Blog</button>
            </div>
          </div>

          <div className={`md:hidden absolute top-16 z-50 right-0 bg-[rgba(249,251,253)] w-full ${isMenuOpen ? '' : 'hidden'}`}>
            <div className='flex flex-col items-center text-lg py-2'>
              <Link to="/aboutus">
                <button className='hover:text-pink-600/75 my-2'>About us</button>
              </Link>
              <Link to="/discover" className='hover:text-pink-600/75 my-2'>
                <button className='hover:text-pink-600/75 my-2'>Discover</button>
              </Link>
              <button className='hover:text-pink-600/75 my-2'>Support</button>
              <button className='hover:text-pink-600/75 my-2'>Blog</button>
            </div>
          </div>
          <div className="ml-auto flex items-center">
            <input className={`visible min-md-hidden px-8  py-2 placeholder:text-md text-md font-light placeholder:text-gray-600/80 rounded-lg bg-gray-200/40 `} placeholder="Search for help.." />
            <div className='hidden md:block text-lg font-semibold ml-7 pr-10 text-gray-700'><FaUserAlt /></div>
            <button onClick={() => onLogout()}>Logout</button>
          </div>
          <div className='md:hidden ml-5'>
            <button className='hover:text-pink-600 text-xl font-bold mr-5 scale-125' onClick={toggleMenu}>
              {isMenuOpen ? (<VscChromeClose />) : (<TiThMenu />)}
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
export default NavBar